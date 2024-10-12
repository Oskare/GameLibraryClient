import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ButtonComponent} from '../../ui/button/button.component';
import {LucideAngularModule} from 'lucide-angular';
import {LabelComponent} from '../../ui/label/label.component';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    ButtonComponent,
    LucideAngularModule,
    LabelComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.authService.signIn(
      this.signInForm.value.username,
      this.signInForm.value.password
    );
  }
}
