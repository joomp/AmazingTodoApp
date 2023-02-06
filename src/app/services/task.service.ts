import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import Task from '../Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = [] as Task[];
  private tasks = new BehaviorSubject(this._tasks);

  constructor() {
    this.resetTasks();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks;
  }

  deleteTask(id: number) {
    this._tasks = this._tasks.filter(t => t.id !== id);
    this.tasks.next(this._tasks);
  }

  toggleDone(task: Task) {
    this._tasks = this._tasks.map(t =>
      t.id === task.id ? { ...t, done: !t.done } : t
    );
    this.tasks.next(this._tasks);
  }

  updateTask(task: Task) {
    this._tasks = this._tasks.map(t => (t.id === task.id ? task : t));
    this.tasks.next(this._tasks);
  }

  addTask(text: string) {
    const newTask: Task = { text, id: this.generateId(), done: false };
    this._tasks.push(newTask);
    this.tasks.next(this._tasks);
  }

  resetTasks() {
    this._tasks = [
      { text: 'Buy eggs', done: true, id: 1 },
      { text: 'Do the dishes', done: true, id: 2 },
      { text: 'Bake a cake', done: false, id: 3 },
      { text: 'Buy milk', done: false, id: 4 },
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fuga magnam sunt enim quam iste eos incidunt laudantium vel et excepturi hic ipsum nulla, possimus deserunt recusandae non aperiam odio.',
        done: false,
        id: 5,
      },
    ];
    this.tasks.next(this._tasks);
  }

  private generateId() {
    const maxId = Math.max(...this._tasks.map(t => t.id));
    return maxId + 1;
  }
}
