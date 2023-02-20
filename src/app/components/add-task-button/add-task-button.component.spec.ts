import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { AddTaskButton } from './add-task-button.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

describe('AddTaskButton', () => {
  let component: AddTaskButton;
  let fixture: ComponentFixture<AddTaskButton>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['addTask']);
    const testDialogResult = 'This is the new task text';
    dialogSpy = jasmine.createSpyObj('MatDialog', {
      open: {
        afterClosed: () => of(testDialogResult),
      },
    });
    await TestBed.configureTestingModule({
      declarations: [AddTaskButton, AddTaskDialogComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialog', () => {
    it('should call dialog.open', () => {
      component.openDialog();
      expect(dialogSpy.open).toHaveBeenCalledWith(AddTaskDialogComponent, {
        data: { text: '' },
      });
    });
    // TODO: test dialogRef.afterClosed()
  });
});
