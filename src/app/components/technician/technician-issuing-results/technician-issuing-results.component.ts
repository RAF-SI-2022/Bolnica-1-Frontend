import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user-service/user.service";
import {PatientService} from "../../../services/patient-service/patient.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {Page} from "../../../models/models";
import {Patient} from "../../../models/patient/Patient";
import {LabWorkOrder} from "../../../models/laboratory/LabWorkOrder";
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";

@Component({
  selector: 'app-technician-issuing-results',
  templateUrl: './technician-issuing-results.component.html',
  styleUrls: ['./technician-issuing-results.component.css']
})
export class TechnicianIssuingResultsComponent  implements OnInit {

  form: FormGroup;
  page = 0;
  pageSize = 5;
  labWorkOrderPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>();
  labWorkOrderList: LabWorkOrderNew[] = [];
  total = 0;

  constructor(private laboratoryServis:LaboratoryService, private authService: AuthService, private userService:UserService, private patientService: PatientService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      lbp: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  findWorkOrders(){
    const workOrder = this.form.value;

    if(!this.validateFields){
      return;
    }
    this.laboratoryServis.findWorkOrders(workOrder.lbp, workOrder.form, workOrder.to, this.page, this.pageSize).subscribe((response) => {
      this.labWorkOrderPage = response;
      this.labWorkOrderList = this.labWorkOrderPage.content;
    });
  }

  validateFields(): boolean {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');
    if(form.checkValidity() === false){
      return false;
    }
    return true;
  }

  onRowClick(labWorkOrder: LabWorkOrderNew): void {
    const url = `/doctor-workspace-one/${labWorkOrder.prescription.id}`;
    this.router.navigateByUrl(url, { state: { labWorkOrder } });

  }



}
