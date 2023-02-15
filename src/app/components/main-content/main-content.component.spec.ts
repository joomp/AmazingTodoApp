import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentComponent } from './main-content.component';
import { HeaderComponent } from '../header/header.component';
import { Component, Input } from '@angular/core';
import Task from 'src/app/Task';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;

  let TaskServiceSpy = jasmine.createSpyObj('TaskService', ['resetTasks'], {
    tasks$: of([]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainContentComponent,
        MockAddTaskButtonComponent,
        HeaderComponent,
        MockTodoItem,
      ],
      providers: [{ provide: TaskService, useValue: TaskServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-add-task-button',
  template: '',
})
class MockAddTaskButtonComponent {}

@Component({
  selector: 'app-todo-item',
  template: '',
})
class MockTodoItem {
  @Input() task!: Task;
}
