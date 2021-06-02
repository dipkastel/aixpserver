import { Component, OnInit } from '@angular/core';
import {Product} from '../../../model/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-datasetdetail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {
  productId: string;
  currentProduct: Product;

  constructor(private route: ActivatedRoute) {
    this.currentProduct = JSON.parse(localStorage.getItem('currentProduct'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.productId = params.get('id');
      }
    });
  }

}
