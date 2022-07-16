package com.nordic;

import com.nordic.db.MongoFactoryConnection;
import com.nordic.db.MongoManaged;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** Resources */
import com.nordic.resources.TaskResource;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class TaskApplication extends Application<TaskApplicationConfiguration> {
    private static final Logger logger = LoggerFactory.getLogger(TaskApplication.class);
    public static void main(final String[] args) throws Exception {
        new TaskApplication().run(args);
    }

    @Override
    public String getName() {
        return "TaskApplication";
    }

    @Override
    public void initialize(final Bootstrap<TaskApplicationConfiguration> bootstrap) {
        // TODO: application initialization
    }

    @Override
    public void run(final TaskApplicationConfiguration config,
                    final Environment environment) {
        logger.info(config.getMongoDBConnection().toString());
        final MongoFactoryConnection mongoFactoryConnection = new MongoFactoryConnection(config.getMongoDBConnection());
        final MongoManaged mongoManaged = new MongoManaged(mongoFactoryConnection.getClient());

        logger.info("Registering Resources...");
        final TaskResource taskResource = new TaskResource();
        environment.lifecycle().manage(mongoManaged);
        environment.jersey().register(taskResource);
    }

}
