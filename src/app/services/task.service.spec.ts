import { every } from 'rxjs';
import Task from '../Task';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  const test_tasks: Task[] = [];
  for (let i = 0; i < 8; i++) {
    test_tasks.push({ id: i, text: `Test task #${i}`, done: false });
  }

  it('should be created without initial tasks', () => {
    service = new TaskService();
    expect(service).toBeTruthy();
  });

  it('should be created with initial tasks', () => {
    service = new TaskService(test_tasks);
    expect(service).toBeTruthy();
  });

  it('should initially have empty task array if no tasks were given', (done: DoneFn) => {
    service = new TaskService();
    service.tasks$.subscribe({
      next: tasks => {
        expect(tasks).withContext('empty array').toEqual([]);
        done();
      },
      error: done.fail,
    });
  });

  it('should should contain initial tasks', (done: DoneFn) => {
    service = new TaskService(test_tasks);
    service.tasks$.subscribe(tasks => {
      expect(tasks).toEqual(test_tasks);
      done();
    });
  });

  describe('deleteTask', () => {
    it('should delete task', (done: DoneFn) => {
      service = new TaskService(test_tasks);
      const task = test_tasks[1];
      service.deleteTask(task.id);
      service.tasks$.subscribe(tasks => {
        // Check deleted task
        expect(tasks).not.toContain(jasmine.objectContaining(task));
        // Check other task did not change
        test_tasks.forEach(t => {
          if (t.id !== task.id) expect(tasks).toContain(t);
        });
        done();
      });
    });

    it('should throw error if the task does not exist', () => {
      service = new TaskService(test_tasks);
      const id = 404;
      expect(() => service.deleteTask(id)).toThrowError(
        Error,
        'Task with the given ID does not exist'
      );
    });
  });

  describe('resetTasks', () => {
    it('should create some tasks', (done: DoneFn) => {
      service = new TaskService(test_tasks);
      service.resetTasks();
      service.tasks$.subscribe(tasks => {
        tasks.forEach(t => {
          expect(t).toEqual(
            jasmine.objectContaining({
              id: jasmine.anything(),
              text: jasmine.anything(),
              done: jasmine.anything(),
            })
          );
        });
        done();
      });
    });
  });

  describe('toggleDone', () => {
    it('should change task from done: true to done: false', (done: DoneFn) => {
      service = new TaskService(test_tasks);
      const task = test_tasks[1];
      service.toggleDone(task.id);
      service.tasks$.subscribe(tasks => {
        // Check edited task
        expect(tasks).toContain(
          jasmine.objectContaining({ ...task, done: !task!.done })
        );
        // Check other task did not change
        test_tasks.forEach(t => {
          if (t.id !== task.id) expect(tasks).toContain(t);
        });
        done();
      });
    });

    it('should throw error if the task does not exist', () => {
      service = new TaskService(test_tasks);
      const id = 404;
      expect(() => service.toggleDone(id)).toThrowError(
        Error,
        'Task with the given ID does not exist'
      );
    });

    it('should return to initial state if same task toggled twice', (done: DoneFn) => {
      service = new TaskService(test_tasks);
      const task = test_tasks[1];
      service.toggleDone(task.id);
      service.toggleDone(task.id);
      service.tasks$.subscribe(tasks => {
        expect(tasks).toEqual(test_tasks);
        done();
      });
    });
  });

  describe('updateTaskText', () => {
    it('should update task text', (done: DoneFn) => {
      service = new TaskService(test_tasks);
      const task = test_tasks[2];
      const newText = 'This is the updated task text';
      service.updateTaskText(task.id, newText);
      service.tasks$.subscribe(tasks => {
        expect(tasks).toContain(
          jasmine.objectContaining({ ...task, text: newText })
        );
        done();
      });
    });
    it('should throw error if the task does not exist', () => {
      service = new TaskService(test_tasks);
      expect(() =>
        service.updateTaskText(404, 'This should fail')
      ).toThrowError(Error, 'Task with the given ID does not exist');
    });
  });

  describe('addTask', () => {
    describe('should add multiple tasks to the list', () => {
      const texts: string[] = [];
      beforeEach(() => {
        const n = 8;
        service = new TaskService();
        for (let i = 0; i < n; i++) {
          const text = `Test task ${i}`;
          texts.push(text);
          service.addTask(text);
        }
      });
      it('should contain all added task', (done: DoneFn) => {
        service.tasks$.subscribe(tasks => {
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
        });
      });
      it('should have unique id properties', (done: DoneFn) => {
        service.tasks$.subscribe(tasks => {
          const hasUniqueIds = tasks.every((element, index) => {
            return tasks.findIndex(e => e.id === element.id) == index;
          });
          expect(hasUniqueIds).toBe(true);
          done();
        });
      });
    });
  });
});
