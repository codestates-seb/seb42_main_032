package DabuOps.tikkle.userauth.service;

import DabuOps.tikkle.account.entity.Account;
import DabuOps.tikkle.account.repository.AccountRepository;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.userauth.dto.AccountInfoDto;
import DabuOps.tikkle.userauth.dto.AccountTransactionDto;
import DabuOps.tikkle.userauth.dto.AccountTransactionListDto;
import DabuOps.tikkle.userauth.dto.ResList;
import DabuOps.tikkle.userauth.dto.TokenResponseDto;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class UserAuthService {
    private final MemberRepository memberRepository;
    private final AccountRepository accountRepository;
    private final RestTemplate restTemplate;
    //이용기관코드 = 테스팅할 사용자 것을 적어야함
    private final String InstitutionCode = "M202300547";

    @Value("{openbanking.api.url}")
    private String openBankingApiUrl;
    @Value("{K_CLIENT_ID}")
    private String clientId;

    @Value("{K_CLIENT_SECRET}")
    private String clientSecret;

    @Value("{K_REDIRECT_URI}")
    private String redirectUri;

    public TokenResponseDto requestToken(String authorizationCode, Long memberId) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("code", authorizationCode);
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("redirect_uri", redirectUri);
        formData.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, headers);

        ResponseEntity<TokenResponseDto> response = restTemplate.postForEntity(openBankingApiUrl + "/oauth/2.0/token", request, TokenResponseDto.class);
        TokenResponseDto tokenResponse = response.getBody();

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            member.setAccessToken(tokenResponse.getAccessToken());
            memberRepository.save(member);
        }
        return tokenResponse;
    }

    public List<AccountInfoDto> requestUserInfo(String accessToken, String userSeqNo) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(openBankingApiUrl + "/v2.0/user/me").queryParam("user_seq_no", userSeqNo);

        HttpEntity<?> request = new HttpEntity<>(headers);
        ResponseEntity<AccountInfoDto> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, AccountInfoDto.class);

        List<AccountInfoDto> accountList = new ArrayList<>();
        for (ResList resList : response.getBody().getResList()){
            Account account = new Account();
            account.setFintechUseNum(resList.getFintechUseNum());
        }
        return accountList;
    }

    public List<AccountTransactionDto> requestTransactionHistories(Long accountId, Long memberId) {
        Member obtainMember = memberRepository.findById(memberId).get();
        Account obtainAccount = accountRepository.findById(accountId).get();
        String accessToken = obtainMember.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        UriComponentsBuilder builder = UriComponentsBuilder
            .fromHttpUrl(openBankingApiUrl + "v2.0/account/transaction_list")
            .queryParam("bank_tran_id", InstitutionCode+"U"+generateInstitutionGrantNumber(memberId))
            .queryParam("fintech_use_num", obtainAccount.getFintechUseNum())
            .queryParam("inquiry_type", "A")
            .queryParam("inquiry_base", "T")
            .queryParam("from_time", obtainAccount.getLastDateTimeInquiryTransactionHistory())
            .queryParam("to_time", LocalDateTime.now())
            .queryParam("sort_order", "D")
            .queryParam("tran_dtime", LocalDateTime.now());

        HttpEntity<?> request = new HttpEntity<>(headers);
        ResponseEntity<AccountTransactionListDto> response =
            restTemplate.exchange(builder.toUriString(), HttpMethod.GET, request, AccountTransactionListDto.class);

        return response.getBody().getRes_list();
    }
    /**
     * 이용기관 부여번호는 하루동안의 유일성을 보장받아야함
     * 각 회원별 거래 내역 조회수로 하루동안의 유일성 보장
     */
    private String generateInstitutionGrantNumber(Long accountId){
        //id로 멤버 찾기
        Account obtainAccount = accountRepository.findById(accountId).get();
        LocalDate today = LocalDate.now();
        String generatedNumber;
        //호출한 멤버의 마지막 거래 내역 조회날짜가 어제면 거래내역 조횟수를 1로 초기화
        if(obtainAccount.getLastDateTimeInquiryTransactionHistory().toLocalDate().isBefore(today)) {
            obtainAccount.setCallTransactionHistories(1);
        }
        else{
            //아니면 거래내역 조회수를 +1
            obtainAccount.setCallTransactionHistories(obtainAccount.getCallTransactionHistories() + 1);
        }
        //이용기관 부여번호 9자리 생성(하루동안의 유일성 보장)
        generatedNumber = String.format("%09d", obtainAccount.getCallTransactionHistories());
        accountRepository.save(obtainAccount);
        return generatedNumber;
    }
}
