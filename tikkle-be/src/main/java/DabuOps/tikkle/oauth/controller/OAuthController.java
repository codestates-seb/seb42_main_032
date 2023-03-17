package DabuOps.tikkle.oauth.controller;

import DabuOps.tikkle.oauth.service.OAuthService;
import DabuOps.tikkle.oauth.dto.LoginDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class OAuthController {
    private final OAuthService oAuthService;

    @GetMapping("/login")
    public ResponseEntity Login(@RequestParam String accessToken){
        LoginDto loginDto = oAuthService.login(accessToken);

        return new ResponseEntity<>(loginDto, HttpStatus.ACCEPTED);
    }
}
// https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=ABCDE