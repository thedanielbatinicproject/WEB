let todos = [];
let lastID = 0;

function addTodo(cat, cont, userId) {
    todos.push({
        id: lastID,
        category: cat,
        date: new Date().toLocaleDateString(),
        cont: cont,
        userId: userId
    });
    lastID++;
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
}

function returnTodos(){
    return todos;
}

function returnTodo(id) {
    return todos.filter(todo => todo.id == id)[0]
}

function getLatestId() {
    return lastID-1;
}

module.exports={addTodo, removeTodo, returnTodos, returnTodo, getLatestId}