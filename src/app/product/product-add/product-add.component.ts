import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductComponent } from '../product.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  formGroup!: FormGroup;
  categoriesList!: Category[];

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ){}
  
  ngOnInit(): void {
   this.createFormGroup();
   this.categoryService.getCategories().subscribe(data => this.categoriesList = data);
  }

  private createFormGroup(): void {
    this.formGroup = new FormGroup({
      nameControl: new FormControl('',
      [Validators.required, Validators.minLength(1), Validators.maxLength(20)])
      ,
      descriptionControl: new FormControl('', 
      [Validators.maxLength(200)])
      ,
      priceControl: new FormControl('', 
      [Validators.required, this.validateNumericWithTwoDecimals])
      ,
      categoryControl: new FormControl('', 
      [Validators.required])
      ,
      availableControl: new FormControl(false, 
      [])
    });

  }

  validateNumericWithTwoDecimals(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const numericRegex = /^\d+\.\d{2}$/;
    if (!numericRegex.test(value)) {
        return { invalidNumeric: true };
    }
    return null;
  }


  saveProduct() {
    const formValues = this.formGroup.value;

    const newProduct: Product = {
      name: formValues.nameControl,
      description: formValues.descriptionControl,
      price: formValues.priceControl,
      category:  formValues.categoryControl,
      available: formValues.availableControl
    };

    this.productService.createProduct(newProduct).subscribe(data => {
      alert("New product saved!");
      this.router.navigate(['product']);
    });
  }

}
