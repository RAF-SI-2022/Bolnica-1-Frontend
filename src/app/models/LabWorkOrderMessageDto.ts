import {LabWorkOrder} from "./laboratory/LabWorkOrder";
import {LabWorkOrderDto} from "./laboratory/LabWorkOrderDto";

export interface LabWorkOrderMessageDto{
  message: string;
  labWorkOrderDto: LabWorkOrderDto;
}
