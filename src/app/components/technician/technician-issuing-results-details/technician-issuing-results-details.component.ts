import { Component } from '@angular/core';
import {LabWorkOrder} from "../../../models/laboratory/LabWorkOrder";

@Component({
  selector: 'app-technician-issuing-results-details',
  templateUrl: './technician-issuing-results-details.component.html',
  styleUrls: ['./technician-issuing-results-details.component.css']
})
export class TechnicianIssuingResultsDetailsComponent {

  currentLabWorkOred: LabWorkOrder | undefined


  ngOnInit(): void {
    this.currentLabWorkOred = history.state.labWorkOrder;

  }
}
