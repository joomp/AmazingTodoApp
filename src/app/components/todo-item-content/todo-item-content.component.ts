import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import Task from 'src/app/Task';

@Component({
  selector: 'app-todo-item-content',
  templateUrl: './todo-item-content.component.html',
  styleUrls: ['./todo-item-content.component.scss'],
})
export class TodoItemContentComponent {
  @Input() task!: Task;
  @Output() onOpenEdit: EventEmitter<void> = new EventEmitter();

  constructor(private taskService: TaskService) {}

  handleDelete() {
    this.taskService.deleteTask(this.task.id);
  }

  handleToggleDone() {
    this.taskService.toggleDone(this.task.id);
  }

  handleOpenEdit() {
    this.onOpenEdit.emit();
  }
}
