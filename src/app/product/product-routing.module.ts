import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';

const routes: Routes = [
  { path: '', component: ProductComponent},
  { path: 'edit/:id', component: ProductEditComponent},
  { path: 'delete/:id', component: ProductDeleteComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
