import { Component } from '@angular/core';
import Task from '../../Task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todos: Task[] = [{ text: 'Buy milk' }, { text: 'Bake a cake' }];
}
