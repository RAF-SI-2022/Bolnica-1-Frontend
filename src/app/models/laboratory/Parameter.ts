import {ParameterValueType} from "../laboratory-enums/ParameterValueType";

export class Parameter {
  parameterName: string = '';
  type: ParameterValueType = ParameterValueType.NUMERICKI;
  unitOfMeasure: string= '';
  lowerLimit: number = 0; //double
  upperLimit: number = 0; //double
}
