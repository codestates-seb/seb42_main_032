//package DabuOps.tikkle.oauth.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@RequiredArgsConstructor
//@EnableWebSecurity(debug = true)
//public class SecurityConfiguration {
//    private final CorsConfig config;
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        http
//            .headers().frameOptions().sameOrigin()
//            .and()
//            .csrf().disable()
//            .cors().configurationSource(config.corsConfigurationSource())
//
//            .and()
//            .formLogin().disable()
//            .httpBasic().disable()
//
//            .authorizeRequests()
//            .antMatchers("/","/oauth2/**","/login/**","/h2-console/**","/budgets/**","/members/**","/transaction_histories/**","/categories/**","/curations/**","/tags/**","/accounts/**", "/init/**")
//            .permitAll()
//            .anyRequest().authenticated()
//
//            .and()
//            .oauth2Login();
//
//        return http.build();
//    }
//}