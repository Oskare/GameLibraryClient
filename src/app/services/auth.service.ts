import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(
      environment.baseUrl + '/auth/login?useCookies=true',
      JSON.stringify({email: username, password}),
      {
        headers: {
          "Content-Type": "application/json",
        }
      })
  }

  register(name: string, email: string, password: string): Observable<any> {
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

  logout(): Observable<any> {
    return this.http.post(
      environment.baseUrl + '/auth/logout',
      {}
    );
  }
}
