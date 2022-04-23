import { Timestamp } from 'firebase/firestore/lite';
import { Todo } from '../../types/todo';

export async function addTodo(title: string): Promise<void> {
    const todo: Todo = {
        title,
        completed: false,
        created_at: Timestamp.fromDate(new Date()),
    };

    fetch('http://localhost:5000/todos', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(todo),
    });
}
