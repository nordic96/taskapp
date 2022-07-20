import React from 'react';
import { Task } from '../../../services/tasks/types';
import TaskBox from '../TaskBox';
import data from './test-task.json';
import { renderWithProviders } from '../../../utils/test-utils';
import { screen } from '@testing-library/react';

describe('Testing TaskBox Component', () => {
    it('passes matching snapshot', () => {
        const testTask = data as Task;
        renderWithProviders(<TaskBox task={testTask} />);

        expect(screen.getByText(/Testing Description/)).toBeInTheDocument();
    });
});
