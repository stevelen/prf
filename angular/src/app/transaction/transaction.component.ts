import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../utils/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactionIds: Array<any>;
  productIds: Array<any>;
  dates: Array<any>;
  productPrices: Array<any>;

  constructor(private transactionService: TransactionService) { 
    this.transactionIds = [];
    this.productIds = [];
    this.dates = [];
    this.productPrices = [];
  }

  listTransactions(): void{
    this.transactionService.getTransactions().subscribe((data:any) =>{
      this.transactionIds = data.map((item: {}) => Object.values(item)[0]);
      this.productIds = data.map((item: {}) => Object.values(item)[1]);
      this.dates = data.map((item: {}) => Object.values(item)[2]);
      this.productPrices = data.map((item: {}) => Object.values(item)[3]);
    }, error => {
      console.log(error);
      alert(error.error);
    })
  }

  ngOnInit(): void {
    this.listTransactions();
  }

}
