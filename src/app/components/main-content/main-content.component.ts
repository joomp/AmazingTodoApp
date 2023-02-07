import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import Task from 'src/app/Task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit, OnDestroy {
  dones: Task[] = [];
  todos: Task[] = [];
  subscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.taskService.tasks$.subscribe(tasks => {
        this.dones = tasks.filter(t => t.done);
        this.todos = tasks.filter(t => !t.done);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDeleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  onToggleDone(task: Task) {
    this.taskService.toggleDone(task);
  }

  onAddTask(text: string) {
    this.taskService.addTask(text);
  }

  onEdit(task: Task) {
    this.taskService.updateTask(task);
  }
}
