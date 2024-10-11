import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { LucideAngularModule, LogIn, Library, UserPlus } from 'lucide-angular';
import {ButtonComponent} from '../../ui/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    ButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly LogIn = LogIn;
  readonly Library = Library;
  readonly UserPlus = UserPlus;

  copyrightDate: number = new Date().getFullYear();
  protected readonly console = console;
}
