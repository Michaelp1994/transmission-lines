import { GMRunitsEnum, RadunitsEnum, UnitsEnum } from "@enums/enums";
import { BaseElementInterface } from "@elements/BaseElements";

/**   Conductor Data, Cable Data  */
export default interface TSDataInterface extends BaseElementInterface {
  /** Name of the component */
  name: string;
  /**
   *@inheritdoc Models.TSData#DiaShield
   */
  DiaShield?: number;
  /**
   *@inheritdoc Models.TSData#TapeLayer
   */
  TapeLayer?: number;
  /**
   *@inheritdoc Models.TSData#TapeLap
   */
  TapeLap?: number;
  /**
   *@inheritdoc Models.TSData#EpsR
   */
  EpsR?: number;
  /**
   *@inheritdoc Models.TSData#InsLayer
   */
  InsLayer?: number;
  /**
   *@inheritdoc Models.TSData#DiaIns
   */
  DiaIns?: number;
  /**
   *@inheritdoc Models.TSData#DiaCable
   */
  DiaCable?: number;
  /**
   *@inheritdoc Models.TSData#Rdc
   */
  Rdc?: number;
  /**
   *@inheritdoc Models.TSData#Rac
   */
  Rac?: number;
  /**
   *@inheritdoc Models.TSData#Runits
   */
  Runits?: UnitsEnum;
  /**
   *@inheritdoc Models.TSData#GMRac
   */
  GMRac?: number;
  /**
   *@inheritdoc Models.TSData#GMRunits
   */
  GMRunits?: GMRunitsEnum;
  /**
   *@inheritdoc Models.TSData#radius
   */
  radius?: number;
  /**
   *@inheritdoc Models.TSData#radunits
   */
  radunits?: RadunitsEnum;
  /**
   *@inheritdoc Models.TSData#normAmps
   */
  normAmps?: number;
  /**
   *@inheritdoc Models.TSData#emergAmps
   */
  emergAmps?: number;
  /**
   *@inheritdoc Models.TSData#diam
   */
  diam?: number;
  /**
   *@inheritdoc Models.TSData#Seasons
   */
  Seasons?: number;
  /**
   *@inheritdoc Models.TSData#Ratings
   */
  Ratings?: number[];
  /**
   *@inheritdoc Models.TSData#Capradius
   */
  Capradius?: number;
}
