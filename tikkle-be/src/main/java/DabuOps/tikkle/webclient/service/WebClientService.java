package DabuOps.tikkle.webclient.service;

import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.webclient.dto.AccountInfoDto;
import DabuOps.tikkle.webclient.dto.AccountTransactionListDto;
import DabuOps.tikkle.webclient.dto.AccountTransactionRequestDto;
import DabuOps.tikkle.webclient.dto.TokenResponseDto;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/*
 * client 사용자 인증 요청 클릭시 핸드폰 인증을 하며 authorization_code 발급 받아 headers 에 담아서 server 로 넘겨주기 (프론트)
 * server 로 넘겨준 authorization_code 를 requestToken() 메서드로 넘긴다.(controller)
 */
@Service
@RequiredArgsConstructor
public class WebClientService {

    private final MemberRepository memberRepository;
    WebClient webClient = WebClient.create("{openbanking.api.url}");
    @Value("{K_CLIENT_ID}")
    private String clientId;

    @Value("{K_CLIENT_SECRET}")
    private String clientSecret;

    @Value("{K_REDIRECT_URI}")
    private String redirectUri;

    /*
     * requestToken()에서 authorization_code 를 포함한 clientId, secret, redirectUri, grant_type 을 formData 에 담아준다
     * webClient을 이용하여 formData 를 uri로 보내준 후 TokenResponseDto 에 받아온다.
     * 받아온 데이터를 memberRepository 에서 findById로 memberId 확인
     * memberId가 확인되면 TokenResponseDto 에서 accessToken 을 가져와서 memberRepository 에 저장
     */
    public Mono<TokenResponseDto> requestToken(String authorizationCode, Long memberId) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("code", authorizationCode);
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("redirect_uri", redirectUri);
        formData.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        return webClient.post()
            .uri("/oauth/2.0/token")
            .headers(h -> h.addAll(headers))
            .body(BodyInserters.fromFormData(formData))
            .retrieve()
            .bodyToMono(TokenResponseDto.class)
            .doOnSuccess(tokenResponse -> {
                Optional<Member> optionalMember = memberRepository.findById(memberId);
                if (optionalMember.isPresent()) {
                    Member member = optionalMember.get();
                    member.setAccessToken(tokenResponse.getAccessToken());
                    memberRepository.save(member);
                }
            });
    }

    public Mono<AccountInfoDto> requestUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        return webClient.get()
            .uri("/v2.0/user/me")
            .headers(h -> h.addAll(headers))
            .retrieve()
            .bodyToMono(AccountInfoDto.class);
    }

    public Mono<AccountTransactionListDto> requestTransactionHistory(AccountTransactionRequestDto accountTransactionRequestDto
    , String accessToken){
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("bank_tran_id", accountTransactionRequestDto.getBank_tran_id());
        formData.add("fintech_use_num", accountTransactionRequestDto.getFintech_use_num());
        formData.add("inquiry_type", accountTransactionRequestDto.getInquiry_type());
        formData.add("inquiry_base", accountTransactionRequestDto.getInquiry_base());
        formData.add("from_date", accountTransactionRequestDto.getFrom_date());
        formData.add("to_date", accountTransactionRequestDto.getTo_date());
        formData.add("tran_dtime", accountTransactionRequestDto.getTran_dtime());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);
    }

}