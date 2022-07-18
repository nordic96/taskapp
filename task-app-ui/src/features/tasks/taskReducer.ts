import { Reducer } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { AppThunk, AppThunkDispatch } from "../../app/store";
import taskService from "../../services/tasks";
import { Task } from "../../services/tasks/types";

export interface TaskState {
    tasks: Task[],
    loading: boolean;
}

export const initialState: TaskState = {
    tasks: [],
    loading: false,
};

export enum TaskActions {
    SET_TASKS = 'tasks/SET_TASKS',
    SET_LOADING =  'tasks/SET_LOADING',
}

export type TaskAction =
    | { type: TaskActions.SET_TASKS, data: Task[] }
    | { type: TaskActions.SET_LOADING, data: boolean };

const reducer: Reducer<TaskState, any> = (state = initialState, action: TaskAction) => {
    switch (action.type) {
        case TaskActions.SET_TASKS:
            return { ...state, tasks: action.data };
        case TaskActions.SET_LOADING:
            return { ...state, loading: action.data };
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

export default reducer;