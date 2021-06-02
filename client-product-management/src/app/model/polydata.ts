import {ClickPoint} from './ClickPoint'

export class PolyData {
  points:Array<ClickPoint>;
  lable:string;
  strokColor:string;
  fillColor:string;
  type:string;
  constructor(points,lable,type) {
    this.type = type;
    this.points = points;
    this.lable = lable;
    this.strokColor =  'rgba('+Math.random() *255+', '+Math.random() *255+', '+Math.random() *255+', 1)';
    this.fillColor =  'rgba('+Math.random() *255+', '+Math.random() *255+', '+Math.random() *255+', 0.4)';
  }
}
