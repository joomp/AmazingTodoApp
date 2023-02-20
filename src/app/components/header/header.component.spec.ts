import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FancyButtonComponent } from '../fancy-button/fancy-button.component';
import { TaskService } from 'src/app/services/task.service';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['resetTasks']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, FancyButtonComponent],
      providers: [{ provide: TaskService, useValue: taskServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskService.resetTasks on reset button click', () => {
    const resetBtn = fixture.debugElement.query(
      By.css('[data-testid="reset-button"]')
    );
    resetBtn.nativeElement.click();
    expect(taskServiceSpy.resetTasks).toHaveBeenCalled();
  });
});
