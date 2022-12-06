import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable()
export class CommonService {

  constructor() { }

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }
}
