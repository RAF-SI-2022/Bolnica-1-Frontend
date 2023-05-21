import {Component, OnInit} from '@angular/core';
import {LaboratoryService} from "../../../services/laboratory-service/laboratory.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../models/models";
// import {Page} from "ngx-pagination";
import {LabWorkOrderNew} from "../../../models/laboratory/LabWorkOrderNew";
import {OrderStatus} from "../../../models/laboratory-enums/OrderStatus";
import {PatientService} from "../../../services/patient-service/patient.service";
import {forkJoin, of, switchMap} from "rxjs";
import {PatientGeneralDto} from "../../../models/patient/PatientGeneralDto";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-biochemist-daily-work-orders',
  templateUrl: './biochemist-daily-work-orders.component.html',
  styleUrls: ['./biochemist-daily-work-orders.component.css']
})
export class BiochemistDailyWorkOrdersComponent implements OnInit{

  labWorkOrders: LabWorkOrderNew [] = []
  labWorkOrderPage: Page<LabWorkOrderNew> = new Page<LabWorkOrderNew>()

  pageLaboratory: number = 0;
  pageSize:number = 999999999; // infinity
  totalLaboratory: number = 0;

  constructor(private laboratoryService: LaboratoryService, private router: Router,
              private patientService:PatientService){

  }

  ngOnInit(): void {
    // this.getWorkOrders();
    //interval(5000).subscribe(() => {
      this.getWorkOrders();
    //});
  }


   getWorkOrders(): void {

    const startOfDAY = new Date()
    startOfDAY.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

     if (this.pageLaboratory == 0)
       this.pageLaboratory = 1;

       const neobradjenObs = this.laboratoryService.getDailyWorkOrders(startOfDAY, endOfDay, OrderStatus.NEOBRADJEN.toString(), this.pageLaboratory - 1, this.pageSize)
       .pipe(
         switchMap((res: Page<LabWorkOrderNew>) => {
           if (res.content.length === 0) {
             return of(res);
           }
           const observables = res.content.map((labWorkOrder: LabWorkOrderNew) => {
             return this.patientService.getPatientByLbp(labWorkOrder.lbp).pipe(
               map((patient: PatientGeneralDto) => {
                 labWorkOrder.patient = patient;
                 return labWorkOrder;
               })
             );
           });
           return forkJoin(observables).pipe(
             map((labWorkOrders: LabWorkOrderNew[]) => {
               res.content = labWorkOrders;
               return res;
             })
           );
         })
       );

     const uObradiObs = this.laboratoryService.getDailyWorkOrders(startOfDAY, endOfDay, OrderStatus.U_OBRADI.toString(), this.pageLaboratory - 1, this.pageSize)
       .pipe(
         switchMap((res: Page<LabWorkOrderNew>) => {
           if (res.content.length === 0) {
             return of(res);
           }
           const observables = res.content.map((labWorkOrder: LabWorkOrderNew) => {
             return this.patientService.getPatientByLbp(labWorkOrder.lbp).pipe(
               map((patient: PatientGeneralDto) => {
                 labWorkOrder.patient = patient;
                 return labWorkOrder;
               })
             );
           });
           return forkJoin(observables).pipe(
             map((labWorkOrders: LabWorkOrderNew[]) => {
               res.content = labWorkOrders;
               return res;
             })
           );
         })
       );

     forkJoin([neobradjenObs, uObradiObs])
       .subscribe(([neobradjenRes, uObradiRes]) => {

         const labWorkOrders = [...neobradjenRes.content, ...uObradiRes.content];
         this.labWorkOrderPage = { ...neobradjenRes, content: labWorkOrders };
         this.labWorkOrders = labWorkOrders;
         this.totalLaboratory = this.labWorkOrders.length;
       }, (error: any) => {
         console.error('Error fetching lab work orders:', error);
       });

  }



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
