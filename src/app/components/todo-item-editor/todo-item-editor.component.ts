import { Component, Input, Output, EventEmitter } from '@angular/core';
import Task from 'src/app/Task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-item-editor',
  templateUrl: './todo-item-editor.component.html',
  styleUrls: ['./todo-item-editor.component.scss'],
})
export class TodoItemEditorComponent {
  @Input() task!: Task;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Output() onEdit: EventEmitter<Task> = new EventEmitter();

  editFormText = '';

  ngOnInit(): void {
    this.editFormText = this.task.text;
  }

  closeEdit() {
    this.onClose.emit();
  }

  save(f: NgForm) {
    const newTask: Task = { ...this.task, text: f.value.edit };
    this.onEdit.emit(newTask);
    this.closeEdit();
  }
}
