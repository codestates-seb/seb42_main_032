package DabuOps.tikkle.oauth.controller;

import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.oauth.service.OAuthService;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> login(@RequestParam("accessToken") String accessToken)
        throws IOException {
        //validate() 메서드에 Client 에서 받아온 accessToken을 보내서 유효성 검증하기
        HttpStatus status = oAuthService.validate(accessToken);

        if(status == HttpStatus.OK) {
            //status
            Optional<Member> member = oAuthService.login(accessToken);

            if (member.isPresent()) {
                return ResponseEntity.ok(member.get());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }
}