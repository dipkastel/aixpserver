export class DataAnnotation {
  id:number;
  // tslint:disable-next-line:variable-name
  category_id: number;
  // tslint:disable-next-line:variable-name
  is_crowd:boolean;
  segmentation:string;
  // tslint:disable-next-line:variable-name
  image_id:number;
  area:string;
  constructor(id,imageId,segmentation) {
    this.id = id;
    this.image_id = imageId;
    this.segmentation = segmentation.toString();
  }
}
