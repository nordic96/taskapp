package com.nordic.db;

import com.mongodb.client.MongoClient;

import io.dropwizard.lifecycle.Managed;

public class MongoManaged implements Managed {
    private MongoClient mongoClient;

    public MongoManaged(final MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @Override
    public void start() throws Exception {
        // TODO Auto-generated method stub
    }

    @Override
    public void stop() throws Exception {
        // TODO Auto-generated method stub
        mongoClient.close();
    }
}
