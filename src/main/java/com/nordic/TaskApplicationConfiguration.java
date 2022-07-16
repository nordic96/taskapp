package com.nordic;

import io.dropwizard.Configuration;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nordic.db.configuration.MongoDBConnection;

import javax.validation.constraints.*;

public class TaskApplicationConfiguration extends Configuration {
    private MongoDBConnection mongoDBConnection;


    public MongoDBConnection getMongoDBConnection() {
        return this.mongoDBConnection;
    }

    public void setMongoDBConnection(final MongoDBConnection mongoDBConnection) {
        this.mongoDBConnection = mongoDBConnection;
    }
}
