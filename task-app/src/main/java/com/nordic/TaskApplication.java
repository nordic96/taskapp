package com.nordic;

import com.mongodb.client.MongoClient;
import com.nordic.dao.TaskDAO;
import com.nordic.db.MongoFactoryConnection;
import com.nordic.db.MongoManaged;
import com.nordic.db.configuration.MongoDBConnection;
import io.federecio.dropwizard.swagger.SwaggerBundle;
import io.federecio.dropwizard.swagger.SwaggerBundleConfiguration;
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
        bootstrap.addBundle(new SwaggerBundle<TaskApplicationConfiguration>() {
            @Override
            protected SwaggerBundleConfiguration getSwaggerBundleConfiguration(TaskApplicationConfiguration config) {
                return config.getSwaggerBundleConfiguration();
            }
        });
    }

    @Override
    public void run(final TaskApplicationConfiguration config,
                    final Environment environment) {
        logger.info("Instantiating Mongo DB Connection..");
        final MongoDBConnection conn = config.getMongoDBConnection();
        logger.info(conn.toString());
        final MongoFactoryConnection mongoFactoryConnection = new MongoFactoryConnection(conn);
        final MongoClient client = mongoFactoryConnection.getClient();
        final MongoManaged mongoManaged = new MongoManaged(client);

        final TaskDAO taskDAO = new TaskDAO(client.getDatabase(conn.getDatabase()).getCollection("taskmanagement"));

        environment.lifecycle().manage(mongoManaged);

        logger.info("Registering Resources...");
        logger.info("loading Task Resources");
        environment.jersey().register(new TaskResource(taskDAO));
    }

}
