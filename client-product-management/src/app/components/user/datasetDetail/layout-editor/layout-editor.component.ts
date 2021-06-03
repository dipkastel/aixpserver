import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataImage} from '../../../../model/dataImage';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {ClickPoint} from '../../../../model/ClickPoint';
import {PolyData} from '../../../../model/polydata';
import {Category} from '../../../../model/Category';
import {DatasetService} from '../../../../services/dataset.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.css']
})
export class LayoutEditorComponent implements OnInit {
  @ViewChild('ImageLayoutCanvas') ImageLayoutCanvas: ElementRef;
  @Input()  imageData: DataImage;
  @Output() LayoutDataChanged: EventEmitter<Array<PolyData>> = new EventEmitter();
  objs: MatTableDataSource<PolyData> = new MatTableDataSource();
  obj= new Array();
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  Sourceimg: HTMLImageElement;
  ratio:number;
  obs: Observable<any>;
  private objtype: string;
  addCategoryMode = false;
  drag:ClickPoint;
  categoriesObs:Observable<any>;
  categoriesSource:Category[];
  categories:  MatTableDataSource<Category> = new MatTableDataSource();
  selectControl=new FormControl();
  SelectedSuperCatToAdd: any;
  SelectedCat: any;

  constructor(public modalService: NgbModal,private datasetService: DatasetService ) { }

  ngOnInit(): void {
    this.obs = this.objs.connect();
    this.categoriesObs = this.categories.connect();
    this.img = new Image()
    this.img.src = this.imageData.imageUrl;
    this.Sourceimg = this.img;
    this.getAllcategories();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.ctx = this.ImageLayoutCanvas.nativeElement.getContext('2d');
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.img.onload =function() {
      that.draw()
    };
  }

  draw(modal?,end?) {
    this.drawImage()
    this.drawLines(modal,end);
  }
  drawImage() {
    this.ratio = this.img.width/this.img.height;
    this.img.width=600;
    this.img.height = 600/this.ratio;
    this.ImageLayoutCanvas.nativeElement.height = 600/this.ratio;
    this.ctx.drawImage(this.img, 0, 0,this.img.width,this.img.height);
  }
  drawLines(modal,end){
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'white';
    this.ctx.lineCap = 'square';
    this.ctx.beginPath();

    for(let i=0; i<this.obj.length; i++){
      if(i===0){
        this.ctx.moveTo(this.obj[i].x,this.obj[i].y);
        if(!end) this.point(this.obj[i].x,this.obj[i].y);
      } else {
        this.ctx.lineTo(this.obj[i].x,this.obj[i].y);
        if(!end) this.point(this.obj[i].x,this.obj[i].y);
      }
      this.ctx.stroke();
    }
      this.objs.data.forEach(item=>{

        this.ctx.beginPath();
        for(let i=0; i<item.points.length; i++) {
          if (i === 0) {
            this.ctx.moveTo(item.points[i].x, item.points[i].y);
          } else {
            this.ctx.lineTo(item.points[i].x, item.points[i].y);
          }
        }
        this.ctx.lineTo(item.points[0].x,item.points[0].y);
        this.ctx.closePath();
        this.ctx.fillStyle = item.fillColor;
        this.ctx.fill();
        this.ctx.strokeStyle = item.strokColor;
      },this);
    this.ctx.stroke();
    if(end){
      this.objtype = 'polygon';
      this.openModalAddlayer(modal);
    }
  }
  point(x, y){
    this.ctx.fillStyle='white';
    this.ctx.strokeStyle = 'white';
    this.ctx.fillRect(x-2,y-2,4,4);
    this.ctx.moveTo(x,y);
  }
  undo() {
    this.obj.pop();
    if(this.obj.length===0)
    {
      this.obj = this.objs.data[this.objs.data.length-1].points;
      this.objs.data.pop();
      this.LayoutDataChanged.emit(this.objs.data);
    }
    this.draw();
  }

  erase() {
    this.obj = new Array();
    this.objs.data =new Array();
    this.draw();
    this.LayoutDataChanged.emit(this.objs.data);
  }
  clickOnCanvas($event,ModalAddLayer?,end?) {
    this.obj.push(new ClickPoint($event.offsetX,$event.offsetY));
    this.draw(ModalAddLayer,end);
  }

  DragOnCanvas($event,modal) {
    if(this.obj.length===1&&Math.abs(this.obj[0].x-$event.offsetX)>10&&Math.abs(this.obj[0].y-$event.offsetY)>10){
      this.obj.push(new ClickPoint(this.obj[0].x,$event.offsetY));
      this.obj.push(new ClickPoint($event.offsetX,$event.offsetY));
      this.obj.push(new ClickPoint($event.offsetX,this.obj[0].y));
      this.objtype = 'box';
      this.openModalAddlayer(modal);
    }
  }
  addNewLayer(value) {
    const selectedCategory = this.categoriesSource.filter(p=>p.id===this.SelectedCat)[0];
    this.objs.data.push(new PolyData(this.obj,selectedCategory,this.objtype));
    this.obj = new Array();
    this.draw();
    this.drag = new ClickPoint(0,0);
    this.LayoutDataChanged.emit(this.objs.data);
  }

  mouseOver(polyItem:PolyData) {

    this.ctx.beginPath();
    this.ctx.moveTo(polyItem.points[0].x, polyItem.points[0].y);
    polyItem.points.forEach(item=>{
          this.ctx.lineTo(item.x, item.y);
    },this);
    this.ctx.lineTo(polyItem.points[0].x,polyItem.points[0].y);
    this.ctx.closePath();
    this.ctx.fillStyle = polyItem.strokColor;
    this.ctx.fill();
  }

  mouseLeave() {
    this.draw()
  }

  onMouseMove($event) {
    if($event.buttons)
    {
      if(this.drag.x===0&&this.drag.y===0){
        this.drag = new ClickPoint($event.offsetX,$event.offsetY);
      }
      this.draw();
      this.ctx.beginPath();
      this.ctx.moveTo(this.drag.x,this.drag.y);
      this.ctx.lineTo(this.drag.x,$event.offsetY);
      this.ctx.lineTo($event.offsetX,$event.offsetY);
      this.ctx.lineTo($event.offsetX,this.drag.y);
      this.ctx.lineTo(this.drag.x,this.drag.y);
      this.ctx.stroke()
    }else{
      this.draw();
      this.ctx.beginPath();
      this.drag = new ClickPoint(0,0);
      if(this.obj.length>0){
        this.ctx.moveTo(this.obj[this.obj.length-1].x,this.obj[this.obj.length-1].y);
        this.ctx.lineTo($event.offsetX,$event.offsetY);
        this.ctx.stroke()
      }
    }
  }



  private getAllcategories() {
    this.datasetService.getAllCategories().subscribe(
      data=>{
        this.categoriesSource =data;
        // tslint:disable-next-line:prefer-const
        let finalList = [];
        // tslint:disable-next-line:only-arrow-functions
        data.forEach(function(item) {
          if(!item.supercategoryId){
            // tslint:disable-next-line:prefer-const
            let listitem = {
              parent:item,
              childs:data.filter(o=>o.supercategoryId===item.id)
            }
            finalList.push(listitem);
          }
        });
        this.categories.data = finalList;
        },
      error => {
        console.log(error);
      }
    )
  }


  addCategory(addCategoryForm) {
    let newCategory = new Category();
    newCategory.name = addCategoryForm.categoryNameToAdd.value;
    newCategory.supercategoryId = this.SelectedSuperCatToAdd;
    this.datasetService.addCategory(newCategory).subscribe(
      data=>{
        this.addCategoryMode = false;
        this.SelectedSuperCatToAdd=null;
        this.getAllcategories();
        this.SelectedCat = data.id;
      });
    return;
  }

  private openModalAddlayer(modal) {

    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      result => {
        if(result!=='success'){
          this.drag = new ClickPoint(0,0);
          this.obj = new Array();
        }
      },
      reason => {
        if(reason!=='success'){
          this.drag = new ClickPoint(0,0);
          this.obj = new Array();
        }
      });
  }
}
