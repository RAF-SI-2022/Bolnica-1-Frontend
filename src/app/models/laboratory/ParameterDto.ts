import {ParameterValueType} from "../laboratory-enums/ParameterValueType";

export class ParameterDto{
   id: number = 0;
   parameterName: string = '';
   type: ParameterValueType = ParameterValueType.NUMERICKI;
   unitOfMeasure : string = '';
   lowerLimit: number = 0;
   upperLimit: number = 0;

}
