import {CovidSummed} from "./CovidSummed";
import {Page} from "../models";

export interface CovidStatsResultDto{
  covidSummed: CovidSummed;
  list: Page<CovidSummed>;
}
