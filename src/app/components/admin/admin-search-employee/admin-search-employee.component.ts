import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../../services/user-service/user.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Zaposleni, Page, DeparmentShort, HospitalShort } from "../../../models/models";
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

  deleted: boolean = false;
  searchForm: FormGroup
  routerUpper: Router
  public selektovanaOrdinacija: string = '';
  public selektovanaBolnica: string = '';
  public ime: string = '';
  public prezime: string = '';
  userPage: Page<Zaposleni> = new Page<Zaposleni>();
  userList: Zaposleni[] = []
  departments: DeparmentShort[] = []
  hospitals: HospitalShort[] = []
  page = 0;
  pageSize = 5;
  total = 0;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.routerUpper = router
    this.searchForm = this.formBuilder.group({
      ime: '',
      prezime: '',
      selektovanaOrdinacija: '',
      selektovanaBolnica: '',
      deleted: false

    })
  }

  search() {
    /**
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
    }

    form.classList.add('was-validated');
    */
    console.log("IME " + this.ime + "PREZIME " + this.prezime + "BOLNICA " + this.selektovanaBolnica + "ORDINACIJA " + this.selektovanaOrdinacija)

    this.getUserList();
  }

  updateUser(zaposleni: Zaposleni) {
    //this.userService.setZaposleni(zaposleni)
    this.router.navigate(['/admin-edit-employee/', zaposleni.lbz]);
  }

  deleteUser(LBZ: string) {
    if (confirm("Da li ste sigurni da zelite da obrisite zaposlenog " + LBZ + "?")) {
      this.userService.deleteUser(
        LBZ
      ).subscribe(
        response => {
          this.getUserList()
        }
      )
    }

  }

  ngOnInit(): void {
    /// popuni odeljenja
    this.userService.getDepartments().subscribe((response) => {
      this.departments = response
    })

    /// popuni bolnice
    this.userService.getHospitals().subscribe((response) => {
      this.hospitals = response
    })

    this.userService.getAllUsers(this.ime, this.prezime, this.selektovanaOrdinacija, this.selektovanaBolnica, this.deleted, this.page, this.pageSize).subscribe((response) => {
      this.userPage = response;
      this.userList = this.userPage.content
     this.total = this.userPage.totalElements

    })
  }

  getUserList(): void {
    if (this.selektovanaOrdinacija == "Odaberite odeljenje")
      this.selektovanaOrdinacija = ""
    if (this.selektovanaBolnica == "Odaberite bolnicu")
      this.selektovanaBolnica = ""
      if(this.page == 0)
      this.page = 1;
    this.userService.getAllUsers(this.ime, this.prezime, this.selektovanaOrdinacija, this.selektovanaBolnica, this.deleted, this.page-1, this.pageSize).subscribe((response) => {
      this.userPage = response;
      this.userList = this.userPage.content;
      this.total = this.userPage.totalElements

    })
  }


  onTableDataChange(event: any): void {
    this.page = event;
    this.getUserList();
  }

}
