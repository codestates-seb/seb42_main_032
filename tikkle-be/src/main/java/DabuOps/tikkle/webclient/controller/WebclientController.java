package DabuOps.tikkle.webclient.controller;

import DabuOps.tikkle.oauth.dto.LogInMemberDto;
import DabuOps.tikkle.oauth.resolver.LoginMember;
import DabuOps.tikkle.webclient.dto.TokenResponseDto;
import DabuOps.tikkle.webclient.service.WebClientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Slf4j
public class WebclientController {
    private final WebClientService webClientService;

    @GetMapping("/members/auth")
    public Mono<TokenResponseDto> accountAuth(@RequestParam("code") String authorizationCode,
        @LoginMember LogInMemberDto logInMemberDto) {
        return webClientService.requestToken(authorizationCode, logInMemberDto.getMemberId());
    }
}