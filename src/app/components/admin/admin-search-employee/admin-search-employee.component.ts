import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Zaposleni} from "../../../models/models";
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-admin-search-employee',
  templateUrl: './admin-search-employee.component.html',
  styleUrls: ['./admin-search-employee.component.css']
})

export class AdminSearchEmployeeComponent implements OnInit {

  @NgModule({
    imports: [NgxPaginationModule]
  })

  searchForm: FormGroup
  routerUpper: Router
  public selektovanaOrdinacija: string = '';
  public selektovanaBolnica: string = '';
  public ime: string = '';
  public prezime: string = '';
  userList: any
  page = 1;
  pageSize = 10;
  total = 0;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder){
  this.routerUpper = router
  this.searchForm = this.formBuilder.group({
    ime: '',
    prezime: '',
    selektovanaOrdinacija: '',
    selektovanaBolnica: ''

  })
  }

  search(){
    console.log("IME " + this.ime + "PREZIME " + this.prezime + "BOLNICA " + this.selektovanaBolnica + "ORDINACIJA " + this.selektovanaOrdinacija )
    this.userService.searchUsers(
      this.ime,
      this.prezime,
      this.selektovanaBolnica,
      this.selektovanaOrdinacija
    ).subscribe(result => {
      this.userList = result
      this.total = this.userList.length;
      console.log(this.userList)
    })
  }

  updateUser(zaposleni: Zaposleni){
    this.userService.setZaposleni(zaposleni)
    this.router.navigate(['/admin-edit-employee']);
  }

  deleteUser(LBZ: number){
    if(confirm("Da li ste sigurni da zelite da obrisite zaposlenog " + LBZ + "?")) {
      this.userService.deleteUser(
        LBZ
      ).subscribe(
        response =>{
          this.search();
        }
      )}

  }

  ngOnInit(): void {
  }

}
