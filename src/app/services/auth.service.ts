import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signInUrl: string = environment.baseUrl + '/auth/login?useCookies=true';

  async signIn(username: string, password: string) {

    await fetch(this.signInUrl, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({email: username, password}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
