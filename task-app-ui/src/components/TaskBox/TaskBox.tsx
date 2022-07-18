import React from 'react';
/** Components */
import { Box } from '@mui/system';
import { Checkbox, Divider, Typography } from '@mui/material';

import { format } from 'date-fns';

/** Styles */
import { TaskBoxStyle } from './styles';

/** Types */
import { TaskBoxProps } from './types';

const TaskBox = (props: TaskBoxProps) => {
    const { task } = props;
    return (
        <Box sx={TaskBoxStyle('#f29339')}>
            {/* <Typography variant={'h4'}>{'To Do Task'}</Typography> */}
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
                <Checkbox defaultChecked color="success" />
            </Box>
        </Box>
    );
};

export default TaskBox;