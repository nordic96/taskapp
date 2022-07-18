import React, { useEffect, useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { TaskBoxStyle } from '../TaskBox/styles';
import { isValid, parse } from 'date-fns';

import { useAppDispatch, useAppThunkDispatch } from '../../app/hooks';
import { createTask, TaskActions } from '../../features/tasks/taskReducer';

import { Task } from '../../services/tasks/types';

const TaskTemplate = () => {
    const [dateStr, setDateStr] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const thunkDispatch = useAppThunkDispatch();
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            setDesc(undefined);
            setDateStr(undefined);
        };
    }, []);

    const validateDateStr = (): boolean => {
        if (!dateStr) return false;
        return isValid(parse(dateStr, 'dd-MM-yyyy', new Date()));
    };

    const validateDescStr = (): boolean => {
        if (!desc || desc === '') return false;
        if (desc.length > 100) return false;
        return true;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDateStr(e.target.value);
    };

    const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDesc(e.target.value);
    };

    const onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!desc) return;
        const newTask: Task = { id: '', desc, completed: false, created: 0 };
        thunkDispatch(createTask(newTask));
    };

    const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch({ type: TaskActions.SET_CREATE_OPEN, data: false });
    };

    return (
        <Box sx={TaskBoxStyle('#333')}>
            <Box display={'flex'} flexDirection={'column'} gap={2} width={'100%'}>
                <Box display={'flex'} alignItems={'flex-start'}>
                    <Typography color={'#333'} variant={'body1'}>
                        <b>Add New Task</b>
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    required
                    error={!validateDescStr()}
                    id="outlined-required"
                    label="Description"
                    value={desc}
                    onChange={onChangeDesc}
                />
                <TextField
                    error={!validateDateStr()}
                    fullWidth
                    required
                    value={dateStr}
                    onChange={onChange}
                    id="outlined-required"
                    label="Due Date dd-MM-yyyy"
                    helperText={!validateDateStr() ? 'Incorrect date format' : ''}
                />
                <Box>
                    <Button disabled={!validateDateStr() || !validateDescStr()} onClick={onSave}>
                        Save
                    </Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default TaskTemplate;
