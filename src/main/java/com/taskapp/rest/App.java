package com.taskapp.rest;

import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Driver file
 */
public class App extends Application<Configuration> {
    private static final Logger logger = LoggerFactory.getLogger(App.class);

    @Override
    public void initialize(Bootstrap<Configuration> b) {
        //do nothing
    }

    @Override
    public void run(Configuration c, Environment e) throws Exception {
        logger.info("Registering REST resources");
        /** Register all your services */
    }
    public static void main( String[] args ) throws Exception {
        new App().run(args);
    }
}
