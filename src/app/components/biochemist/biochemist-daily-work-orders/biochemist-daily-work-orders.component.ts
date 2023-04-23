import {Component, OnInit} from '@angular/core';
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../models/models";
// import {Page} from "ngx-pagination";
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";
import {OrderStatus} from "../../../models/laboratory-enums/OrderStatus";
import {PatientService} from "../../../services/patient-service/patient.service";

@Component({
  selector: 'app-biochemist-daily-work-orders',
  templateUrl: './biochemist-daily-work-orders.component.html',
  styleUrls: ['./biochemist-daily-work-orders.component.css']
})
export class BiochemistDailyWorkOrdersComponent implements OnInit{

  labWorkOrders: LabWorkOrderNew [] = []
  labWorkOrderPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>()

  pageLaboratory: number = 0;
  pageSize:number = 5;
  totalLaboratory: number = 0;

  constructor(private laboratoryService: LaboratoryService, private router: Router,
              private patientService:PatientService){

  }

  ngOnInit(): void {
    this.getWorkOrders();
  }


  getWorkOrders(): void{

    const startOfDAY = new Date()
    startOfDAY.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)


    this.laboratoryService.findWorkOrders('', startOfDAY, endOfDay,
      OrderStatus.NEOBRADJEN.toString(), this.pageLaboratory, this.pageSize)
      .subscribe(res=>{
        this.labWorkOrderPage = res
        this.labWorkOrders = this.labWorkOrderPage.content
        this.totalLaboratory = this.labWorkOrderPage.totalElements
      })
  }

  /*
   getWorkOrders(): void {
    this.laboratoryService.findWorkOrders('', new Date(), new Date(), OrderStatus.NEOBRADJEN, this.pageLaboratory, this.pageSize)
      .pipe(
        switchMap((res: Page<LabWorkOrderNew>) => {
          // create an array of observables that fetch patient information for each LabWorkOrderNew object
          const observables = res.content.map((labWorkOrder: LabWorkOrderNew) => {
            return this.patientService.getPatientByLbp(labWorkOrder.lbp).pipe(
              map((patient: PatientGeneralDto) => {
                labWorkOrder.patient = patient;
                return labWorkOrder;
              })
            );
          });

          // combine all observables into a single observable that emits an array of LabWorkOrderNew objects
          return forkJoin(observables).pipe(
            map((labWorkOrders: LabWorkOrderNew[]) => {
              res.content = labWorkOrders;
              return res;
            })
          );
        })
      )
      .subscribe(
        (res: Page<LabWorkOrderNew>) => {
          this.labWorkOrderPage = res;
          this.labWorkOrders = this.labWorkOrderPage.content;
          this.totalLaboratory = this.labWorkOrderPage.totalElements;
        },
        (error: any) => {
          console.error('Error fetching lab work orders:', error);
        }
      );
  }
  */


  onTableDataChange(event: any): void {
    this.pageLaboratory = event;
    this.getWorkOrders();
  }

  onRowClick(lab: LabWorkOrderNew): void {
    console.log("Id radnog naloga za detalje: " + lab.id)
    const url = `/biochemist-details/${lab.id}`;

    this.router.navigateByUrl(url, { state: { lab } });
  }

}
