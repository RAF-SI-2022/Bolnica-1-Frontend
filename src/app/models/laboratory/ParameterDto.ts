import {ParameterValueType} from "../laboratory-enums/ParameterValueType";

export interface ParameterDto{
   id: number;
   parameterName: string ;
   type: ParameterValueType;
   unitOfMeasure : string;
   lowerLimit: number;
   upperLimit: number;
}
