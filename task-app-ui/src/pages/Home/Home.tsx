import React, { useEffect } from 'react';

/** Components */
import { Box, Button } from '@mui/material';
import TaskBox from '../../components/TaskBox';
import TaskTemplate from '../../components/TaskTemplate';
import Loading from '../../components/Loading';

import { useAppDispatch, useAppSelector, useAppThunkDispatch } from '../../app/hooks';
import { fetchTasks, TaskActions } from '../../features/tasks/taskReducer';

const Home = () => {
    const state = useAppSelector((s) => s.page_task);
    const thunkDispatch = useAppThunkDispatch();
    const dispatch = useAppDispatch();
    const { tasks, loading, createOpen } = state;

    useEffect(() => {
        if (createOpen) return;
        thunkDispatch(fetchTasks());
    }, [createOpen, thunkDispatch]);

    const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch({ type: TaskActions.SET_CREATE_OPEN, data: true });
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Button onClick={onClickCreate}>Create New Task</Button>
            {createOpen && <TaskTemplate />}
            {loading && <Loading />}
            {!loading && tasks.map((task, i) => {
                return <TaskBox key={i} task={task} />
            })}
        </Box>
    );
};

export default Home;
