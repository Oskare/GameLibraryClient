import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Item, ItemCreateModel, ItemDetail, ItemPage, ItemUpdateModel, SteamDetail} from '../models/item';
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

  getItem(id: number) {
    return this.http.get<Item>(this.itemsUrl + id);
  }

  createItem(itemCreateModel: ItemCreateModel) {
    return this.http.post(this.itemsUrl, itemCreateModel);
  }

  updateItem(id: number, itemUpdateModel: ItemUpdateModel) {
    return this.http.put(this.itemsUrl + id, itemUpdateModel);
  }

  deleteItem(id: number) {
    return this.http.delete<ItemPage>(this.itemsUrl + id);
  }

  getSteamDetails(id: number) {
    return this.http.get<SteamDetail[]>(this.itemsUrl + id + "/steam-details");
  }

  getItemDetails(itemId: number) {
    return this.http.get<ItemDetail[]>(this.itemsUrl + itemId + "/details");
  }

  createItemDetail(itemId: number, detail: string) {
    return this.http.post(this.itemsUrl + itemId + "/details", detail);
  }

  deleteItemDetail(itemId: number, detailId: number) {
    return this.http.delete(this.itemsUrl + itemId + "/details/" + detailId);
  }
}
