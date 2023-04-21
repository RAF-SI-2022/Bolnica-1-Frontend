import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  formData: any = {};
  lbp: string = '';
  constructor() { }
}
