import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl : './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    private _productService;

    _listFilter: string;
    get listFilter() : string {
      return this._listFilter;
    }
    set listFilter(v : string) {
      this._listFilter = v;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
      this._productService = productService;
      this.listFilter = 'cart';
    }

    ngOnInit(): void {
      this.productService.getProducts().subscribe(
        products => {
          this.products = products ;
          this.filteredProducts = this.products;
        },
        error => this.errorMessage = <any>error
      );
    }

    onRatingClicked(message: string): void{
      this.pageTitle ='Product List: ' + message;
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    performFilter(filterBy: string) : IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter( (p: IProduct) => 
                p.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 );
    }

}