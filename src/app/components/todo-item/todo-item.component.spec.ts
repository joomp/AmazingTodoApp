import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { DoneIndicatorComponent } from '../done-indicator/done-indicator.component';
import Task from 'src/app/Task';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  const testTask: Task = {
    text: 'Test task',
    id: 0,
    done: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent, DoneIndicatorComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.task = testTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
