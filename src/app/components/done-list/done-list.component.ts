import { Component } from '@angular/core';
import Task from '../../Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.scss'],
})
export class DoneListComponent {
  dones: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .subscribe(tasks => (this.dones = tasks.filter(t => t.done)));
  }
}
