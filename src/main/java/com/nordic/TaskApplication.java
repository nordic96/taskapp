package com.nordic;

import com.nordic.resources.TaskResource;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class TaskApplication extends Application<TaskApplicationConfiguration> {

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
    public void run(final TaskApplicationConfiguration configuration,
                    final Environment environment) {
        // TODO: implement application
        final TaskResource taskResource = new TaskResource();

        environment.jersey().register(taskResource);
    }

}
