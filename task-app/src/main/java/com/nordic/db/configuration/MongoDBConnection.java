package com.nordic.db.configuration;

public class MongoDBConnection {
    private String host;
    private int port;
    private Credentials credentials;
    private String database;

    public String getHost() {
        return this.host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return this.port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public Credentials getCredentials() {
        return this.credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

    public String getDatabase() {
        return this.database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    @Override
    public String toString() {
        return "MongoDB Connection (" + this.credentials.getUsername() + "," + this.credentials.getPassword() + ")";
    }
}
