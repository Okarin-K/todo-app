export async function getTodoList(idToken: string) {
    const response = await fetch('http://localhost:5000/todos', {
        method: 'GET',
        headers: {
            'X-FBUser-Token': idToken,
        },
    });
    return response.json();
}
