import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ItemPage} from '../types';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsUrl: string = environment.baseUrl + '/items/';

  constructor(private http: HttpClient) {
  }

  // TODO: Search, pagination
  getItems(): Observable<ItemPage> {
    return this.http.get<ItemPage>(this.itemsUrl);
  }
}
