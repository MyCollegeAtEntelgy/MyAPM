import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";    // No requierie registro, pues es parte del modulo Router

import { IProduct } from './product';

@Component({
  // selector: 'pm-product-detail',                 // No se asigna el selector.
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string ='Product Detail';
  product: IProduct

  constructor(private route: ActivatedRoute,
              private router: Router
    ) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.pageTitle +=`:${id}`;
    this.product = {
      "productId": 5,
      "productName": "Hammer",
      "productCode": "TBX-0048",
      "releaseDate": "May 21, 2016",
      "description": "Curved claw steel hammer",
      "price": 8.9,
      "starRating": 4.8,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    }
  }


  onBack(): void {
    this.router.navigate(['/products'])
  }

}
