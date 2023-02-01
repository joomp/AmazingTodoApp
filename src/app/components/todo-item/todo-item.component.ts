import { Component, Input, Output, EventEmitter } from '@angular/core';
import Task from 'src/app/Task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() task!: Task;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleDone: EventEmitter<Task> = new EventEmitter();
  @Output() onEdit: EventEmitter<Task> = new EventEmitter();

  onDeleteClick(task: Task) {
    this.onDelete.emit(task);
  }

  onToggleClick(task: Task) {
    this.onToggleDone.emit(task);
  }

  onEditSave(task: Task) {
    this.onEdit.emit(task);
  }
}
