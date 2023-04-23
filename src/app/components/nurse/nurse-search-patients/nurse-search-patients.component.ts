import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PatientService } from "../../../services/patient-service/patient.service";
import { Patient } from "../../../models/patient/Patient";
import { Page, Zaposleni } from "../../../models/models";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user-service/user.service";
import { SnackbarServiceService } from 'src/app/services/snackbar-service.service';

@Component({
    selector: 'app-nurse-search-patients',
    templateUrl: './nurse-search-patients.component.html',
    styleUrls: ['./nurse-search-patients.component.css']
})
export class NurseSearchPatientsComponent implements OnInit {
    deleted = false;
    searchForm: FormGroup;
    name = '';
    surname = '';
    jmbg = '';
    lbp = '';
    patientPage: Page<Patient> = new Page<Patient>();
    patientList: Patient[] = [];
    page = 0;
    PAGE_SIZE = 5
    total = 0;
    rolaVisaMedSestra = false;

    constructor(
        private patientService: PatientService,
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private snackBar: SnackbarServiceService
    ) {
        this.searchForm = this.formBuilder.group({
            name: '',
            surname: '',
            jmbg: '',
            lbp: ''
        });
    }

    ngOnInit(): void {
        this.patientService.getAllPatients(this.lbp, this.jmbg, this.name, this.surname, this.page, this.PAGE_SIZE)
            .subscribe((response) => {
                this.patientPage = response
                this.patientList = this.patientPage.content
                this.total = this.patientPage.totalElements
            })
        this.userService.checkRole("ROLE_VISA_MED_SESTRA").subscribe(res => {
            this.rolaVisaMedSestra = res;
        });
    }

    deletePatient(LBP: string): void {
        if (confirm(`Da li ste sigurni da zelite da obrisite pacijenta ${LBP}?`)) {
            this.patientService.deletePatient(LBP).subscribe(() => {
                this.getPatientList();
                this.snackBar.openSuccessSnackBar("Uspesno obrisan!")
            }, err => {
                this.snackBar.openErrorSnackBar("Greska prilikom brisanja!")
            });
        }
    }

    updatePatient(patient: Patient): void {
        this.router.navigate(['/nurse-edit-patient/', patient.lbp]);
    }

    getPatientList(): void {
        if (this.page == 0)
            this.page = 1;

        this.patientService.getAllPatients(this.lbp, this.jmbg, this.name, this.surname, this.page - 1, this.PAGE_SIZE).subscribe((response) => {
            this.patientPage = response;
            this.patientList = this.patientPage.content;
            this.total = this.patientPage.totalElements;
        });
    }

    onTableDataChange(event: any): void {
        this.page = event;
        this.getPatientList();
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
    
          this.getPatientList();
        } else {
            console.log("SORTIRAJ")
          this.patientList.sort((a: Patient, b: Patient) => {
            const factor = this.sortOrder[column] === 1 ? 1 : -1;
            const aValue = a[column as keyof Patient];
            const bValue = b[column as keyof Patient];
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
        }
      }
}
