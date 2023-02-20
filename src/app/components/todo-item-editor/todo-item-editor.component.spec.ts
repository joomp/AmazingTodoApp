import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemEditorComponent } from './todo-item-editor.component';
import { By } from '@angular/platform-browser';
import Task from 'src/app/Task';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

describe('TodoItemEditorComponent', () => {
  let component: TodoItemEditorComponent;
  let fixture: ComponentFixture<TodoItemEditorComponent>;

  const task: Task = {
    text: 'Test task done',
    id: 1,
    done: true,
  };

  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['updateTaskText']);
    await TestBed.configureTestingModule({
      declarations: [TodoItemEditorComponent],
      imports: [FormsModule, MaterialModule, NoopAnimationsModule],
      providers: [{ provide: TaskService, useValue: taskServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemEditorComponent);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(async () => {
    fixture.detectChanges();
    await fixture.whenStable();
  });
  it('should have same text as the original task', () => {
    const de = fixture.debugElement.query(By.css('textarea'));
    const textContent = de.nativeElement.value;
    expect(textContent).toContain(task.text);
  });
  describe('pristine textarea', () => {
    it('should emit onClose and emit onClose and not save changes on cancel button click', () => {
      const spySave = spyOn(component, 'save').and.callThrough();
      const spyClose = spyOn(component.onClose, 'emit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="cancel-button"')
      );
      de.triggerEventHandler('click');
      expect(spySave.calls.count()).toBe(0);
      expect(spyClose.calls.count()).toBe(1);
    });
    it('should emit onClose and emit onEdit and save on save button click', () => {
      const spySave = spyOn(component, 'save').and.callThrough();
      const spyClose = spyOn(component.onClose, 'emit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="save-button"')
      );
      de.nativeElement.click();
      expect(spySave.calls.count()).toBe(1);
      expect(spyClose.calls.count()).toBe(1);
    });
  });
  describe('edited textarea', () => {
    const newTask = {
      ...task,
      text: 'This is the new and edited tasks text',
    };
    beforeEach(() => {
      const input = fixture.debugElement.query(By.css('textarea'));
      input.nativeElement.value = newTask.text;
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('input'));
    });
    it('should emit onClose and not save on cancel button click', () => {
      const spySave = spyOn(component, 'save').and.callThrough();
      const spyClose = spyOn(component.onClose, 'emit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="cancel-button"')
      );
      de.triggerEventHandler('click');
      expect(spySave.calls.count()).toBe(0);
      expect(spyClose.calls.count()).toBe(1);
    });
    it('should emit onClose and save on save button click', () => {
      const spySave = spyOn(component, 'save').and.callThrough();
      const spyClose = spyOn(component.onClose, 'emit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="save-button"')
      );
      de.nativeElement.click();
      expect(spySave.calls.count()).toBe(1);
      expect(spyClose.calls.count()).toBe(1);
    });
  });

  describe('closeEdit', () => {
    it('should emit onClose', () => {
      const spy = spyOn(component.onClose, 'emit');
      component.closeEdit();

      expect(spy.calls.count()).toBe(1);
    });
  });

  describe('save', () => {
    it('should call taskService.updateTaskText with the changed task text', () => {
      const newTask = {
        ...task,
        text: 'This is the new and edited tasks text',
      };

      const input = fixture.debugElement.query(By.css('textarea'));
      input.nativeElement.value = newTask.text;
      fixture.detectChanges();
      input.nativeElement.dispatchEvent(new Event('input'));

      const de = fixture.debugElement.query(By.directive(NgForm));
      const comp = de.injector.get(NgForm);
      const saveButton = fixture.debugElement.query(
        By.css('[data-testid="save-button"')
      );
      saveButton.nativeElement.click();

      component.save(comp);
      expect(taskServiceSpy.updateTaskText).toHaveBeenCalledWith(
        newTask.id,
        newTask.text
      );
    });
  });

  it('should call taskService.updateTaskText with unchanged task text', () => {
    const de = fixture.debugElement.query(By.directive(NgForm));
    const comp = de.injector.get(NgForm);
    const saveButton = fixture.debugElement.query(
      By.css('[data-testid="save-button"')
    );
    saveButton.nativeElement.click();

    component.save(comp);
    expect(taskServiceSpy.updateTaskText).toHaveBeenCalledWith(
      task.id,
      task.text
    );
  });
});
