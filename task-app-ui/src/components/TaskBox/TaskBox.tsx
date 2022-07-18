import React from 'react';
/** Components */
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, Divider, IconButton, Typography } from '@mui/material';

import { format } from 'date-fns';

/** Styles */
import { TaskBoxStyle } from './styles';

/** Types */
import { TaskBoxProps } from './types';
import { Task } from '../../services/tasks/types';

/** Redux */
import { useAppThunkDispatch } from '../../app/hooks';
import { deleteTask, updateTask } from '../../features/tasks/taskReducer';
import { TaskCompletedColor, TaskIncompleteColor } from '../../constants/taskstatus';

const TaskBox = (props: TaskBoxProps) => {
    const { task } = props;
    const thunkDispatch = useAppThunkDispatch();

    const onToggle = () => {
        const newTask: Task = Object.assign({}, task);
        newTask.completed = !task.completed;
        thunkDispatch(updateTask(newTask));
    };

    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        thunkDispatch(deleteTask(task.id));
    };

    return (
        <Box sx={TaskBoxStyle(task.completed ? TaskCompletedColor : TaskIncompleteColor )}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                flex: 9,
            }}>
                <Typography color={'#333'} variant={'body1'}>{task.desc}</Typography>
                <Divider variant={'middle'} />
                <Typography color={'#333'} fontStyle={'italic'} variant={'caption'}>{`Created on ${format(task.created, 'dd MMM yyyy HH:mm:ss')}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Checkbox checked={task.completed} color="success" onClick={onToggle} />
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default TaskBox;