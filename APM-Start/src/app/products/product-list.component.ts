import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { error } from 'util';

@Component({    
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit
{    
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargine: number = 2;
    showImage: boolean = false;    
    filtertedProducts: IProduct[];
    products: IProduct[];
    errorMessage : string;

    // constructor
    // Angular Injects the product service - built in Depedancy Injection
    constructor(private _productService : ProductService)
    {   
    }
    
    // property with getter and setter
    _listFilter: string;
    get listFilter() : string
    {
        return this._listFilter;
    }
    set listFilter(value : string)
    {
        this._listFilter = value;
        this.filtertedProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
    }
    performFilter(filterString: string): IProduct [] {
        filterString = filterString.toLocaleLowerCase();
        return this.products.filter((product:IProduct) => product.productName.toLocaleLowerCase().indexOf(filterString) !== -1);
    }

    onRatingClicked(message : string) : void 
    {
        this.pageTitle = 'Product List: ' + message;
    }   

    toggleImage() : void
    {
        this.showImage = !this.showImage;       
    }

    ngOnInit() : void
    {             
        this._productService.getProducts()
                .subscribe(products => 
                    {
                        this.products = products;
                        this.filtertedProducts = this.products;
                    },
                    error => this.errorMessage = <any>error);
        
        this._listFilter = '';
    }    
}
