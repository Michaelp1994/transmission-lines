import GeneralElement from "@elements/BaseElements/GeneralElement";
import { UnitsEnum } from "@enums/enums";

import LineGeometryInterface from "./LineGeometryInterface";

/**   General  */
export default class LineGeometry
    extends GeneralElement
    implements LineGeometryInterface
{
    override _type = "LineGeometry";

    parameters: Array<keyof this> = [
        "nconds",
        "nphases",
        "cond",
        "wire",
        "x",
        "h",
        "units",
        "normAmps",
        "emergAmps",
        "reduce",
        "spacing",
        "wires",
        "cncable",
        "tscable",
        "cncables",
        "tscables",
        "Seasons",
        "Ratings",
        "LineType",
        "like",
    ];

    /** Number of conductors in this geometry. Default is 3. Triggers memory allocations. Define first! */
    nconds?: number;

    /** Number of phases. Default =3; All other conductors are considered neutrals and might be reduced out. */
    nphases?: number;

    /** Set this = number of the conductor you wish to define. Default is 1. */
    cond?: number;

    /** Code from WireData. MUST BE PREVIOUSLY DEFINED. no default.
     *
     * Specifies use of Overhead Line parameter calculation,
     *
     * Unless Tape Shield cable previously assigned to phases, and this wire is a neutral. */
    wire?: string;

    /** x coordinate. */
    x?: number;

    /** Height of conductor. */
    h?: number;

    /** Units for x and h: {mi|kft|km|m|Ft|in|cm } Initial default is "ft", but defaults to last unit defined */
    units?: UnitsEnum;

    /** Normal ampacity, amperes for the line. Defaults to first conductor if not specified. */
    normAmps?: number;

    /** Emergency ampacity, amperes. Defaults to first conductor if not specified. */
    emergAmps?: number;

    /** {Yes | No} Default = no. Reduce to Nphases (Kron Reduction). Reduce out neutrals. */
    reduce?: boolean;

    /** Reference to a LineSpacing for use in a line constants calculation.
     *
     * Alternative to x, h, and units. MUST BE PREVIOUSLY DEFINED.
     *
     * Must match "nconds" as previously defined for this geometry.
     *
     * Must be used in conjunction with the Wires property. */
    spacing?: string;

    /** Array of WireData names for use in a line constants calculation.
     *
     * Alternative to individual wire inputs. ALL MUST BE PREVIOUSLY DEFINED.
     *
     * Must match "nconds" as previously defined for this geometry,
     *
     * unless TSData or CNData were previously assigned to phases, and these wires are neutrals.
     *
     * Must be used in conjunction with the Spacing property.
     *
     * Redundant with wire */
    wires?: string[];

    /** Code from CNData. MUST BE PREVIOUSLY DEFINED. no default.
     *
     * Specifies use of Concentric Neutral cable parameter calculation.
     *
     * Redundant with wire */
    cncable?: string;

    /** Code from TSData. MUST BE PREVIOUSLY DEFINED. no default.
     *
     * Specifies use of Tape Shield cable parameter calculation.
     *
     * Redundant with wire */
    tscable?: string;

    /** Array of CNData names for cable parameter calculation.
     *
     * All must be previously defined, and match "nphases" for this geometry.
     *
     * You can later define "nconds-nphases" wires for bare neutral conductors.
     *
     * Redundant with cncable */
    cncables?: string[];

    /** Array of TSData names for cable parameter calculation.
     *
     * All must be previously defined, and match "nphases" for this geometry.
     *
     * You can later define "nconds-nphases" wires for bare neutral conductors.
     *
     * Redundant with tscable */
    tscables?: string[];

    /** Defines the number of ratings to be defined for the wire, to be used only when defining seasonal ratings using the "Ratings" property. Defaults to first conductor if not specified. */
    Seasons?: number;

    /** An array of ratings to be used when the seasonal ratings flag is True. It can be used to insert
     *
     * multiple ratings to change during a QSTS simulation to evaluate different ratings in lines.Defaults to first conductor if not specified. */
    Ratings?: number[];

    /** Code designating the type of line.
     *
     * One of: OH, UG, UG_TS, UG_CN, SWT_LDBRK, SWT_FUSE, SWT_SECT, SWT_REC, SWT_DISC, SWT_BRK, SWT_ELBOW
     *
     * OpenDSS currently does not use this internally. For whatever purpose the user defines. Default is OH. */
    LineType?: string;

    constructor(options: LineGeometryInterface) {
        super(options);
        Object.assign(this, options);
    }
}
