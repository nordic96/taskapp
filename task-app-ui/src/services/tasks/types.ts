export interface ObjectId {
    timestamp: number;
    date: number;
}

export interface TaskContent {
    completed: boolean;
    desc: string;
    created: number;
    due: number;
}

export interface Task extends TaskContent {
    id: string;
}

export interface TaskRequest extends TaskContent {
    id: {
        timestamp: number;
        date: number;
    };
}