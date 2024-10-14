import {Component, HostListener} from '@angular/core';
import {NgIf} from '@angular/common';
import {ButtonComponent} from '../../../ui/button/button.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent
  ],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {
  dropdownOpen = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  // Close the dropdown if clicked outside
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('.profile-container')) {
      this.closeDropdown();
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: async () => {
        await this.router.navigateByUrl("/home");
      },
      error: (error) => console.log(error),
    });
  }
}
