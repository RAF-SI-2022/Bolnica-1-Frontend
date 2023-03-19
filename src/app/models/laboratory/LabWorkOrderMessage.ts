import {LabWorkOrder} from "./LabWorkOrder";

export interface LabWorkOrderMessage {
  message: string;
  labWorkOrderDto: LabWorkOrder;
}
