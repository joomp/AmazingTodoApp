import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Task from 'src/app/Task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleDone: EventEmitter<Task> = new EventEmitter();
  @Output() onEdit: EventEmitter<Task> = new EventEmitter();

  isEnableEdit: boolean = false;
  editFormText = '';

  ngOnInit(): void {
    this.editFormText = this.task.text;
  }

  onDeleteClick(task: Task) {
    this.onDelete.emit(task);
  }

  onToggleDoneClick(task: Task) {
    this.onToggleDone.emit(task);
  }

  closeEdit() {
    this.isEnableEdit = false;
  }

  openEdit() {
    this.editFormText = this.task.text;
    this.isEnableEdit = true;
  }

  onEditSave(f: NgForm) {
    const newTask: Task = { ...this.task, text: f.value.edit };
    this.onEdit.emit(newTask);
    this.closeEdit();
  }
}
