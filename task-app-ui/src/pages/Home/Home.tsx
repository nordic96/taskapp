import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import taskService from '../../services/tasks';
import { Task } from '../../services/tasks/types';
import { Box } from '@mui/material';
import TaskBox from '../../components/TaskBox';

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        const handleFetchTasks = (res: AxiosResponse<Task[]>) => {
            if (res.status === 200) {
                console.log(res);
                setTasks(res.data || []);
            }
        };
        taskService.fetchTask().then(handleFetchTasks);
    }, []);
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
        }}>
            {tasks.map((task, i) => {
                return <TaskBox key={i} task={task} />
            })}
        </Box>
    );
};

export default Home;
