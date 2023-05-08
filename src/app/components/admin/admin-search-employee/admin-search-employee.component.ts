import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../../services/user-service/user.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Zaposleni, Page, DeparmentShort, HospitalShort } from "../../../models/models";
import { NgxPaginationModule } from 'ngx-pagination';
import { interval } from 'rxjs';

@Component({
    selector: 'app-admin-search-employee',
    templateUrl: './admin-search-employee.component.html',
    styleUrls: ['./admin-search-employee.component.css']
})

export class AdminSearchEmployeeComponent implements OnInit {

    @NgModule({
        imports: [NgxPaginationModule]
    })

    // Pagination properties
    PAGE_SIZE: number = 5;

    page: number = 0;
    total: number = 0;

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


    constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
        this.routerUpper = router
        this.searchForm = this.formBuilder.group({
            ime: '',
            prezime: '',
            selektovanaOrdinacija: '',
            selektovanaBolnica: '',
            deleted: false
        });
    }

    ngOnInit(): void {
      //interval(5000).subscribe(() => {
        this.getHospitalsDepartmentsUsers();
      //});
    }

    getHospitalsDepartmentsUsers(){
              // Populate departments
              this.userService.getDepartments().subscribe((response) => {
                this.departments = response
            })

            // Populate hospitals
            this.userService.getHospitals().subscribe((response) => {
                this.hospitals = response
            })

            // Get all users
            this.userService.getAllUsers(this.ime, this.prezime, this.selektovanaOrdinacija, this.selektovanaBolnica, this.deleted, this.page, this.PAGE_SIZE).subscribe((response) => {
                this.userPage = response;
                this.userList = this.userPage.content
                this.total = this.userPage.totalElements
            })
    }
    search(): void {
        this.getUserList();
    }

    goToEditPage(zaposleni: Zaposleni): void {
        this.router.navigate(['/admin-edit-employee/', zaposleni.lbz]);
    }

    deleteUser(LBZ: string): void {
        if (confirm("Da li ste sigurni da zelite da obrisite zaposlenog " + LBZ + "?")) {
            this.userService.deleteUser(
                LBZ
            ).subscribe(response => {
                this.getUserList()
            }
            )
        }
    }

    getUserList(): void {
        if (this.selektovanaOrdinacija == "Odaberite odeljenje")
            this.selektovanaOrdinacija = ""
        else{
          //this.selektovanaOrdinacija = this.departments[Number(this.selektovanaOrdinacija)-1].name
        }
        if (this.selektovanaBolnica == "Odaberite bolnicu")
            this.selektovanaBolnica = ""
        if (this.page == 0)
            this.page = 1;
        this.selektovanaBolnica = ""; // imamo samo 1
        console.log("bbb " + this.selektovanaOrdinacija)
        this.userService.getAllUsers(this.ime, this.prezime, this.selektovanaOrdinacija, this.selektovanaBolnica, this.deleted, this.page - 1, this.PAGE_SIZE).subscribe((response) => {
            this.userPage = response;
            this.userList = this.userPage.content;
            this.total = this.userPage.totalElements
        });
    }

    onTableDataChange(event: any): void {
        this.page = event;
        this.getUserList();
    }

    sortState = {
        column: '',
        direction: '',
        clicks: 0
      };
      sortOrder: { [key: string]: number } = {};

      sortColumn(column: string): void {
        if (this.sortState.column === column) {
          this.sortState.clicks++;
          if (this.sortState.clicks === 3) {
            this.sortState.direction = '';
            this.sortState.clicks = 0;
          } else {
            this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
          }
        } else {
          this.sortState.column = column;
          this.sortState.direction = 'asc';
          this.sortState.clicks = 1;
        }
        this.sortOrder[column] = this.sortOrder[column] || 0;
        this.sortOrder[column] = (this.sortOrder[column] + 1) % 3;

        if (this.sortOrder[column] === 0) {

          this.getUserList();
        } else {
            console.log("SORTIRAJ")
          this.userList.sort((a: Zaposleni, b: Zaposleni) => {
            const factor = this.sortOrder[column] === 1 ? 1 : -1;
            const aValue = a[column as keyof Zaposleni];
            const bValue = b[column as keyof Zaposleni];
            console.log("POREDIM: " + a.id + " i " + b.id)
            if (aValue instanceof Date && bValue instanceof Date) {
              return (aValue.getTime() - bValue.getTime()) * factor;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return aValue.localeCompare(bValue) * factor;
            }

            if (aValue < bValue) {
              return -1 * factor;
            }
            if (aValue > bValue) {
              return 1 * factor;
            }
            return 0;
          });
          this.userList.forEach(e => {
            console.log(e);
          })
        }
      }

}
