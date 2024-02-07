import { UnitsEnum } from "@enums/enums";
import { BaseElementInterface } from "@elements/BaseElements";

/**   General  */
export default interface LineGeometryInterface extends BaseElementInterface {
  /** Name of the component */
  name: string;
  /**
   *@inheritdoc Models.LineGeometry#nconds
   */
  nconds?: number;
  /**
   *@inheritdoc Models.LineGeometry#nphases
   */
  nphases?: number;
  /**
   *@inheritdoc Models.LineGeometry#cond
   */
  cond?: number;
  /**
   *@inheritdoc Models.LineGeometry#wire
   */
  wire?: string;
  /**
   *@inheritdoc Models.LineGeometry#x
   */
  x?: number;
  /**
   *@inheritdoc Models.LineGeometry#h
   */
  h?: number;
  /**
   *@inheritdoc Models.LineGeometry#units
   */
  units?: UnitsEnum;
  /**
   *@inheritdoc Models.LineGeometry#normAmps
   */
  normAmps?: number;
  /**
   *@inheritdoc Models.LineGeometry#emergAmps
   */
  emergAmps?: number;
  /**
   *@inheritdoc Models.LineGeometry#reduce
   */
  reduce?: boolean;
  /**
   *@inheritdoc Models.LineGeometry#spacing
   */
  spacing?: string;
  /**
   *@inheritdoc Models.LineGeometry#wires
   */
  wires?: string[];
  /**
   *@inheritdoc Models.LineGeometry#cncable
   */
  cncable?: string;
  /**
   *@inheritdoc Models.LineGeometry#tscable
   */
  tscable?: string;
  /**
   *@inheritdoc Models.LineGeometry#cncables
   */
  cncables?: string[];
  /**
   *@inheritdoc Models.LineGeometry#tscables
   */
  tscables?: string[];
  /**
   *@inheritdoc Models.LineGeometry#Seasons
   */
  Seasons?: number;
  /**
   *@inheritdoc Models.LineGeometry#Ratings
   */
  Ratings?: number[];
  /**
   *@inheritdoc Models.LineGeometry#LineType
   */
  LineType?: string;
}
