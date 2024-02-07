import type { GMRunitsEnum, RadunitsEnum, UnitsEnum } from "@enums/enums";
import type { BaseElementInterface } from "@elements/BaseElements";

/**   Conductor Data  */
export default interface WireDataInterface extends BaseElementInterface {
  /** dc Resistance, ohms per unit length (see Runits). Defaults to Rac/1.02 if not specified. */
  rdc?: number;

  /** Resistance at 60 Hz per unit length. Defaults to 1.02*Rdc if not specified. */
  rac?: number;

  /** Length units for resistance: ohms per {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
  rUnits?: UnitsEnum;

  /** GMR at 60 Hz. Defaults to .7788*radius if not specified. */
  gmrac?: number;

  /** Units for GMR: {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
  gmrUnits?: GMRunitsEnum;

  /** Outside radius of conductor. Defaults to GMR/0.7788 if not specified. */
  radius?: number;

  /** Units for outside radius: {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
  radUnits?: RadunitsEnum;

  /** Normal ampacity, amperes. Defaults to Emergency amps/1.5 if not specified. */
  normAmps?: number;

  /** Emergency ampacity, amperes. Defaults to 1.5 * Normal Amps if not specified. */
  emergAmps?: number;

  /** Diameter; Alternative method for entering radius.
   *
   * Redundant with radius */
  diam?: number;

  /** Defines the number of ratings to be defined for the wire, to be used only when defining seasonal ratings using the "Ratings" property. */
  seasons?: number;

  /** An array of ratings to be used when the seasonal ratings flag is True. It can be used to insert
   *
   * multiple ratings to change during a QSTS simulation to evaluate different ratings in lines. */
  ratings?: number[];

  /** Equivalent conductor radius for capacitance calcs. Specify this for bundled conductors. Defaults to same value as radius. Define Diam or Radius property first. */
  capRadius?: number;
}
