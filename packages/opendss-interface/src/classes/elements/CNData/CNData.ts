import ConductorDataElement from "@elements/BaseElements/ConductorDataElement";
import { GMRunitsEnum, RadunitsEnum, UnitsEnum } from "@enums/enums";

import CNDataInterface from "./CNDataInterface";

/**   Conductor Data, Cable Data  */
export default class CNData
    extends ConductorDataElement
    implements CNDataInterface
{
    override #type = "CNData";

    parameters: Array<keyof this> = [
        "k",
        "diaStrand",
        "gmrStrand",
        "rStrand",
        "epsR",
        "insLayer",
        "diaIns",
        "diaCable",
        "rdc",
        "rac",
        "rUnits",
        "gmrAc",
        "gmrUnits",
        "radius",
        "radUnits",
        "normAmps",
        "emergAmps",
        "diam",
        "seasons",
        "ratings",
        "capRadius",
        "like",
    ];

    /** Number of concentric neutral strands; default is 2 */
    k?: number;

    /** Diameter of a concentric neutral strand; same units as core conductor radius; no default. */
    diaStrand?: number;

    /** Geometric mean radius of a concentric neutral strand; same units as core conductor GMR; defaults to 0.7788 * CN strand radius. */
    gmrStrand?: number;

    /** AC resistance of a concentric neutral strand; same units as core conductor resistance; no default. */
    rStrand?: number;

    /** Insulation layer relative permittivity; default is 2.3. */
    epsR?: number;

    /** Insulation layer thickness; same units as radius; no default. With diaIns, establishes inner radius for capacitance calculation. */
    insLayer?: number;

    /** Diameter over insulation layer; same units as radius; no default. Establishes outer radius for capacitance calculation. */
    diaIns?: number;

    /** Diameter over cable; same units as radius; no default. */
    diaCable?: number;

    /** dc Resistance, ohms per unit length (see runits). Defaults to rac/1.02 if not specified. */
    rdc?: number;

    /** Resistance at 60 Hz per unit length. Defaults to 1.02*rdc if not specified. */
    rac?: number;

    /** Length units for resistance: ohms per {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
    rUnits?: UnitsEnum;

    /** GMR at 60 Hz. Defaults to .7788*radius if not specified. */
    gmrAc?: number;

    /** Units for GMR: {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
    gmrUnits?: GMRunitsEnum;

    /** Outside radius of conductor. Defaults to gmr/0.7788 if not specified. */
    radius?: number;

    /** Units for outside radius: {mi|kft|km|m|Ft|in|cm|mm} Default=none. */
    radUnits?: RadunitsEnum;

    /** Normal ampacity, amperes. Defaults to emergency amps/1.5 if not specified. */
    normAmps?: number;

    /** Emergency ampacity, amperes. Defaults to 1.5 * normal amps if not specified. */
    emergAmps?: number;

    /** Diameter; Alternative method for entering radius.
     *
     * Redundant with radius */
    diam?: number;

    /** Defines the number of ratings to be defined for the wire, to be used only when defining seasonal ratings using the "ratings" property. */
    seasons?: number;

    /** An array of ratings to be used when the seasonal ratings flag is true. It can be used to insert
     *
     * multiple ratings to change during a QSTS simulation to evaluate different ratings in lines. */
    ratings?: number[];

    /** Equivalent conductor radius for capacitance calcs. Specify this for bundled conductors. Defaults to same value as radius. Define diam or radius property first. */
    capRadius?: number;

    constructor(options: CNDataInterface) {
        super(options);
        Object.assign(this, options);
    }
}
