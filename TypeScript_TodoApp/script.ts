interface Todo {
  id: number;
  todo: string;
  status: boolean;
}

type IdType = {
  id: number;
};

let todos: Todo[] = [];

function displayTodos(todos: Todo[]) {
  const todoList = document.getElementById('todoList');
  if (!todoList) return;

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

function openEditPopup(id: number) {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
      console.log("Todo not found");
      return;
  }

  const editTodoPopup = document.getElementById('editTodoPopup') as HTMLElement;
  const editTodoForm = document.getElementById('editTodoForm') as HTMLFormElement;
  const editTodoNameInput = document.getElementById('editTodoName') as HTMLInputElement;
  const editTodoStatusInput = document.getElementById('editTodoStatus') as HTMLInputElement;

  editTodoNameInput.value = todo.todo;
  editTodoStatusInput.checked = todo.status;

  editTodoPopup.style.display = 'block';

  editTodoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedTodo: Todo = {
          id: todo.id,
          todo: editTodoNameInput.value,
          status: editTodoStatusInput.checked,
      };
      updateTodo(updatedTodo, todo.id);
      editTodoPopup.style.display = 'none';
  });

  const closePopupButton = document.getElementById('closePopup') as HTMLElement;
  closePopupButton.addEventListener('click', () => {
      editTodoPopup.style.display = 'none';
  });
}

async function removeTodo(id: IdType) {
  try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
          getTodo();
      }
  } catch (error) {
      console.log(error);
  }
}

async function getTodo() {
  try {
      const response = await fetch('http://localhost:3000/todo');

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      todos = data;
      displayTodos(data);
  } catch (error) {
      console.log(error);
  }
}

async function updateTodo(tododata: Todo, id: number) {
  try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(tododata),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.log(error);
  }
}

// Call getTodo to fetch and display todos
getTodo();