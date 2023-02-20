import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { Component, Input } from '@angular/core';
import Task from 'src/app/Task';
import { By } from '@angular/platform-browser';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let task = {
    text: 'bla bla',
    id: 0,
    done: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent,
        StubTodoItemContent,
        StubTodoItemEditor,
      ],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show only the editor if in in edit mode', () => {
    component.isEditMode = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(StubTodoItemEditor));
    const comp = de.injector.get(StubTodoItemEditor);
    expect(comp.task).toEqual(task);

    const content = fixture.debugElement.query(
      By.directive(StubTodoItemContent)
    );
    expect(content).toBeNull();
  });

  it('should show only the content if not in edit mode', () => {
    component.isEditMode = false;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(StubTodoItemContent));
    const comp = de.injector.get(StubTodoItemContent);
    expect(comp.task).toEqual(task);

    const editor = fixture.debugElement.query(By.directive(StubTodoItemEditor));
    expect(editor).toBeNull();
  });

  describe('openEditMode', () => {
    it('should set is edit mode to true', () => {
      component.isEditMode = false;
      component.openEditMode();
      expect(component.isEditMode).toBeTrue();
    });
  });

  describe('closeEditMode', () => {
    it('should set is edit mode to false', () => {
      component.isEditMode = true;
      component.closeEditMode();
      expect(component.isEditMode).toBeFalse();
    });
  });
});

@Component({
  selector: 'app-todo-item-content',
  template: '',
})
class StubTodoItemContent {
  @Input() task!: Task;
}

@Component({
  selector: 'app-todo-item-editor',
  template: '',
})
class StubTodoItemEditor {
  @Input() task!: Task;
}
