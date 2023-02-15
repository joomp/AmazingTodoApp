import { Injectable, Inject, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Task from '../Task';

export const INITIAL_TASKS = new InjectionToken<Task[]>('INITIAL_TASKS');

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSource = new BehaviorSubject(this._tasks);

  tasks$ = this.tasksSource.asObservable();

  constructor(@Inject(INITIAL_TASKS) private _tasks: Task[] = []) {}

  deleteTask(id: number) {
    if (!this._tasks.some(e => e.id === id))
      throw new Error('Task with the given ID does not exist');
    this._tasks = this._tasks.filter(t => t.id !== id);
    this.tasksSource.next(this._tasks);
  }

  toggleDone(id: number) {
    if (!this._tasks.some(e => e.id === id))
      throw new Error('Task with the given ID does not exist');
    this._tasks = this._tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    this.tasksSource.next(this._tasks);
  }

  updateTaskText(id: number, text: string) {
    if (!this._tasks.some(e => e.id === id))
      throw new Error('Task with the given ID does not exist');
    this._tasks = this._tasks.map(t => (t.id === id ? { ...t, text } : t));
    this.tasksSource.next(this._tasks);
  }

  addTask(text: string) {
    const newTask: Task = { text, id: this.generateId(), done: false };
    this._tasks.push(newTask);
    this.tasksSource.next(this._tasks);
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
    this.tasksSource.next(this._tasks);
  }

  private generateId() {
    const maxId = Math.max(...this._tasks.map(t => t.id));
    return Math.max(maxId + 1, 0);
  }
}
