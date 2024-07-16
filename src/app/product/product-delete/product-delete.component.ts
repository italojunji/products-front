import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent {

  itemId!: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.itemId = +params['id']; 
    });
  }

  onConfirm() {
    this.productService.deleteProduct(this.itemId).subscribe(data => 
      {
        alert("Product deleted!");
        this.router.navigate(['product']);
      }
  );
    
  }

  onCancel() {
    this.router.navigate(['product']);
  }
}
