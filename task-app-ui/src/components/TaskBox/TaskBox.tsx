import React, { useState } from 'react';

/** Components */
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Divider, IconButton, TextField, Typography } from '@mui/material';

import { format, fromUnixTime } from 'date-fns';

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
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newDesc, setNewDesc] = useState<string>(task.desc);
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

    const onClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEditMode(true);
    };

    const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewDesc(e.target.value);
    };

    const onClickSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newTask: Task = Object.assign({}, task);
        newTask.desc = newDesc;
        thunkDispatch(updateTask(newTask));
    };

    const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setNewDesc(task.desc);
        setEditMode(false);
    };

    return (
        <Box id={`taskbox-${task.created}`} sx={TaskBoxStyle(task.completed ? TaskCompletedColor : TaskIncompleteColor )}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                flex: 9,
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 2 }}>
                    <Typography minWidth={120} fontSize={14} color={'#333'} variant={'body1'}>
                        {`Due ${format(fromUnixTime(task.due), 'dd MMM yy')}`}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                        {editMode 
                            ? <Box>
                                <TextField size={'small'} defaultValue={task.desc} onChange={onChangeDesc} />                                
                              </Box>
                            : <Typography textAlign={'left'} color={'#333'} variant={'body2'}>
                                {task.desc}
                              </Typography>
                        }
                    </Box>
                </Box>
                <Divider variant={'middle'} />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', }}>
                    <Typography color={'#888'} fontStyle={'italic'} variant={'caption'}>
                        {`Created on ${format(task.created, 'dd MMM yyyy HH:mm:ss')}`}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Box display={'flex'}>
                    <Checkbox checked={task.completed} color="success" onClick={onToggle} disabled={editMode} />
                    <IconButton onClick={onClickEdit} disabled={editMode}>
                        <EditIcon fontSize='small'/>
                    </IconButton>
                    <IconButton id={`btn-delete-task-${task.created}`} onClick={onDelete} disabled={editMode}>
                        <DeleteIcon fontSize={'small'} />
                    </IconButton>
                </Box>
                {editMode &&
                    <Box display={'flex'}>
                        <Button size={'small'} onClick={onClickSave}>
                            Save
                        </Button>
                        <Button size={'small'} onClick={onCancel}>
                            Cancel
                        </Button>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default TaskBox;