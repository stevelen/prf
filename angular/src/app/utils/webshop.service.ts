import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebshopService {

  constructor(private http: HttpClient) { }

  listItems(){
    return this.http.get(environment.serverUrl + '/stock');
  }

  purchaseItem(itemName: string){
    return this.http.put(environment.serverUrl + '/purchase', {name: itemName}, 
    {withCredentials: true, responseType: 'text', observe: 'response' as 'response'});
  }

  restockItem(itemName: string, quantity: number){
    return this.http.put(environment.serverUrl + '/stock', {name: itemName, quantity: quantity}, 
    {withCredentials: true, responseType: 'text', observe: 'response' as 'response'});
  }

  rePriceItem(itemName: string, price: number){
    return this.http.put(environment.serverUrl + '/stock', {name: itemName, price: price}, 
    {withCredentials: true, responseType: 'text', observe: 'response' as 'response'});
  }

  listNewItem(id: number, name: string, price: number, quantity: number){
    return this.http.post(environment.serverUrl + '/stock', {id: id, name: name, price: price, quantity:quantity}, 
    {withCredentials: true, responseType: 'text', observe: 'response' as 'response'});
  }
}
