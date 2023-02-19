import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemEditorComponent } from './todo-item-editor.component';
import { By } from '@angular/platform-browser';
import Task from 'src/app/Task';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgForm } from '@angular/forms';

describe('TodoItemEditorComponent', () => {
  let component: TodoItemEditorComponent;
  let fixture: ComponentFixture<TodoItemEditorComponent>;

  const task: Task = {
    text: 'Test task done',
    id: 1,
    done: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemEditorComponent],
      imports: [FormsModule, MaterialModule, NoopAnimationsModule],
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
    it('should close and emit onClose and not emit onEdit on cancel', () => {
      const spyEdit = spyOn(component.onEdit, 'emit');
      const spyClose = spyOn(component.onClose, 'emit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="cancel-button"')
      );
      de.triggerEventHandler('click');
      expect(spyEdit.calls.count()).toBe(0);
      expect(spyClose.calls.count()).toBe(1);
    });
    it('should close and emit onEdit and onSave on save', () => {
      const spyEdit = spyOn(component.onEdit, 'emit');
      const spyClose = spyOn(component.onClose, 'emit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="save-button"')
      );
      de.nativeElement.click();
      expect(spyEdit.calls.count()).toBe(1);
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
    it('should close and not emit onEdit on cancel', () => {
      const spyEdit = spyOn(component.onEdit, 'emit');
      const spyClose = spyOn(component.onClose, 'emit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="cancel-button"')
      );
      de.triggerEventHandler('click');
      expect(spyEdit.calls.count()).toBe(0);
      expect(spyClose.calls.count()).toBe(1);
    });
    it('should close and emit onEdit on save', () => {
      const spyEdit = spyOn(component.onEdit, 'emit');
      const spyClose = spyOn(component.onClose, 'emit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="save-button"')
      );
      de.nativeElement.click();
      expect(spyEdit.calls.count()).toBe(1);
      expect(spyClose.calls.count()).toBe(1);
      expect(spyEdit.calls.first().args[0]).toEqual(newTask);
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
    it('should emit onEdit with the updated task', () => {
      const spy = spyOn(component.onEdit, 'emit');
      const de = fixture.debugElement.query(By.directive(NgForm));
      const comp = de.injector.get(NgForm);

      const newText = 'This is the new edited task text';
      comp.value.edit = newText;
      fixture.detectChanges();

      component.save(comp);
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]!.text).toEqual(newText);
    });
  });
});
