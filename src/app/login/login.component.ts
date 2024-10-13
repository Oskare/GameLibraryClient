import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ButtonComponent} from '../../ui/button/button.component';
import {LucideAngularModule} from 'lucide-angular';
import {LabelComponent} from '../../ui/label/label.component';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
  errorMessage: string = '';

  constructor(private authService: AuthService,
              private router: Router
  ) {
  }

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.authService.signIn(
      this.signInForm.value.username,
      this.signInForm.value.password
    ).subscribe({
      next: async () => {
        await this.router.navigateByUrl("/items");
      },
      error: err => {
        this.errorMessage = 'Could not log in. Please try again later.';
        console.error('error', err);
      }
    })
  }
}
