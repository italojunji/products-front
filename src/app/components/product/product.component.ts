import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  private products: Product[] = [];
  public dataSource = new MatTableDataSource(this.products);

  constructor(

    ) {}

  ngOnInit(): void {

  }

}
