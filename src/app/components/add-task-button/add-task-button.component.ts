import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task-button',
  templateUrl: './add-task-button.component.html',
  styleUrls: ['./add-task-button.component.scss'],
})
export class AddTaskButton {
  constructor(public dialog: MatDialog, private taskService: TaskService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: { text: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      const text: string = result;

      if (text) this.taskService.addTask(text);
    });
  }
}
