import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [
    NgClass,
    LucideAngularModule
  ],
  standalone: true
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() color: string = 'bg-[#0f172ae6] hover:bg-[#0f172ae6]/90';
  @Input() size: string = 'py-2 px-8 h-10';     // Default size
  @Input() disabled: boolean = false;      // Disabled state
  @Input() type: string = 'button';      // Type

  @Output() onClick: EventEmitter<void> = new EventEmitter();

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
