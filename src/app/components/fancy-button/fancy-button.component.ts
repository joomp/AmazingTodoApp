import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fancy-button',
  templateUrl: './fancy-button.component.html',
  styleUrls: ['./fancy-button.component.scss'],
})
export class FancyButtonComponent {
  @Input() text!: string;
  @Input() color!: string;
  @Output() click = new EventEmitter();

  constructor() {}

  onClick() {
    this.click.emit();
  }
}
