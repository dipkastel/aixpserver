import {ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {DatasetService} from '../../../services/dataset.service';
import {User} from '../../../model/user';
import {Dataset} from '../../../model/dataset';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FileManagerService} from '../../../services/file-manager.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myDiv') modal: ElementRef;
  datasetList: Array<Dataset>;
  dataSource: MatTableDataSource<Dataset> = new MatTableDataSource();
  obs: Observable<any>;
  modalErrorMessage: string;
  newDatasetImage: string;
  currentUser: User;
  closeResult: string;
  deleteToDataset: Dataset;



  constructor( private modalService: NgbModal,
               private datasetService: DatasetService,
               private fileManager: FileManagerService,
               private router: Router,
               private cdr: ChangeDetectorRef) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  uploadFile(evt) {
    let payload = new FormData();
    payload.set('file', evt[0]);
    this.fileManager.uploadImage(payload,'dataset').subscribe(
      data => {
        this.newDatasetImage = data.fileDownloadUri;
      },
      error => {
        console.log(error);
        this.modalErrorMessage = error;
      }
    );
  }
  ngOnInit() {
    this.GetUserDatasets();
    this.obs = this.dataSource.connect();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  GetUserDatasets() {
    this.datasetService.GetUserDatasets().subscribe(data => {
      this.datasetList = data;
      this.dataSource.data = data;

    });
  }


  detail(dataset: Dataset) {
    localStorage.setItem('currentProduct', JSON.stringify(dataset));
    this.router.navigate(['/detail', dataset.id]);
  }

  openModuleCreate() {

  }

  clearImage() {
    this.newDatasetImage = null;
  }

  CreateDatasetSubmit(value: any) {
    var dataset = new Dataset();
    this.modalErrorMessage = '';
    if (value.explanation) {
      dataset.explanation = value.explanation;
    } else {
      this.modalErrorMessage +=  ' *explanation field is empty' + '\n';
    }
    if (value.name) {
      dataset.name = value.name;
    } else {
      this.modalErrorMessage += ' *name field is empty' + '\n';
    }
    if (this.newDatasetImage) {
      dataset.imageUrl = this.newDatasetImage;
    } else {
      this.modalErrorMessage += ' *image field is empty' + '\n';
    }
    this.modalErrorMessage.trim();
    if (this.modalErrorMessage) { return; }
    this.datasetService.createDataset(dataset).subscribe(data => {
      this.GetUserDatasets();
      this.modalService.dismissAll('adding dataset')
    },
      error => {
      console.log(error);
      });
  }

  deleteDataset(item) {
    this.datasetService.deleteDataset(item).subscribe(data => {
        this.GetUserDatasets();
        this.modalService.dismissAll('delete dataset')
      },
      error => {
        console.log(error);
      });
  }
  openDatasetCreateModal(DatasetCreateModal,item?) {

    this.modalService.open(DatasetCreateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.deleteToDataset = item;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
