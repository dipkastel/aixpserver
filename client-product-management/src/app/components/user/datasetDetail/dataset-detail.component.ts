import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Dataset} from '../../../model/dataset';

@Component({
  selector: 'app-datasetdetail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {
  productId: string;
  dataset: Dataset;
  active;
  disabled = true;

  constructor(private route: ActivatedRoute) {
    this.dataset = JSON.parse(localStorage.getItem('currentProduct'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.productId = params.get('id');
      }
    });
  }


  onNavChange($event: NgbNavChangeEvent<any>) {
    return;
  }
}
