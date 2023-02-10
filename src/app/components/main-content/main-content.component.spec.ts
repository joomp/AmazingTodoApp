import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentComponent } from './main-content.component';
import { HeaderComponent } from '../header/header.component';
import { Component, Input } from '@angular/core';
import Task from 'src/app/Task';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainContentComponent,
        MockAddTaskButtonComponent,
        HeaderComponent,
        MockTodoItem,
      ],
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
