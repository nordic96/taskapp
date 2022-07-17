import React, { useEffect } from 'react';
import { AxiosResponse } from 'axios';

import taskService from '../../services/tasks';
import { Task } from '../../services/tasks/types';

const Home = () => {
    useEffect(() => {
        const handleFetchTasks = (res: AxiosResponse<Task[]>) => {
            if (res.status === 200) {
                console.log(res);
            }
        };
        taskService.fetchTask().then(handleFetchTasks);
    }, []);
    return <></>;
};

export default Home;
