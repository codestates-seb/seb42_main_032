package DabuOps.tikkle.oauth.controller;

import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.oauth.service.OAuthService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Slf4j
public class OAuthController {

    private final OAuthService oAuthService;

    @GetMapping("/login")
    public Member login(@RequestParam("accessToken") String accessToken) throws IOException {
        //validate() 메서드에 Client 에서 받아온 accessToken을 보내서 유효성 검증하기
        Member member = (Member) oAuthService.login(accessToken);

        return member;

    }
}