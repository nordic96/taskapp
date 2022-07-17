import React from 'react';
/** Components */
import { Box } from '@mui/system';
import { Checkbox, Divider, Typography } from '@mui/material';

import { format } from 'date-fns';

/** Types */
import { Task } from '../../services/tasks/types';

interface TaskBoxProps {
    task: Task;
}

const TaskBox = (props: TaskBoxProps) => {
    const { task } = props;
    return (
        <Box sx={{
            borderLeft: '10px solid yellow',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            width: '40vw',
            maxWidth: 600,
            minHeight: 50,
            borderRadius: '4px',
            padding: '16px 24px',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        }}>
            {/* <Typography variant={'h4'}>{'To Do Task'}</Typography> */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                flex: 9,
            }}>
                <Typography color={'#333'} variant={'body1'}>{task.desc}</Typography>
                <Divider variant={'middle'} />
                <Typography color={'#333'} fontStyle={'italic'} variant={'body1'}>{`Created on ${format(task.created, 'dd MMM yyyy')}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Checkbox defaultChecked color="success" />
            </Box>
        </Box>
    );
};

export default TaskBox;