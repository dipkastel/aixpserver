import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FileManagerService} from '../../../../services/file-manager.service';
import {DataImage} from '../../../../model/dataImage';
import {DatasetService} from '../../../../services/dataset.service';
import {Dataset} from '../../../../model/dataset';
import {MatPaginator} from '@angular/material/paginator';
import {LayoutEditorComponent} from '../layout-editor/layout-editor.component';
import {PolyData} from '../../../../model/polydata';

@Component({
  selector: 'app-dataset-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {
  @ViewChild('mainPagination') paginator: MatPaginator;
  @ViewChild('layoutEditorComponent') layoutEditor:LayoutEditorComponent ;
  imagesList: Array<DataImage>;
  selectedImages: Array<DataImage> = [];
  dataSource: MatTableDataSource<DataImage> = new MatTableDataSource();
  obs: Observable<any>;
  imageToDelete: any;
  modalUploadImageErrorMessage: string;
  modalImageErrorMessage: string;
  newImage: string;
  selectMode = false;
  BlurMode: boolean;
  HueMode: boolean;
  NoiseMode: boolean;
  clickedImage: DataImage;
  dataTosave:Array<PolyData>;

  @Input()
  dataset: Dataset;

  constructor(private modalService: NgbModal,
              private fileManager: FileManagerService,
              private datasetService:DatasetService,
              private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {
    this.GetUserDatasetImages();
    this.obs = this.dataSource.connect();

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  private GetUserDatasetImages() {

    this.datasetService.GetDatasetImages(this.dataset.id).subscribe(data => {
      this.imagesList = data;
      this.dataSource.data = data;

    },
      error => {
      this.imagesList = null;
      });
  }

  openPreprocessModal() {
    return;
  }

  openModal(DatasetCreateModal,modalsize?,item?) {
    this.modalService.open(DatasetCreateModal, {ariaLabelledBy: 'modal-basic-title',size: modalsize});
  }


  deleteImage(imageToDelete: any) {
    return;
  }


  createImage(value: any) {
    var image = new DataImage();
    this.modalImageErrorMessage = '';
    if (value.name) {
      image.name = value.name;
    } else {
      this.modalImageErrorMessage += ' *name field is empty' + '\n';
    }
    if (this.newImage) {
      image.imageUrl = this.newImage;
    } else {
      this.modalImageErrorMessage += ' *image field is empty' + '\n';
    }
    image.dataSetDetailId = this.dataset.id;
    this.modalImageErrorMessage.trim();
    if (this.modalImageErrorMessage) { return; }
    this.datasetService.createImageForDataset(image).subscribe(data => {
        this.GetUserDatasetImages();
        this.modalService.dismissAll()
      },
      error => {
        this.modalImageErrorMessage += error.message;
        console.log(error);
      });
  }

  uploadFile(evt) {
    let payload = new FormData();
    payload.set('file', evt[0]);
    this.fileManager.uploadImage(payload,'preparation').subscribe(
      data => {
        this.newImage = data.fileDownloadUri;
      },
      error => {
        console.log(error);
        this.modalImageErrorMessage = error.message;
      }
    );
  }

  clearImage() {
    this.newImage =null;
  }

  itemSelect(event, item: DataImage) {
    if(event.target.checked)
    this.selectedImages.push(item);
    else{
      // tslint:disable-next-line:only-arrow-functions
      this.selectedImages = this.selectedImages.filter( function (ele){
        return ele !== item;
      });
    }
  }

  searchForImage($event, search: HTMLInputElement) {
    if($event.target.value.length>2){
      this.dataSource.data = this.imagesList.filter(o=>o.name.includes($event.target.value));

    }else{
      this.dataSource.data = this.imagesList ;
    }
  }

  openModalLayout(ModalName, modalSize, item) {
    this.modalService.open(ModalName, {ariaLabelledBy: 'modal-basic-title', size: modalSize});
    this.clickedImage = item;
  }

  addOrEditLayout(value: any) {
    console.log(this.dataTosave);
  }

  chagedData($event: Array<PolyData>) {
    this.dataTosave = $event;
  }
}
