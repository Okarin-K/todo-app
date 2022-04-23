export async function getTodoList() {
    const response = await fetch('http://localhost:5000/todos');
    return response.json();
}
