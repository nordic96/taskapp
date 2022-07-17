export interface ObjectId {
    timestamp: number;
    date: number;
}

export interface Task {
    id: string;
    completed: boolean;
    desc: string;
    created: number;
}
