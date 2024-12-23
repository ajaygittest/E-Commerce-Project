package com.dreamer.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.dreamer.ecommerce.entity.Product;
import com.dreamer.ecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
		
		HttpMethod[] theunsupportedAction= {HttpMethod.DELETE,HttpMethod.PUT,HttpMethod.POST};
		
		config.getExposureConfiguration().forDomainType(Product.class)
		.withItemExposure((metadata,httpmethods)->httpmethods.disable(theunsupportedAction))
		.withCollectionExposure((metadata,httpmethods)->httpmethods.disable(theunsupportedAction));
		
		config.getExposureConfiguration().forDomainType(ProductCategory.class)
		.withItemExposure((metadata,httpmethods)->httpmethods.disable(theunsupportedAction))
		.withCollectionExposure((metadata,httpmethods)->httpmethods.disable(theunsupportedAction));
	}
	

}
