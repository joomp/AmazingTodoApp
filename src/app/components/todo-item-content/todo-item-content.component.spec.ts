import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemContentComponent } from './todo-item-content.component';
import Task from 'src/app/Task';
import { Component, Input } from '@angular/core';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { By } from '@angular/platform-browser';

describe('TodoItemContentComponent', () => {
  let component: TodoItemContentComponent;
  let fixture: ComponentFixture<TodoItemContentComponent>;
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
      declarations: [TodoItemContentComponent, StubDoneIndicatorComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemContentComponent);
    component = fixture.componentInstance;
    task = testTaskDone;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
      expect(el.classes).not.toEqual(jasmine.objectContaining({ done: false }));
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
  it('should call handleToggleDone when task-button is clicked', () => {
    const spy = spyOn(component, 'handleToggleDone');
    const de = fixture.debugElement.query(By.css('.task-button'));
    de.triggerEventHandler('click');
    expect(spy.calls.count()).toBe(1);
  });
  it('should call handleDelete when delete button is clicked', () => {
    const spy = spyOn(component, 'handleDelete');
    const de = fixture.debugElement.query(
      By.css('[data-testid="delete-button"]')
    );
    de.triggerEventHandler('click');
    expect(spy.calls.count()).toBe(1);
  });
  it('should call handleOpenEdit to true when edit button clicked', () => {
    const spy = spyOn(component, 'handleOpenEdit');
    const de = fixture.debugElement.query(
      By.css('[data-testid="edit-button"]')
    );
    de.triggerEventHandler('click');
    expect(spy.calls.count()).toBe(1);
  });

  describe('handleDelete', () => {
    it('should emit onDelete with the task', () => {
      const spy = spyOn(component.onDelete, 'emit');
      component.handleDelete();
      expect(spy.calls.count()).toBe(1);
    });
  });
  describe('handleToggleDone', () => {
    it('should emit onToggleDone with the task', () => {
      const spy = spyOn(component.onToggleDone, 'emit');
      component.handleToggleDone();
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args[0]).toEqual(task);
    });
  });
  describe('handleOpenEdit', () => {
    it('should emit onOpenEdit', () => {
      const spy = spyOn(component.onOpenEdit, 'emit');
      component.handleOpenEdit();
      expect(spy.calls.count()).toBe(1);
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
