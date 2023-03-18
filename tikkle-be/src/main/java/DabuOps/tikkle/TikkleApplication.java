package DabuOps.tikkle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@EnableJpaAuditing
@SpringBootApplication
public class TikkleApplication {

//	@Bean
//	public BCryptPasswordEncoder encoder(){
//		return new BCryptPasswordEncoder();
//	}

	public static void main(String[] args) {
		SpringApplication.run(TikkleApplication.class, args);
	}
}
