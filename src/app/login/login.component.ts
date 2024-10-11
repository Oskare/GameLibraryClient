import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {ButtonComponent} from '../../ui/button/button.component';
import {Library, LucideAngularModule} from 'lucide-angular';
import {LabelComponent} from '../../ui/label/label.component';
import {InputComponent} from '../../ui/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    ButtonComponent,
    LucideAngularModule,
    LabelComponent,
    InputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage: string = "";
  protected readonly console = console;
  protected readonly Library = Library;
}
