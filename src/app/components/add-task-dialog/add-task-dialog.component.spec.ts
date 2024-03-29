import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskDialogComponent } from './add-task-dialog.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddTaskDialogComponent', () => {
  let component: AddTaskDialogComponent;
  let fixture: ComponentFixture<AddTaskDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddTaskDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj(
      'MatDialogRef<AddTaskDialogComponent>>',
      ['close']
    );
    await TestBed.configureTestingModule({
      declarations: [AddTaskDialogComponent],
      imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { text: '' } },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCancelClick', () => {
    it('should call dialog.close on cancel click', () => {
      component.onCancelClick();
      expect(dialogRefSpy.close).toHaveBeenCalled();
    });
  });
});
