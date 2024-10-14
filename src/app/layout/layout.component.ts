import {Component, HostListener} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ProfileDropdownComponent} from './profile-dropdown/profile-dropdown.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    ProfileDropdownComponent,
    NgClass
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  mobileMenuOpen: boolean = false;

  setMobileMenuOpen(open: boolean): void {
    this.mobileMenuOpen = open;
  }

  menuClick(): void {
    this.mobileMenuOpen = false;
  }

  // Close the dropdown if clicked outside
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('#mobile-menu') && !event.target.closest('#mobile-menu-btn')) {
      this.mobileMenuOpen = false;
    }
  }
}
