package DabuOps.tikkle.oauth.controller;

import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.oauth.service.OAuthService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    public Object login(@RequestParam("accessToken") String accessToken) throws IOException {
        return oAuthService.login(accessToken);
    }
}