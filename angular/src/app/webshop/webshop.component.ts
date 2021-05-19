import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../utils/webshop.service';
import { TransactionService } from '../utils/transaction.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-webshop',
  templateUrl: './webshop.component.html',
  styleUrls: ['./webshop.component.css']
})

export class WebshopComponent implements OnInit {

  ids: Array<any>;
  items: Array<any>;
  prices: Array<any>;
  quantities: Array<any>;

  
  constructor(private webshopService: WebshopService, private transactionService: TransactionService, private router : Router) {
    this.ids = [];
    this.items = [];
    this.prices = [];
    this.quantities = [];
   }

  listProducts(): void{
    this.webshopService.listItems().subscribe((stockData:any) =>{
      this.ids = stockData.map((item: {}) => Object.values(item)[1]);
      this.items = stockData.map((item: {}) => Object.values(item)[2]);
      this.prices = stockData.map((item: {}) => Object.values(item)[3]);
      this.quantities = stockData.map((item: {}) => Object.values(item)[4]);
    }, error => {
      console.log(error);
    })
  }

  purchase(itemName: string, id: number, price: number){
      this.webshopService.purchaseItem(itemName).subscribe(msg =>{
        console.log(msg);
        this.listProducts()
        alert("Successful purchase!");
      }, error => {
        console.log(error);
        alert(error);
      });
      const date = new Date();
      const dateString = date.toISOString();
      this.transactionService.saveTransactions(id, dateString, price).subscribe(msg =>{
        console.log(msg);
      }, error => {
        console.log(error);
        alert(error.error);
      });
  }

  ngOnInit(): void {
    this.listProducts();
  }

}
