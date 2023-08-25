import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  // Define the Todo type using ':'
  todos: Todo[] = [];
  newTodoText: string = '';

  addTodo() {
    if (this.newTodoText.trim() !== '') {
      const newTodo: Todo = {
        id: (this.todos.length + 1).toString(),
        text: this.newTodoText,
        completed: false,
      };

      this.todos.push(newTodo);
      this.newTodoText = ''; // Clear the input field
    }
  }
}

// Define the Todo type outside the component
type Todo = {
  id: string,
  text: string,
  completed: boolean
};
