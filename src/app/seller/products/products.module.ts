import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page/products-page.component';
import { UtilityModule } from '../../usablemodules/utility.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsRoutingModule } from './products-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ProductsPageComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ViewProductComponent,
  ],
  imports: [
    CommonModule,
    NgxEditorModule,
    UtilityModule,
    NgxPaginationModule,
    RouterModule,
    ProductsRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    NgxDropzoneModule
  ]
})
export class ProductsModule { }
