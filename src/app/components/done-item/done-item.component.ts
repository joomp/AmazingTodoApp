import { Component, Input } from '@angular/core';
import Task from '../../Task';

@Component({
  selector: 'app-done-item',
  templateUrl: './done-item.component.html',
  styleUrls: ['./done-item.component.scss'],
})
export class DoneItemComponent {
  @Input() task!: Task;
}
