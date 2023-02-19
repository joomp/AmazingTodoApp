import { Component, Input, Output, EventEmitter } from '@angular/core';
import Task from 'src/app/Task';

@Component({
  selector: 'app-todo-item-content',
  templateUrl: './todo-item-content.component.html',
  styleUrls: ['./todo-item-content.component.scss'],
})
export class TodoItemContentComponent {
  @Input() task!: Task;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onOpenEdit: EventEmitter<void> = new EventEmitter();
  @Output() onToggleDone: EventEmitter<Task> = new EventEmitter();

  handleDelete() {
    this.onDelete.emit(this.task);
  }

  handleToggleDone() {
    this.onToggleDone.emit(this.task);
  }

  handleOpenEdit() {
    this.onOpenEdit.emit();
  }
}
