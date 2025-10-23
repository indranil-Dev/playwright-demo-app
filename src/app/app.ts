import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Todo App');
  protected todos = signal<Todo[]>([]);
  protected newTodo = signal('');

  addTodo() {
    const todo = {
      id: Date.now(),
      text: this.newTodo(),
      completed: false
    };
    this.todos.update(todos => [...todos, todo]);
    this.newTodo.set('');
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }
}
