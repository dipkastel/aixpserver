package com.sha.serverproductmanagement;

import com.sha.serverproductmanagement.property.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.aspectj.EnableSpringConfigured;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperties.class
})
public class ServerProductManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerProductManagementApplication.class, args);
	}

}
