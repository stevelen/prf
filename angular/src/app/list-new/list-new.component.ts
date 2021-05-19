import { Component, OnInit } from '@angular/core';
import { WebshopService } from '../utils/webshop.service';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.css']
})
export class ListNewComponent implements OnInit {

  id: number;
  name: string;
  price: number;
  qunatity: number;

  constructor(private webshopService: WebshopService) { 
    this.id = 0;
    this.name = "";
    this.price = 0;
    this.qunatity = 0;
  }

  listNewItem() {
    this.webshopService.listNewItem(this.id, this.name, this.price, this.qunatity).subscribe(msg => {
      console.log(msg);
      alert("New item listed successfully!");
    }, error => {
      console.log(error);
      alert(error.error);
    })
  }

  ngOnInit(): void {
  }

}
