import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signInUrl: string = environment.baseUrl + '/auth/login?useCookies=true';

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string) {
    return this.http.post(
      this.signInUrl,
      JSON.stringify({email: username, password}),
      {
        headers: {
          "Content-Type": "application/json",
        }
      })
  }
}
