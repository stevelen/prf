import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebshopService } from '../utils/webshop.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.css']
})
export class RestockComponent implements OnInit {

  ids: Array<any>;
  items: Array<any>;
  prices: Array<any>;
  quantities: Array<any>;
  quantity: number;
  price: number;


  constructor(private webshopService: WebshopService, private router: Router, private httpClient: HttpClient) {
    this.ids = [];
    this.items = [];
    this.prices = [];
    this.quantities = [];
    this.quantity = 0;
    this.price = 0;
  }

  restock(itemName: string, quantity: number) {
    this.webshopService.restockItem(itemName, quantity).subscribe(msg => {
      this.listProducts()
      alert("Successful restock!");
    }, error => {
      console.log(error);
      alert(error.error);
    })
  }
  reprice(itemName: string, price: number) {
    this.webshopService.rePriceItem(itemName, price).subscribe(msg => {
      this.listProducts()
      alert("Price adjusted successfully!");
    }, error => {
      console.log(error);
      alert(error.error);
    })
  }

  listProducts(): void {
    this.webshopService.listItems().subscribe((stockData: any) => {
      this.ids = stockData.map((item: {}) => Object.values(item)[1]);
      this.items = stockData.map((item: {}) => Object.values(item)[2]);
      this.prices = stockData.map((item: {}) => Object.values(item)[3]);
      this.quantities = stockData.map((item: {}) => Object.values(item)[4]);
    }, error => {
      console.log(error);
      alert(error.error);
    })
  }

  ngOnInit(): void {
    this.listProducts();
  }

}
