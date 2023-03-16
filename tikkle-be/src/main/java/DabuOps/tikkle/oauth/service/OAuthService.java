package DabuOps.tikkle.oauth.service;

import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.MemberState;
import DabuOps.tikkle.member.repository.MemberRepository;
import DabuOps.tikkle.oauth.dto.AccessTokenDto;
import DabuOps.tikkle.oauth.dto.LoginDto;
import DabuOps.tikkle.oauth.principal.OAuthUserInfo;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthService extends DefaultOAuth2UserService {

    private final InMemoryClientRegistrationRepository inMemoryRepository;
    private final MemberRepository memberRepository;

    /*
    * Login 과정
    * Client -> OAuth2 Server 로그인 요청 (프론트)
    * OAuth2 Server -> Client로 accessToken 발급 (프론트)
    * Client에 있는 accessToken을 accessTokenDto에 저장
    * accessToken validate
    * accessToken validate 완료시 accessToken으로 UserInfo 받아오기
    * UserInfo 확인 후 첫 로그인이면 회원가입처리, 아니면 로그인
    * return으로 UserInfo 반환
     */

    public LoginDto login(String accessToken){

        //유효성 검증 완료한 로직(getValidateToken) 호출
        AccessTokenDto tokenDto = getValidateToken(accessToken);
        Member member = getMemberProfile(tokenDto);

        LoginDto loginDto = LoginDto.builder().memberId(member.getId()).memberEmail(member.getEmail()).memberName(member.getName())
            .picture(member.getPicture()).build();

        return loginDto;
    }
    /*
    * Google Server에서 accessToken validate하는 로직
    * https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=
     */

    private AccessTokenDto getValidateToken(String accessToken){

        return null;
    }

    /*
    * UserInfo 받아오는 로직
     */
    private Member getMemberProfile(AccessTokenDto tokenDto){
        OAuthUserInfo oAuthUserInfo = null;

        String email =  oAuthUserInfo.getEmail();
        String name = oAuthUserInfo.getName();
        String imageURL = oAuthUserInfo.getPicture();

        Member member = memberRepository.findByEmailAndStateIs(email, MemberState.ACTIVE)
            .orElseGet(() -> memberRepository.save(new Member(email, name, imageURL)));

        return member;
    }
}
