import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string) {
    return this.http.post(
      environment.baseUrl + '/auth/login?useCookies=true',
      JSON.stringify({email: username, password}),
      {
        headers: {
          "Content-Type": "application/json",
        }
      })
  }

  register(name: string, email: string, password: string) {
    return this.http.post(
      environment.baseUrl + '/auth/register',
      JSON.stringify({email, password}),
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
  }
}
