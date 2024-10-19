import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {ItemsComponent} from './components/items/items.component';
import {LayoutComponent} from './components/layout/layout.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ItemDetailComponent} from './components/items/item-detail/item-detail.component';

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
        path: 'items/:id',
        component: ItemDetailComponent,
        title: 'Item',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings',
      },
    ]
  },
];
