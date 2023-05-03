import {Component, OnInit} from '@angular/core';
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";
import {Page} from "../../../models/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../../../models/patient/Patient";
import {PatientService} from "../../../services/patient-service/patient.service";
import {AuthService} from "../../../services/auth.service";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {Router} from "@angular/router";
import {SnackbarServiceService} from "../../../services/snackbar-service.service";
import {HospitalizationDto} from "../../../models/infirmary/HospitalizationDto";
import {InfirmaryService} from "../../../services/infirmary-service/infirmary.service";
import {forkJoin} from "rxjs";
import {HospitalRoomDto} from "../../../models/infirmary/HospitalRoomDto";

@Component({
  selector: 'app-doctor-patients-infirmary',
  templateUrl: './doctor-patients-infirmary.component.html',
  styleUrls: ['./doctor-patients-infirmary.component.css']
})
export class DoctorPatientsInfirmaryComponent implements OnInit {

  hospitalizationList: HospitalizationDto[] = [];
  hospitalizationPage: Page<HospitalizationDto> = new Page<HospitalizationDto>();

  PAGE_SIZE: number = 5;
  page: number = 0;
  total: number = 0;

  departmentId: string | null;
  departmentIdNumber: number;

  form: FormGroup;
  patients: Patient[] = []

  constructor(private patientService: PatientService, private authService: AuthService,
              private laboratoryService: LaboratoryService, private router: Router, private snackBar: SnackbarServiceService,
              private formBuilder: FormBuilder,
              private infirmaryService:InfirmaryService) {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      lbp: ['', [Validators.required]],
      jmbg: ['', [Validators.required]],
    });

    this.departmentId = localStorage.getItem("departmentId")
    // @ts-ignore
    this.departmentIdNumber = parseInt(this.departmentId);

  }

  ngOnInit(): void {
    // this.lbz = this.authService.getLBZ();
    // console.log("lbz: " + this.lbz);
    this.populatePatients()
  }


  getHospitalization(): void {
    const sendData = this.form.value;
    console.log(sendData)

    sendData.lbp = sendData.lbp.split("-")[0].toString().trim();
    console.log("sending lbp: " + sendData.lpb)

    this.infirmaryService.getHospitalizationsWithFilter(
      sendData.name, sendData.surname, sendData.jmbg,
      this.departmentIdNumber, sendData.lbp, this.page, this.PAGE_SIZE
    ).subscribe(
      res => {
        this.hospitalizationPage = res
        this.hospitalizationList = this.hospitalizationPage.content

        // populate hospitalRoom property for each hospitalizationDto
        for (let hospitalizationDto of this.hospitalizationList) {
          this.infirmaryService.getHospitalRoomsById(hospitalizationDto.hospitalRoomId).subscribe(
            roomRes => {
              hospitalizationDto.hospitalRoom = roomRes;
            }, err => {
              console.log("Error getting hospital room: ", err);
            }
          );

          // call getPatientByLbp for each hospitalizationDto
          this.patientService.getPatientByLbp(hospitalizationDto.lbp).subscribe(
            patientRes => {
              hospitalizationDto.dateOfBirth = patientRes.dateOfBirth;
            }, err => {
              console.log("Error getting patient: ", err);
            }
          );

        }

        // use forkJoin to wait for all the observables to complete
        forkJoin(this.hospitalizationList.map(hospitalizationDto => this.patientService.getPatientByLbp(hospitalizationDto.lbp)))
          .subscribe(
            patients => {
              for (let i = 0; i < patients.length; i++) {
                this.hospitalizationList[i].dateOfBirth = patients[i].dateOfBirth;
              }
            }, err => {
              console.log("Error getting patients: ", err);
            }
          );

        this.total = this.hospitalizationPage.totalElements
        if (this.hospitalizationList.length == 0) {
          this.snackBar.openWarningSnackBar("Nema hospitalizovanih pacijenata")
        }
      }, err => {
        this.snackBar.openErrorSnackBar("Greska")
      }
    )
  }


  onTableDataChange(event: any): void {
    this.page = event;
    this.getHospitalization();
  }

  filteredPatients: Patient[] = [];
  filterPatientLbp(searchText: string){
    if (this.patients && this.patients.length > 0 && searchText.length > 0) {
      this.filteredPatients = this.patients.filter(
        (patientt) =>
          (patientt.lbp?.toString().toLowerCase().includes(searchText.toLowerCase()) || '') ||
          (patientt.name?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
          (patientt.surname?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    } else {
      this.filteredPatients = [];
    }
    console.log("Imam nas " + this.filteredPatients.length)
  }

  selectSuggestion(patient: Patient){
    this.form.value.lbp = `${patient.lbp} - ${patient.name} (${patient.surname})`;
    this.filteredPatients = [];
  }


  populatePatients() {
    this.patientService.getAllPatients("", "","", "", 0, 100).subscribe(res => {
      this.patients = res.content;
      console.log("IMA NAS " + res.content.length)
    }, err => {
      console.log("GRESKA " + err.message)
    })
  }

  goToWorkspaceEmpty(): void{
    const lbp = 'P0002';
    const url = `/doctor-infirmary-workspace/${lbp}`;
    this.router.navigateByUrl(url);
  }

  goToWorkspace(hospitalization: HospitalizationDto): void{
    console.log("Lbp:  " + hospitalization.lbp)
    const url = `/doctor-infirmary-workspace/${hospitalization.lbp}`;

    this.router.navigateByUrl(url, { state: { hospitalization } });
  }
}
