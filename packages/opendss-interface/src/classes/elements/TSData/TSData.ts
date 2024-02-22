import ConductorDataElement from "@elements/BaseElements/ConductorDataElement";
import { GMRunitsEnum, RadunitsEnum, UnitsEnum } from "@enums/enums";

import TSDataInterface from "./TSDataInterface";

/**   Conductor Data, Cable Data  */
export default class TSData
    extends ConductorDataElement
    implements TSDataInterface
{
    override #type = "TSData";

    parameters: Array<keyof this> = [
        "DiaShield",
        "TapeLayer",
        "TapeLap",
        "EpsR",
        "InsLayer",
        "DiaIns",
        "DiaCable",
        "Rdc",
        "Rac",
        "Runits",
        "GMRac",
        "GMRunits",
        "radius",
        "radunits",
        "normAmps",
        "emergAmps",
        "diam",
        "Seasons",
        "Ratings",
        "Capradius",
        "like",
    ];

    /** Diameter over tape shield; same units as radius; no default. */
    DiaShield?: number;

    /** Tape shield thickness; same units as radius; no default. */
    TapeLayer?: number;

    /** Tape Lap in percent; default 20.0 */
    TapeLap?: number;

    /** Insulation layer relative permittivity; default is 2.3. */
    EpsR?: number;

    /** Insulation layer thickness; same units as radius; no default. With DiaIns, establishes inner radius for capacitance calculation. */
    InsLayer?: number;

    /** Diameter over insulation layer; same units as radius; no default. Establishes outer radius for capacitance calculation. */
    DiaIns?: number;

    /** Diameter over cable; same units as radius; no default. */
    DiaCable?: number;

    /** dc Resistance, ohms per unit length (see Runits). Defaults to Rac/1.02 if not specified. */
    Rdc?: number;

    /** Resistance at 60 Hz per unit length. Defaults to 1.02*Rdc if not specified. */
    Rac?: number;

    /** Length units for resistance: ohms per {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
    Runits?: UnitsEnum;

    /** GMR at 60 Hz. Defaults to .7788*radius if not specified. */
    GMRac?: number;

    /** Units for GMR: {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
    GMRunits?: GMRunitsEnum;

    /** Outside radius of conductor. Defaults to GMR/0.7788 if not specified. */
    radius?: number;

    /** Units for outside radius: {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
    radunits?: RadunitsEnum;

    /** Normal ampacity, amperes. Defaults to Emergency amps/1.5 if not specified. */
    normAmps?: number;

    /** Emergency ampacity, amperes. Defaults to 1.5 * Normal Amps if not specified. */
    emergAmps?: number;

    /** Diameter; Alternative method for entering radius.
     *
     * Redundant with radius */
    diam?: number;

    /** Defines the number of ratings to be defined for the wire, to be used only when defining seasonal ratings using the "Ratings" property. */
    Seasons?: number;

    /** An array of ratings to be used when the seasonal ratings flag is True. It can be used to insert
     *
     * multiple ratings to change during a QSTS simulation to evaluate different ratings in lines. */
    Ratings?: number[];

    /** Equivalent conductor radius for capacitance calcs. Specify this for bundled conductors. Defaults to same value as radius. Define Diam or Radius property first. */
    Capradius?: number;

    constructor(options: TSDataInterface) {
        super(options);
        Object.assign(this, options);
    }
}
