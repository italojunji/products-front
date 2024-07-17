import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../services/product.service';

//Deprecated
const TABLE_DATA_MOCK: Product[] = [{
  id: 1,
  name: 'Lettuce',
  description: 'Description',
  price: 1.99,
  category: {
    id: 1,
    name: 'Vegetables',
    parent: undefined
  },
  available: true,
}
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  displayColumns = ["id","name", "description", "price", "category", "available", "actions"];
  dataSource = new MatTableDataSource(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.productService.getProducts().subscribe((data:Product[]) => {
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
    })  
  }

}
