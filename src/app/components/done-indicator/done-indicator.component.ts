import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-done-indicator',
  templateUrl: './done-indicator.component.html',
  styleUrls: ['./done-indicator.component.scss'],
})
export class DoneIndicatorComponent {
  @Input() done!: Boolean;
}
