package DabuOps.tikkle.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final OAuthMemberService oAuthUserService;
    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String clientSecret;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.authorizeRequests()
            .antMatchers("/","/oauth2/**","/login/**","/h2-console/**")
            .permitAll()
            .anyRequest().authenticated()
            .and()
            .headers()
            .frameOptions().disable()
            .and()
            .csrf().disable()
            .oauth2Login()
            .userInfoEndpoint().userService(oAuthUserService);
        return http.build();
    }
}
