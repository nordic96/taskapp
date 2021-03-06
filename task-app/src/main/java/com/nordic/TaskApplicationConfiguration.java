package com.nordic;

import io.dropwizard.Configuration;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nordic.db.configuration.MongoDBConnection;
import io.federecio.dropwizard.swagger.SwaggerBundleConfiguration;

import javax.validation.constraints.*;

public class TaskApplicationConfiguration extends Configuration {
    private MongoDBConnection mongoDBConnection;
    @JsonProperty("swagger")
    private SwaggerBundleConfiguration swaggerBundleConfiguration;


    public MongoDBConnection getMongoDBConnection() {
        return this.mongoDBConnection;
    }

    public void setMongoDBConnection(final MongoDBConnection mongoDBConnection) {
        this.mongoDBConnection = mongoDBConnection;
    }

    public SwaggerBundleConfiguration getSwaggerBundleConfiguration() {
        return this.swaggerBundleConfiguration;
    }
}
