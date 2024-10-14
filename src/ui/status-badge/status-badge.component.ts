import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  @Input() status: number | undefined;

  get statusLabel() {
    switch (this.status) {
      case undefined: return "";
      case 0: return "Backlog";
      case 1: return "In Progress";
      case 2: return "Finished";
    }
    return "";
  }

  get statusClass() {
    switch (this.status) {
      case undefined: return "";
      case 0: return "bg-secondary text-secondary-foreground";
      case 1: return "bg-blue-500 text-white";
      case 2: return "bg-green-500 text-white";
    }
    return "";
  }
}
