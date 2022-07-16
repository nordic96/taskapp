package com.nordic.db;

import com.mongodb.ServerAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.nordic.db.configuration.Credentials;
import com.nordic.db.configuration.MongoDBConnection;

import java.util.Arrays;

public class MongoFactoryConnection {
    private static final Logger logger = LoggerFactory.getLogger(MongoFactoryConnection.class);
    private MongoDBConnection mongoConnection;

    public MongoFactoryConnection(final MongoDBConnection mongoConnection) {
        this.mongoConnection = mongoConnection;
    }

    public MongoClient getClient() {
        logger.info("Creating MongoDB client instance...");
        logger.info(mongoConnection.toString());
        final Credentials cred = mongoConnection.getCredentials();

        final MongoCredential mongoCredentials = MongoCredential.createCredential(
                cred.getUsername(),
                mongoConnection.getDatabase(),
                cred.getPassword());
        final ServerAddress server = new ServerAddress(mongoConnection.getHost(), mongoConnection.getPort());

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(server)))
                .applyToSslSettings(builder -> builder.enabled(true))
                .build();
        MongoClient client = MongoClients.create(settings);
        return client;
    }
}
