import React, { useEffect, useState } from 'react';

/** Components */
import { Box, Button, Typography } from '@mui/material';
import TaskBox from '../../components/TaskBox';
import TaskTemplate from '../../components/TaskTemplate';
import Loading from '../../components/Loading';

import { labelStyles, pageContainerStyles } from './styles';

import { useAppDispatch, useAppSelector, useAppThunkDispatch } from '../../app/hooks';
import { fetchTasks, TaskActions } from '../../features/tasks/taskReducer';

const Home = () => {
    const state = useAppSelector((s) => s.page_task);
    const thunkDispatch = useAppThunkDispatch();
    const dispatch = useAppDispatch();
    const [completedCount, setCompletedCount]= useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const { tasks, loading, createOpen, count } = state;

    useEffect(() => {
        if (createOpen) return;
        thunkDispatch(fetchTasks());
    }, [createOpen, thunkDispatch, count]);

    useEffect(() => {
        if (!tasks) return;
        setTotalCount(tasks.length);
        setCompletedCount(tasks.filter((x) => x.completed).length);
    }, [tasks]);

    const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch({ type: TaskActions.SET_CREATE_OPEN, data: true });
    };

    return (
        <Box sx={pageContainerStyles}>
            <Box sx={{ padding: 2, flex: 1, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2, backgroundColor: '#f6f8fa' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                    <Typography id={'label-total'} sx={{ backgroundColor: '#cae9f5', color: '#2a98b9', ...labelStyles }}>
                        {`Total: ${totalCount}`}
                    </Typography>
                    <Typography id={'label-completed'} sx={{ backgroundColor: '#cff1e6', color: '#127458', ...labelStyles }}>
                        {`Completed: ${completedCount}`}
                    </Typography>
                    <Typography id={'label-pending'} sx={{ backgroundColor: '#fff59e', color: '#e8a317', ...labelStyles }}>
                        {`Pending: ${totalCount - completedCount}`}
                    </Typography>
                </Box>
                <Button id={'btn-create-task'} onClick={onClickCreate} disabled={createOpen}>
                    Create New Task
                </Button>
            </Box>
            {createOpen && <TaskTemplate />}
            {loading && <Loading />}
            {!loading && tasks.map((task, i) => {
                return <TaskBox key={i} task={task} />
            })}
        </Box>
    );
};

export default Home;
