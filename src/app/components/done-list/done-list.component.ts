import { Component } from '@angular/core';
import Task from '../../Task';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.scss'],
})
export class DoneListComponent {
  dones: Task[] = [{ text: 'Buy eggs' }, { text: 'Clean dishes' }];
}
