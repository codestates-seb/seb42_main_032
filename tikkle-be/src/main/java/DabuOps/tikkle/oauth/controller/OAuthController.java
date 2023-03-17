package DabuOps.tikkle.oauth.controller;

import DabuOps.tikkle.oauth.dto.AccessTokenDto;
import DabuOps.tikkle.oauth.service.OAuthService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class OAuthController {
    private final OAuthService oAuthService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AccessTokenDto accessTokenDto) throws IOException {
        if (!oAuthService.validate(accessTokenDto.getAccess_token())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
        }
        oAuthService.login();
        return ResponseEntity.ok("Login success");
    }
}