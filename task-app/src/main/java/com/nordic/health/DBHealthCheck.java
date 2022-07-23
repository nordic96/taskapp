package com.nordic.health;

import com.codahale.metrics.health.HealthCheck;
import com.nordic.db.MongoFactoryConnection;

public class DBHealthCheck extends HealthCheck {
    private final MongoFactoryConnection conn;

    public DBHealthCheck(MongoFactoryConnection conn) {
        this.conn = conn;
    }

    @Override
    protected Result check() throws Exception {
        if (conn.getClient().listDatabaseNames().iterator().hasNext()) {
            return Result.healthy();
        }
        return Result.unhealthy("Not able to connect to databases...");
    }
}
