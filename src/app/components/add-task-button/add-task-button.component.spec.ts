import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { AddTaskButton } from './add-task-button.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';

describe('AddTaskButton', () => {
  let component: AddTaskButton;
  let fixture: ComponentFixture<AddTaskButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaskButton],
      providers: [{ provide: MatDialog, useClass: MatDialogMock }],
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
