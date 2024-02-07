import { ConnEnum } from "@enums/enums";
import { BaseElementInterface } from "@elements/BaseElements";

/**   Circuit Element, PD Element  */
export default interface ReactorInterface extends BaseElementInterface {
  /** Name of the component */
  name: string;
  /**
   *@inheritdoc Models.Reactor#bus1
   */
  bus1?: string;
  /**
   *@inheritdoc Models.Reactor#bus2
   */
  bus2?: string;
  /**
   *@inheritdoc Models.Reactor#phases
   */
  phases?: number;
  /**
   *@inheritdoc Models.Reactor#kvar
   */
  kvar?: number;
  /**
   *@inheritdoc Models.Reactor#kv
   */
  kv?: number;
  /**
   *@inheritdoc Models.Reactor#conn
   */
  conn?: ConnEnum;
  /**
   *@inheritdoc Models.Reactor#Rmatrix
   */
  Rmatrix?: number[];
  /**
   *@inheritdoc Models.Reactor#Xmatrix
   */
  Xmatrix?: number[];
  /**
   *@inheritdoc Models.Reactor#Parallel
   */
  Parallel?: boolean;
  /**
   *@inheritdoc Models.Reactor#R
   */
  R?: number;
  /**
   *@inheritdoc Models.Reactor#X
   */
  X?: number;
  /**
   *@inheritdoc Models.Reactor#Rp
   */
  Rp?: number;
  /**
   *@inheritdoc Models.Reactor#Z1
   */
  Z1?: number[];
  /**
   *@inheritdoc Models.Reactor#Z2
   */
  Z2?: number[];
  /**
   *@inheritdoc Models.Reactor#Z0
   */
  Z0?: number[];
  /**
   *@inheritdoc Models.Reactor#Z
   */
  Z?: number[];
  /**
   *@inheritdoc Models.Reactor#RCurve
   */
  RCurve?: string;
  /**
   *@inheritdoc Models.Reactor#LCurve
   */
  LCurve?: string;
  /**
   *@inheritdoc Models.Reactor#LmH
   */
  LmH?: number;
  /**
   *@inheritdoc Models.Reactor#normAmps
   */
  normAmps?: number;
  /**
   *@inheritdoc Models.Reactor#emergAmps
   */
  emergAmps?: number;
  /**
   *@inheritdoc Models.Reactor#faultRate
   */
  faultRate?: number;
  /**
   *@inheritdoc Models.Reactor#pctperm
   */
  pctperm?: number;
  /**
   *@inheritdoc Models.Reactor#repair
   */
  repair?: number;
  /**
   *@inheritdoc Models.Reactor#baseFreq
   */
  baseFreq?: number;
  /**
   *@inheritdoc Models.Reactor#enabled
   */
  enabled?: boolean;
}
