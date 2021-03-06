import axios, { AxiosResponse } from 'axios';
import { Task, TaskRequest } from './types';

const BASE = '/tasks';
const URL_CREATE = `${BASE}/action/add`
const URL_UPDATE = (id: string) => `${BASE}/action/update/${id}`;
const URL_DELETE = (id: string) => `${BASE}/action/delete/${id}`;

const fetchTask = (): Promise<AxiosResponse<Task[]>> => {
    return axios.get(BASE);
};

const createTask = (task: TaskRequest): Promise<AxiosResponse<string>> => {
    return axios.post(URL_CREATE, task);
};

const updateTask = (task: Task) => {
    return axios.put(URL_UPDATE(task.id), task);
};

const deleteTask = (id: string) => {
    return axios.delete(URL_DELETE(id));
};

const taskService = { fetchTask, createTask, updateTask, deleteTask };

export default taskService;