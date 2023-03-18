package DabuOps.tikkle.webclient.service;

import DabuOps.tikkle.webclient.dto.TokenResponseDto;
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
 * requestToken()에서 authorization_code 를 포함한 clientId, secret, redirectUri, grant_type 을 formData 에 담아준다
 * webClient을 이용하여 formData 를 uri로 보내준 후 TokenResponseDto 에 받아온다.
 */
@Service
public class WebClientService {
    WebClient webClient = WebClient.create("{openbanking.api.url}");
    @Value("{K_CLIENT_ID}")
    private String clientId;

    @Value("{K_CLIENT_SECRET}")
    private String clientSecret;

    @Value("{K_REDIRECT_URI}")
    private String redirectUri;

    public Mono<TokenResponseDto> requestToken(String authorizationCode) {
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
            .bodyToMono(TokenResponseDto.class);
    }
}