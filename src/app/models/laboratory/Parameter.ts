import {ParameterValueType} from "../laboratory-enums/ParameterValueType";

export interface Parameter {
  parameterName: string;
  type: ParameterValueType;
  unitOfMeasure: string;
  lowerLimit: number; //double
  upperLimit: number; //double
}
