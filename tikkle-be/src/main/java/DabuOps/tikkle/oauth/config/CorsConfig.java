package DabuOps.tikkle.oauth.config;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){

        CorsConfiguration corsConfiguration = new CorsConfiguration();


        corsConfiguration.addAllowedOrigin("http://seb42-main-032-tikkle.s3-website.ap-northeast-2.amazonaws.com/**");
        corsConfiguration.addAllowedOrigin("http://ec2-54-180-117-192.ap-northeast-2.compute.amazonaws.com:8080");
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        corsConfiguration.setAllowCredentials(true);


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;

    }
}