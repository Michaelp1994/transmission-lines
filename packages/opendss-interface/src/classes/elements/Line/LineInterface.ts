import { EarthModelEnum, UnitsEnum } from "@enums/enums";
import { BaseElementInterface } from "@elements/BaseElements";

/**   Circuit Element, PD Element  */
export default interface LineInterface extends BaseElementInterface {
  /** Name of the component */
  name: string;
  /**
   *@inheritdoc Models.Line#bus1
   */
  bus1?: string;
  /**
   *@inheritdoc Models.Line#bus2
   */
  bus2?: string;
  /**
   *@inheritdoc Models.Line#linecode
   */
  linecode?: string;
  /**
   *@inheritdoc Models.Line#length
   */
  length?: number;
  /**
   *@inheritdoc Models.Line#phases
   */
  phases?: number;
  /**
   *@inheritdoc Models.Line#r1
   */
  r1?: number;
  /**
   *@inheritdoc Models.Line#x1
   */
  x1?: number;
  /**
   *@inheritdoc Models.Line#r0
   */
  r0?: number;
  /**
   *@inheritdoc Models.Line#x0
   */
  x0?: number;
  /**
   *@inheritdoc Models.Line#C1
   */
  C1?: number;
  /**
   *@inheritdoc Models.Line#C0
   */
  C0?: number;
  /**
   *@inheritdoc Models.Line#rmatrix
   */
  rmatrix?: number[];
  /**
   *@inheritdoc Models.Line#xmatrix
   */
  xmatrix?: number[];
  /**
   *@inheritdoc Models.Line#cMatrix
   */
  cMatrix?: number[];
  /**
   *@inheritdoc Models.Line#Switch
   */
  Switch?: boolean;
  /**
   *@inheritdoc Models.Line#Rg
   */
  Rg?: number;
  /**
   *@inheritdoc Models.Line#Xg
   */
  Xg?: number;
  /**
   *@inheritdoc Models.Line#rho
   */
  rho?: number;
  /**
   *@inheritdoc Models.Line#geometry
   */
  geometry?: string;
  /**
   *@inheritdoc Models.Line#units
   */
  units?: UnitsEnum;
  /**
   *@inheritdoc Models.Line#spacing
   */
  spacing?: string;
  /**
   *@inheritdoc Models.Line#wires
   */
  wires?: string[];
  /**
   *@inheritdoc Models.Line#EarthModel
   */
  EarthModel?: EarthModelEnum;
  /**
   *@inheritdoc Models.Line#cncables
   */
  cncables?: string[];
  /**
   *@inheritdoc Models.Line#tscables
   */
  tscables?: string[];
  /**
   *@inheritdoc Models.Line#B1
   */
  B1?: number;
  /**
   *@inheritdoc Models.Line#B0
   */
  B0?: number;
  /**
   *@inheritdoc Models.Line#Seasons
   */
  Seasons?: number;
  /**
   *@inheritdoc Models.Line#Ratings
   */
  Ratings?: number[];
  /**
   *@inheritdoc Models.Line#LineType
   */
  LineType?: string;
  /**
   *@inheritdoc Models.Line#normAmps
   */
  normAmps?: number;
  /**
   *@inheritdoc Models.Line#emergAmps
   */
  emergAmps?: number;
  /**
   *@inheritdoc Models.Line#faultRate
   */
  faultRate?: number;
  /**
   *@inheritdoc Models.Line#pctperm
   */
  pctperm?: number;
  /**
   *@inheritdoc Models.Line#repair
   */
  repair?: number;
  /**
   *@inheritdoc Models.Line#baseFreq
   */
  baseFreq?: number;
  /**
   *@inheritdoc Models.Line#enabled
   */
  enabled?: boolean;
}
