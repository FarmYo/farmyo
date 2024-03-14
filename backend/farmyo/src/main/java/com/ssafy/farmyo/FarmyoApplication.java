package com.ssafy.farmyo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

//@EnableJpaAuditing
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class FarmyoApplication {

	public static void main(String[] args) {
		SpringApplication.run(FarmyoApplication.class, args);
	}
}
