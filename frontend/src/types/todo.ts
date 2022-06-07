import { Timestamp } from 'firebase/firestore/lite';

export type Todo = {
    title: string;
    completed: boolean;
    created_at: Timestamp;
};
