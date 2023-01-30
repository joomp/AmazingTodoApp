import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Task from '../Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private doneTasks: Task[] = [
    { text: 'Buy eggs', done: true },
    { text: 'Clean dishes', done: true },
  ];
  private todoTasks: Task[] = [
    { text: 'Buy eggs', done: false },
    { text: 'Clean dishes', done: false },
  ];

  constructor() {}

  getDoneTasks(): Observable<Task[]> {
    return of(this.doneTasks);
  }

  getTodoTasks(): Observable<Task[]> {
    return of(this.todoTasks);
  }
}
