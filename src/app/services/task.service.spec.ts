import { TestBed } from '@angular/core/testing';
import Task from '../Task';
import { first } from 'rxjs/operators';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have empty task array', (done: DoneFn) => {
    service.tasks$.subscribe({
      next: tasks => {
        expect(tasks).withContext('empty array').toEqual([]);
        done();
      },
      error: done.fail,
    });
  });

  // describe('deleteTask', () => {});
  // describe('toggleDone', () => {});
  describe('updateTask', () => {
    it('should update task text', () => {
      const oldText = 'Old task text';
      const newText = 'New task text';
      service.addTask(oldText);
      let task: Task | undefined;
      service.tasks$.pipe(first()).subscribe(tasks => {
        task = tasks.find(e => e.text === oldText);
      });
      const newTask: Task = { ...task!, text: newText };
      service.updateTask(newTask);
      service.tasks$.pipe(first()).subscribe(tasks => {
        expect(tasks).toContain(jasmine.objectContaining(newTask));
      });
    });
    it('should throw error if the task does not exist', () => {
      const newTask: Task = { id: 1, done: false, text: 'bla bla' };
      expect(() => service.updateTask(newTask)).toThrowError(
        Error,
        'Task with the given ID does not exist'
      );
    });
  });
  describe('addTask', () => {
    describe('should add multiple tasks to the list', () => {
      const texts: string[] = [];
      beforeEach(() => {
        const n = 8;
        for (let i = 0; i < n; i++) {
          const text = `Test task ${i}`;
          texts.push(text);
          service.addTask(text);
        }
      });
      it('should contain all added task', (done: DoneFn) => {
        service.tasks$.subscribe({
          next: tasks => {
            texts.forEach(text => {
              expect(tasks).toContain(
                jasmine.objectContaining({
                  text,
                  id: jasmine.anything(),
                  done: false,
                })
              );
            });
            done();
          },
          error: done.fail,
        });
      });
      it('should have unique id properties', (done: DoneFn) => {
        service.tasks$.subscribe({
          next: tasks => {
            const hasUniqueIds = tasks.every((element, index) => {
              return tasks.findIndex(e => e.id === element.id) == index;
            });
            expect(hasUniqueIds).toBe(true);
            done();
          },
          error: done.fail,
        });
      });
    });
  });
});
