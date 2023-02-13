import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Task from '../Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = [] as Task[];
  private tasksSource = new BehaviorSubject(this._tasks);

  tasks$ = this.tasksSource.asObservable();

  deleteTask(id: number) {
    this._tasks = this._tasks.filter(t => t.id !== id);
    this.tasksSource.next(this._tasks);
  }

  toggleDone(task: Task) {
    this._tasks = this._tasks.map(t =>
      t.id === task.id ? { ...t, done: !t.done } : t
    );
    this.tasksSource.next(this._tasks);
  }

  updateTask(task: Task) {
    if (!this._tasks.some(e => e.id === task.id))
      throw new Error('Task with the given ID does not exist');
    this._tasks = this._tasks.map(t => (t.id === task.id ? task : t));
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
