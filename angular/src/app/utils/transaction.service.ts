import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getTransactions(){
    return this.http.get(environment.springUrl + '/transactions');
  }

  saveTransactions(item_id: number, transaction_date: string, price: number){
    return this.http.post(environment.springUrl + '/transaction', {item_id: item_id, transaction_date: transaction_date, price:price},
    {responseType: 'text'});
  }
}
