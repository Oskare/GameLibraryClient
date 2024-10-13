import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ItemsComponent} from './items/items.component';
import {LayoutComponent} from './layout/layout.component';
import {SettingsComponent} from './settings/settings.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'items',
        component: ItemsComponent,
        title: 'Items',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings',
      },
    ]
  },
];
