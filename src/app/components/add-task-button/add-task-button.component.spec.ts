import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { AddTaskButton } from './add-task-button.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

describe('AddTaskButton', () => {
  let component: AddTaskButton;
  let fixture: ComponentFixture<AddTaskButton>;
  let TaskServiceSpy = jasmine.createSpyObj('TaskService', ['addTask']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskButton],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: TaskService, useValue: TaskServiceSpy },
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
});

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({}),
    };
  }
}
