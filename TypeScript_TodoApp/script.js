"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let todos = [];
function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    if (!todoList)
        return;
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const todoItem = document.createElement('div');
        todoItem.className = 'mb-2 p-2 bg-white rounded-md flex justify-between items-center';
        todoItem.innerHTML = `
          <span>${todo.todo}</span>---<span>${todo.status ? "complete" : "Pending"}</span>
          <button onclick="removeTodo(${todo.id})" class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Remove</button>
          <button class="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" onclick="openEditPopup(${todo.id})">Update</button>
      `;
        todoList.appendChild(todoItem);
    });
}
function openEditPopup(id) {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        console.log("Todo not found");
        return;
    }
    const editTodoPopup = document.getElementById('editTodoPopup');
    const editTodoForm = document.getElementById('editTodoForm');
    const editTodoNameInput = document.getElementById('editTodoName');
    const editTodoStatusInput = document.getElementById('editTodoStatus');
    editTodoNameInput.value = todo.todo;
    editTodoStatusInput.checked = todo.status;
    editTodoPopup.style.display = 'block';
    editTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedTodo = {
            id: todo.id,
            todo: editTodoNameInput.value,
            status: editTodoStatusInput.checked,
        };
        updateTodo(updatedTodo, todo.id);
        editTodoPopup.style.display = 'none';
    });
    const closePopupButton = document.getElementById('closePopup');
    closePopupButton.addEventListener('click', () => {
        editTodoPopup.style.display = 'none';
    });
}
function removeTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://todo-app-wwun.onrender.com/todo/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else {
                getTodo();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://todo-app-wwun.onrender.com/todo');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            todos = data;
            displayTodos(data);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function updateTodo(tododata, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://todo-app-wwun.onrender.com/todo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tododata),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    });
}
// Call getTodo to fetch and display todos
getTodo();
