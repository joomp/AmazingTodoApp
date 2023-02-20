import { Component, Input, Output, EventEmitter } from '@angular/core';
import Task from 'src/app/Task';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-todo-item-editor',
  templateUrl: './todo-item-editor.component.html',
  styleUrls: ['./todo-item-editor.component.scss'],
})
export class TodoItemEditorComponent {
  @Input() task!: Task;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  editFormText = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.editFormText = this.task.text;
  }

  closeEdit() {
    this.onClose.emit();
  }

  save(f: NgForm) {
    const newText = f.value.edit;
    this.taskService.updateTaskText(this.task.id, newText);
    this.closeEdit();
  }
}
