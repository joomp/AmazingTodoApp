import { Component, OnInit } from '@angular/core';
import Task from '../../Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todos: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTodoTasks().subscribe(tasks => (this.todos = tasks));
  }
}
