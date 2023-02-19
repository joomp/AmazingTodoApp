import { Component, EventEmitter, Input, Output } from '@angular/core';
import Task from 'src/app/Task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() task!: Task;
  @Output() onToggleDone: EventEmitter<Task> = new EventEmitter();
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onEdit: EventEmitter<Task> = new EventEmitter();

  isEditMode: boolean = false;

  openEditMode() {
    this.isEditMode = true;
  }

  closeEditMode() {
    this.isEditMode = false;
  }

  handleToggleDone(task: Task) {
    this.onToggleDone.emit(task);
  }

  handleDelete(task: Task) {
    this.onDelete.emit(task);
  }

  handleEdit(task: Task) {
    this.onEdit.emit(task);
  }
}
