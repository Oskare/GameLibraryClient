import { Component } from '@angular/core';
import {ButtonComponent} from '../../ui/button/button.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LabelComponent} from '../../ui/label/label.component';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    LabelComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string = '';
  accountCreated: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService,
              private router: Router
  ) {
  }

  register() {
    this.authService.register(
      this.registerForm.value.name,
      this.registerForm.value.username,
      this.registerForm.value.password
    ).subscribe({
      next: async () => {
        this.accountCreated = true;
      },
      error: err => {
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('error', err);
      }
    })
  }
}
