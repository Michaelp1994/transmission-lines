import { GMRunitsEnum, RadunitsEnum, UnitsEnum } from "@enums/enums";
import { BaseElementInterface } from "@elements/BaseElements";

/**   Conductor Data, Cable Data  */
export default interface CNDataInterface extends BaseElementInterface {
  /**
   *@inheritdoc Models.CNData#k
   */
  k?: number;
  /**
   *@inheritdoc Models.CNData#diaStrand
   */
  diaStrand?: number;
  /**
   *@inheritdoc Models.CNData#gmrStrand
   */
  gmrStrand?: number;
  /**
   *@inheritdoc Models.CNData#rStrand
   */
  rStrand?: number;
  /**
   *@inheritdoc Models.CNData#epsR
   */
  epsR?: number;
  /**
   *@inheritdoc Models.CNData#InsLayer
   */
  insLayer?: number;
  /**
   *@inheritdoc Models.CNData#DiaIns
   */
  diaIns?: number;
  /**
   *@inheritdoc Models.CNData#DiaCable
   */
  diaCable?: number;
  /**
   *@inheritdoc Models.CNData#Rdc
   */
  rdc?: number;
  /**
   *@inheritdoc Models.CNData#Rac
   */
  rac?: number;
  /**
   *@inheritdoc Models.CNData#Runits
   */
  rUnits?: UnitsEnum;
  /**
   *@inheritdoc Models.CNData#GMRac
   */
  gmrAc?: number;
  /**
   *@inheritdoc Models.CNData#GMRunits
   */
  gmrUnits?: GMRunitsEnum;
  /**
   *@inheritdoc Models.CNData#radius
   */
  radius?: number;
  /**
   *@inheritdoc Models.CNData#radunits
   */
  radUnits?: RadunitsEnum;
  /**
   *@inheritdoc Models.CNData#normAmps
   */
  normAmps?: number;
  /**
   *@inheritdoc Models.CNData#emergAmps
   */
  emergAmps?: number;
  /**
   *@inheritdoc Models.CNData#diam
   */
  diam?: number;
  /**
   *@inheritdoc Models.CNData#Seasons
   */
  seasons?: number;
  /**
   *@inheritdoc Models.CNData#Ratings
   */
  ratings?: number[];
  /**
   *@inheritdoc Models.CNData#Capradius
   */
  capRadius?: number;
}
