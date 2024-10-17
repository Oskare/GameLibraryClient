import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ItemPage, ItemUpdateModel} from '../models/item';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsUrl: string = environment.baseUrl + '/items/';

  constructor(private http: HttpClient) {
  }

  getItems(search: string | null, page: number | null): Observable<ItemPage> {
    let params = [];
    if (search) params.push(['search', search]);
    if (page) params.push(['page', page.toString()]);

    const newParams = new URLSearchParams(params);

    return this.http.get<ItemPage>(this.itemsUrl + "?" + newParams.toString());
  }

  updateItem(id: number, itemUpdateModel: ItemUpdateModel) {
    return this.http.put(this.itemsUrl + id, itemUpdateModel);
  }

  deleteItem(id: number) {
    return this.http.delete<ItemPage>(this.itemsUrl + id);
  }
}
