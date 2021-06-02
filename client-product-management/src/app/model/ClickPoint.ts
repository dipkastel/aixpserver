import {Point} from '@angular/cdk/drag-drop';

export class ClickPoint implements Point{
  x: number;
  y: number;
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
