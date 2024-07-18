import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  formGroup!: FormGroup;
  categoriesList!: Category[];
  product!: Product;
  categorySelected: Category = {
    id: 1,
    name: 'asd'
  };

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.createFormGroup();
    const formValues = this.formGroup.value;
    const id = parseInt(this.route.snapshot.paramMap.get("id") || '');
    this.productService.getProductById(id).subscribe(data => {
      this.product = data;
      this.loadData();
    });
         
    this.categoryService.getCategories().subscribe(data => this.categoriesList = data);
   
  }

  private createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      idControl: new FormControl('')
      ,
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
      availableControl: new FormControl('',
      [])
    });

  }

  private loadData() {
    this.formGroup.controls['idControl'].setValue(this.product.id);
    this.formGroup.controls['nameControl'].setValue(this.product.name);
    this.formGroup.controls['descriptionControl'].setValue(this.product.description);
    this.formGroup.controls['priceControl'].setValue(this.product.price);
    this.formGroup.controls['categoryControl'].setValue(this.product.category?.id);
    this.formGroup.controls['availableControl'].setValue(this.product.available);     
  }

  validateNumericWithTwoDecimals(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const numericRegex = /^\d+\.\d{2}$/;
    if (!numericRegex.test(value)) {
        return { invalidNumeric: true };
    }
    return null;
  }


  editProduct() {
    const formValues = this.formGroup.value;

    const newProduct: Product = {
      id: this.product.id,
      name: formValues.nameControl,
      description: formValues.descriptionControl,
      price: formValues.priceControl,
      category:  {id: formValues.categoryControl},
      available: formValues.availableControl
    };

    this.productService.updateProduct(newProduct).subscribe(data => {
      alert("Product edited!");
      this.router.navigate(['product']);
    });
  }
}
