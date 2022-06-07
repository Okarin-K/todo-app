import { getAuth, User } from "firebase/auth";
import { Timestamp } from "firebase/firestore/lite";
import { Todo } from "../../todos";

export async function addTodo(user: User, title: string): Promise<void> {
    const idToken = await user.getIdToken(true);

    const todo: Todo = {
        title,
        completed: false,
        created_at: Timestamp.fromDate(new Date()),
    };

    fetch("http://localhost:5000/todos", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "X-FBUser-Token": idToken ?? "unknown",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(todo),
    });
}
