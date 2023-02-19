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

  const createTaskServiceSpy = () => {
    return jasmine.createSpyObj(
      'TaskService',
      [
        'resetTasks',
        'deleteTask',
        'toggleDone',
        'handleAddTask',
        'handleEdit',
        'addTask',
        'updateTaskText',
      ],
      {
        tasks$: of(testDones.concat(testTodos)),
      }
    );
  };

  let taskServiceSpy = createTaskServiceSpy();

  const task: Task = {
    text: 'Test task',
    id: 4,
    done: false,
  };

  beforeEach(async () => {
    taskServiceSpy = createTaskServiceSpy();
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

  describe('handleDelete', () => {
    it('should call taskService.deleteTask', () => {
      component.handleDeleteTask(task);
      expect(taskServiceSpy.deleteTask.calls.count()).toBe(1);
      expect(taskServiceSpy.deleteTask.calls.first().args[0]).toBe(task.id);
    });
  });

  describe('handleToggleDone', () => {
    it('should call taskService.toggleDone', () => {
      component.handleToggleDone(task);
      expect(taskServiceSpy.toggleDone.calls.count()).toBe(1);
      expect(taskServiceSpy.toggleDone.calls.first().args[0]).toBe(task.id);
    });
  });

  describe('handleAddTask', () => {
    it('should call taskService.addTask', () => {
      const text = 'New task text';
      component.handleAddTask(text);
      expect(taskServiceSpy.addTask.calls.count()).toBe(1);
      expect(taskServiceSpy.addTask.calls.first().args[0]).toBe(text);
    });
  });

  describe('handleEdit', () => {
    it('should call taskService.updateTaskText', () => {
      component.handleEdit(task);
      expect(taskServiceSpy.updateTaskText.calls.count()).toBe(1);
      expect(taskServiceSpy.updateTaskText.calls.first().args[0]).toBe(task.id);
    });
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
