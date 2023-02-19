import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { TodoItemComponent } from './todo-item.component';
import Task from 'src/app/Task';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NgForm } from '@angular/forms';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  const testTaskDone: Task = {
    text: 'Test task done',
    id: 1,
    done: true,
  };
  const testTaskNotDone: Task = {
    text: 'Test not done',
    id: 2,
    done: false,
  };
  let task = testTaskDone;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent, StubDoneIndicatorComponent],
      imports: [MaterialModule, FormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('edit disabled', () => {
    describe('should display undone task properly', () => {
      const task = testTaskNotDone;
      beforeEach(async () => {
        component.task = task;
        fixture.detectChanges();
      });
      it('should have done indicator with false done attribute', () => {
        const de = fixture.debugElement.query(
          By.directive(StubDoneIndicatorComponent)
        );
        const comp = de.injector.get(StubDoneIndicatorComponent);
        expect(comp.done).toBeFalse();
      });
      it('should use correct class for text', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="text"]'));
        expect(el.classes).not.toEqual(
          jasmine.objectContaining({ done: false })
        );
      });
    });

    describe('should display done task properly', () => {
      beforeEach(async () => {
        component.task = testTaskDone;
        fixture.detectChanges();
      });
      it('should have done indicator with true done attribute', () => {
        const de = fixture.debugElement.query(
          By.directive(StubDoneIndicatorComponent)
        );
        const comp = de.injector.get(StubDoneIndicatorComponent);
        expect(comp.done).toBeTrue();
      });
      it('should use correct class for text', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="text"]'));
        expect(el.classes).toEqual(jasmine.objectContaining({ done: true }));
      });
    });

    it('should have correct text', () => {
      const de = fixture.debugElement.query(By.css('[data-testid="text"]'));
      const textContent = de.nativeElement.textContent;
      expect(textContent).toContain(task.text);
    });
    it('should call onToggleDoneClick when task-button is clicked', () => {
      const spy = spyOn(component, 'onToggleDoneClick');
      const de = fixture.debugElement.query(By.css('.task-button'));
      de.triggerEventHandler('click');
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]).toEqual(task);
    });
    it('should call onDeleteClick when delete button is clicked', () => {
      const spy = spyOn(component, 'onDeleteClick');
      const de = fixture.debugElement.query(
        By.css('[data-testid="delete-button"]')
      );
      de.triggerEventHandler('click');
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]).toEqual(task);
    });
    it('should call openEdit to true when edit button clicked', () => {
      const spy = spyOn(component, 'openEdit');
      const de = fixture.debugElement.query(
        By.css('[data-testid="edit-button"]')
      );
      de.triggerEventHandler('click');
      expect(spy.calls.count()).toBe(1);
    });
  });

  describe('edit enabled', () => {
    beforeEach(async () => {
      component.isEnableEdit = true;
      fixture.detectChanges();
      await fixture.whenStable();
    });
    it('should have same text as the original task', () => {
      const de = fixture.debugElement.query(By.css('textarea'));
      const textContent = de.nativeElement.value;
      expect(textContent).toContain(task.text);
    });
    describe('pristine textarea', () => {
      it('should close and not emit onEdit on cancel', () => {
        const spy = spyOn(component.onEdit, 'emit');
        const de = fixture.debugElement.query(
          By.css('[data-testid="cancel-button"')
        );
        de.triggerEventHandler('click');
        expect(spy.calls.count()).toBe(0);
      });
      it('should close and emit onEdit on save', () => {
        const spy = spyOn(component.onEdit, 'emit');
        const de = fixture.debugElement.query(
          By.css('[data-testid="save-button"')
        );
        de.nativeElement.click();
        expect(spy.calls.count()).toBe(1);
        expect(spy.calls.first().args[0]).toEqual(task);
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
        const spy = spyOn(component.onEdit, 'emit');
        const de = fixture.debugElement.query(
          By.css('[data-testid="cancel-button"')
        );
        de.triggerEventHandler('click');
        expect(spy.calls.count()).toBe(0);
      });
      it('should close and emit onEdit on save', () => {
        const spy = spyOn(component.onEdit, 'emit');
        const de = fixture.debugElement.query(
          By.css('[data-testid="save-button"')
        );
        de.nativeElement.click();
        expect(spy.calls.count()).toBe(1);
        expect(spy.calls.first().args[0]).toEqual(newTask);
      });
    });
  });

  describe('onDeleteClick', () => {
    it('should emit onDelete with the task', () => {
      const spy = spyOn(component.onDelete, 'emit');
      component.onDeleteClick(task);
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]).toEqual(task);
    });
  });
  describe('onToggleDoneClick', () => {
    it('should emit onToggleDone with the task', () => {
      const spy = spyOn(component.onToggleDone, 'emit');
      component.onToggleDoneClick(task);
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]).toEqual(task);
    });
  });
  describe('closeEdit', () => {
    it('should set enableEdit to false', () => {
      component.isEnableEdit = true;
      fixture.detectChanges();
      component.closeEdit();
      expect(component.isEnableEdit).toBeFalse();
    });
  });
  describe('openEdit', () => {
    it('should set enableEdit to true', () => {
      component.isEnableEdit = false;
      fixture.detectChanges();
      component.openEdit();
      expect(component.isEnableEdit).toBeTrue();
    });
  });
  describe('onEditSave', () => {
    it('should emit onEdit with the updated task', () => {
      component.isEnableEdit = true;
      fixture.detectChanges();
      const spy = spyOn(component.onEdit, 'emit');
      const de = fixture.debugElement.query(By.directive(NgForm));
      const comp = de.injector.get(NgForm);

      const newText = 'This is the new edited task text';
      comp.value.edit = newText;
      fixture.detectChanges();

      component.onEditSave(comp);
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]!.text).toEqual(newText);
    });
  });
});

@Component({
  selector: 'app-done-indicator',
  template: '',
})
class StubDoneIndicatorComponent {
  @Input() done!: boolean;
}
