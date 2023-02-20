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

  const testDones: Task[] = [
    { text: 'Buy eggs', done: true, id: 1 },
    { text: 'Do the dishes', done: true, id: 2 },
  ];
  const testTodos: Task[] = [
    { text: 'Bake a cake', done: false, id: 3 },
    { text: 'Buy milk', done: false, id: 4 },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fuga magnam sunt enim quam iste eos incidunt laudantium vel et excepturi hic ipsum nulla, possimus deserunt recusandae non aperiam odio.',
      done: false,
      id: 5,
    },
  ];

  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['resetTasks'], {
      tasks$: of(testDones.concat(testTodos)),
    });
    await TestBed.configureTestingModule({
      declarations: [
        MainContentComponent,
        MockAddTaskButtonComponent,
        HeaderComponent,
        MockTodoItem,
      ],
      providers: [{ provide: TaskService, useValue: taskServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct todos and dones', () => {
    expect(component.todos).toEqual(testTodos);
    expect(component.dones).toEqual(testDones);
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
