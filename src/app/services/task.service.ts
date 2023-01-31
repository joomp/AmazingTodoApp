import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import Task from '../Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject([] as Task[]);

  constructor() {
    this.resetTasks();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks;
  }

  resetTasks() {
    this.tasks.next([
      { text: 'Buy eggs', done: true },
      { text: 'Clean dishes', done: true },
      { text: 'Bake a cake', done: false },
      { text: 'Buy milk', done: false },
      {
        text: 'This is a long todo task. I do not want to do this, because it is so long.',
        done: false,
      },
    ]);
  }
}
