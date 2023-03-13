import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { DeparmentShort } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

  }

}
