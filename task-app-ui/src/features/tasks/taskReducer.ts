import { Reducer } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { getUnixTime } from "date-fns";

import { AppThunk, AppThunkDispatch } from "../../app/store";
import taskService from "../../services/tasks";
import { Task, TaskRequest } from "../../services/tasks/types";

export interface TaskState {
    tasks: Task[],
    loading: boolean;
    createOpen: boolean;
}

export const initialState: TaskState = {
    tasks: [],
    loading: false,
    createOpen: false,
};

export enum TaskActions {
    SET_TASKS = 'tasks/SET_TASKS',
    SET_LOADING =  'tasks/SET_LOADING',
    SET_CREATE_OPEN = 'tasks/SET_CREATE_OPEN',
}

export type TaskAction =
    | { type: TaskActions.SET_TASKS, data: Task[] }
    | { type: TaskActions.SET_LOADING, data: boolean }
    | { type: TaskActions.SET_CREATE_OPEN, data: boolean };

const reducer: Reducer<TaskState, any> = (state = initialState, action: TaskAction) => {
    switch (action.type) {
        case TaskActions.SET_TASKS:
            return { ...state, tasks: action.data };
        case TaskActions.SET_LOADING:
            return { ...state, loading: action.data };
        case TaskActions.SET_CREATE_OPEN:
            return { ...state, createOpen: action.data };
        default:
            return state;
    }
};

export const fetchTasks = (): AppThunk => async (dispatch: AppThunkDispatch) => {
    const handleFetchTasks = (res: AxiosResponse<Task[]>) => {
        if (res.status === 200) {
            dispatch({ type: TaskActions.SET_TASKS, data: res.data || [] });
        }
        dispatch({ type: TaskActions.SET_LOADING, data: false });
    };
    dispatch({ type: TaskActions.SET_LOADING, data: true });
    setTimeout(() => {
        taskService.fetchTask()
            .then(handleFetchTasks)
            .catch((err) => {
                console.error(err);
                dispatch({ type: TaskActions.SET_LOADING, data: false });
            });
    }, 1000);
};

export const createTask = (task: Task): AppThunk => async (dispatch: AppThunkDispatch) => {
    const now = Date.now();
    const taskRequest: TaskRequest = ({
        id: {
            timestamp: getUnixTime(now),
            date: Math.floor(now / 1000),
        },
        completed: task.completed,
        created: Math.floor(now / 1000),
        desc: task.desc,
    });
    const handleCreateTask = (res: AxiosResponse<string>) => {
        if (res.status === 200) {
            /** TODO: Show snackbar */
        }
        dispatch({ type: TaskActions.SET_CREATE_OPEN, data: false });
    };
    await taskService.createTask(taskRequest).then(handleCreateTask);
};

export default reducer;