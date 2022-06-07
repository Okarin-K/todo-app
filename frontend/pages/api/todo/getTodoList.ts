import { getAuth, User } from "firebase/auth";

export async function getTodoList(user: User) {
    const idToken = await user.getIdToken(true);

    console.log(user);

    const response = await fetch("https://backend-ow6hxhcvfa-uc.a.run.app/todos", {
        method: "GET",
        headers: {
            "X-FBUser-Token": idToken ?? "unknown",
        },
    });
    return response.json();
}
