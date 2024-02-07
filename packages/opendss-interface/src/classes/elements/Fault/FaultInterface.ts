import { BaseElementInterface } from "@elements/BaseElements";

/**   Circuit Element, PD Element  */
export default interface FaultInterface extends BaseElementInterface {
  /** Name of the component */
  name: string;
  /**
   *@inheritdoc Models.Fault#bus1
   */
  bus1?: string;
  /**
   *@inheritdoc Models.Fault#bus2
   */
  bus2?: string;
  /**
   *@inheritdoc Models.Fault#phases
   */
  phases?: number;
  /**
   *@inheritdoc Models.Fault#r
   */
  r?: number;
  /**
   *@inheritdoc Models.Fault#%stddev
   */
  "%stddev"?: number;
  /**
   *@inheritdoc Models.Fault#Gmatrix
   */
  Gmatrix?: number[];
  /**
   *@inheritdoc Models.Fault#ONtime
   */
  ONtime?: number;
  /**
   *@inheritdoc Models.Fault#temporary
   */
  temporary?: boolean;
  /**
   *@inheritdoc Models.Fault#MinAmps
   */
  MinAmps?: number;
  /**
   *@inheritdoc Models.Fault#normAmps
   */
  normAmps?: number;
  /**
   *@inheritdoc Models.Fault#emergAmps
   */
  emergAmps?: number;
  /**
   *@inheritdoc Models.Fault#faultRate
   */
  faultRate?: number;
  /**
   *@inheritdoc Models.Fault#pctperm
   */
  pctperm?: number;
  /**
   *@inheritdoc Models.Fault#repair
   */
  repair?: number;
  /**
   *@inheritdoc Models.Fault#baseFreq
   */
  baseFreq?: number;
  /**
   *@inheritdoc Models.Fault#enabled
   */
  enabled?: boolean;
}
