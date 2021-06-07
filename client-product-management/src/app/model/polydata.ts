import {ClickPoint} from './ClickPoint'
import {Category} from './Category';

export class PolyData {
  points:Array<ClickPoint>;
  category:Category;
  strokColor:string;
  fillColor:string;
  imageId:number;
  type:string;
  annotationId:number;
  constructor(points,category,type,imagid,annotationId) {
    this.type = type;
    this.points = points;
    this.category = category;
    this.imageId = imagid;
    this.annotationId = annotationId;
    this.strokColor =  'rgba('+Math.random() *255+', '+Math.random() *255+', '+Math.random() *255+', 1)';
    this.fillColor =  'rgba('+Math.random() *255+', '+Math.random() *255+', '+Math.random() *255+', 0.4)';
  }
}
