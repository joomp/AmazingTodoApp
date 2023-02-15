import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FancyButtonComponent } from '../fancy-button/fancy-button.component';
import { TaskService } from 'src/app/services/task.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const TaskServiceSpy = jasmine.createSpyObj('TaskService', ['resetTasks']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, FancyButtonComponent],
      providers: [{ provide: TaskService, useValue: TaskServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
