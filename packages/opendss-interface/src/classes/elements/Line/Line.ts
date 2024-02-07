import { EarthModelEnum, UnitsEnum } from "@enums/enums";
import CircuitElement from "@elements/BaseElements/CircuitElement";
import LineInterface from "./LineInterface";

/**   Circuit Element, PD Element  */
export default class Line extends CircuitElement implements LineInterface {
    _type = "Line";

    parameters: Array<keyof this> = [
        "bus1",
        "bus2",
        "linecode",
        "length",
        "phases",
        "r1",
        "x1",
        "r0",
        "x0",
        "C1",
        "C0",
        "rmatrix",
        "xmatrix",
        "cMatrix",
        "Switch",
        "Rg",
        "Xg",
        "rho",
        "geometry",
        "units",
        "spacing",
        "wires",
        "EarthModel",
        "cncables",
        "tscables",
        "B1",
        "B0",
        "Seasons",
        "Ratings",
        "LineType",
        "normAmps",
        "emergAmps",
        "faultRate",
        "pctperm",
        "repair",
        "baseFreq",
        "enabled",
        "like",
    ];

    /** Name of bus to which first terminal is connected.
     *
     * Example:
     *
     * bus1=busname   (assumes all terminals connected in normal phase order)
     *
     * bus1=busname.3.1.2.0 (specify terminal to node connections explicitly) */
    bus1?: string;

    /** Name of bus to which 2nd terminal is connected. */
    bus2?: string;

    /** Name of linecode object describing line impedances.
     *
     * If you use a line code, you do not need to specify the impedances here. The line code must have been PREVIOUSLY defined. The values specified last will prevail over those specified earlier (left-to-right sequence of properties).  You can subsequently change the number of phases if symmetrical component quantities are specified.If no line code or impedance data are specified, the line object defaults to 336 MCM ACSR on 4 ft spacing. */
    linecode?: string;

    /** Length of line. Default is 1.0. If units do not match the impedance data, specify "units" property. */
    length?: number;

    /** Number of phases, this line. */
    phases?: number;

    /** Positive-sequence Resistance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. See also Rmatrix. */
    r1?: number;

    /** Positive-sequence Reactance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition.  See also Xmatrix */
    x1?: number;

    /** Zero-sequence Resistance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. */
    r0?: number;

    /** Zero-sequence Reactance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. */
    x0?: number;

    /** Positive-sequence capacitance, nf per unit length.  Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. See also Cmatrix and B1. */
    C1?: number;

    /** Zero-sequence capacitance, nf per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition.See also B0. */
    C0?: number;

    /** Resistance matrix, lower triangle, ohms per unit length. Order of the matrix is the number of phases. May be used to specify the impedance of any line configuration. Using any of Rmatrix, Xmatrix, Cmatrix forces program to use the matrix values for line impedance definition. For balanced line models, you may use the standard symmetrical component data definition instead. */
    rmatrix?: number[];

    /** Reactance matrix, lower triangle, ohms per unit length. Order of the matrix is the number of phases. May be used to specify the impedance of any line configuration. Using any of Rmatrix, Xmatrix, Cmatrix forces program to use the matrix values for line impedance definition.  For balanced line models, you may use the standard symmetrical component data definition instead. */
    xmatrix?: number[];

    /** Nodal Capacitance matrix, lower triangle, nf per unit length.Order of the matrix is the number of phases. May be used to specify the shunt capacitance of any line configuration. Using any of Rmatrix, Xmatrix, Cmatrix forces program to use the matrix values for line impedance definition.  For balanced line models, you may use the standard symmetrical component data definition instead. */
    cMatrix?: number[];

    /** {y/n | T/F}  Default= no/false.  Designates this line as a switch for graphics and algorithmic purposes.
     *
     * SIDE EFFECT: Sets r1 = 1.0; x1 = 1.0; r0 = 1.0; x0 = 1.0; c1 = 1.1 ; c0 = 1.0;  length = 0.001; You must reset if you want something different. */
    Switch?: boolean;

    /** Carson earth return resistance per unit length used to compute impedance values at base frequency. Default is 0.01805 = 60 Hz value in ohms per kft (matches default line impedances). This value is required for harmonic solutions if you wish to adjust the earth return impedances for frequency. If not, set both Rg and Xg = 0. */
    Rg?: number;

    /** Carson earth return reactance per unit length used to compute impedance values at base frequency.  For making better frequency adjustments. Default is 0.155081 = 60 Hz value in ohms per kft (matches default line impedances). This value is required for harmonic solutions if you wish to adjust the earth return impedances for frequency. If not, set both Rg and Xg = 0. */
    Xg?: number;

    /** Default=100 meter ohms.  Earth resitivity used to compute earth correction factor. Overrides Line geometry definition if specified. */
    rho?: number;

    /** Geometry code for LineGeometry Object. Supercedes any previous definition of line impedance. Line constants are computed for each frequency change or rho change. CAUTION: may alter number of phases. You cannot subsequently change the number of phases unless you change how the line impedance is defined. */
    geometry?: string;

    /** Length Units = {none | mi|kft|km|m|Ft|in|cm } Default is None - assumes length units match impedance units. */
    units?: UnitsEnum;

    /** Reference to a LineSpacing for use in a line constants calculation.
     *
     * Must be used in conjunction with the Wires property.
     *
     * Specify this before the wires property. */
    spacing?: string;

    /** Array of WireData names for use in an overhead line constants calculation.
     *
     * Must be used in conjunction with the Spacing property.
     *
     * Specify the Spacing first, and "ncond" wires.
     *
     * May also be used to specify bare neutrals with cables, using "ncond-nphase" wires. */
    wires?: string[];

    /** One of {Carson | FullCarson | Deri}. Default is the global value established with the Set EarthModel command. See the Options Help on EarthModel option. This is used to override the global value for this line. This option applies only when the "geometry" property is used. */
    EarthModel?: EarthModelEnum;

    /** Array of CNData names for use in a cable constants calculation.
     *
     * Must be used in conjunction with the Spacing property.
     *
     * Specify the Spacing first, using "nphases" cncables.
     *
     * You may later specify "nconds-nphases" wires for separate neutrals
     *
     * Redundant with wires */
    cncables?: string[];

    /** Array of TSData names for use in a cable constants calculation.
     *
     * Must be used in conjunction with the Spacing property.
     *
     * Specify the Spacing first, using "nphases" tscables.
     *
     * You may later specify "nconds-nphases" wires for separate neutrals
     *
     * Redundant with wires */
    tscables?: string[];

    /** Alternate way to specify C1. MicroS per unit length
     *
     * Redundant with C1 */
    B1?: number;

    /** Alternate way to specify C0. MicroS per unit length
     *
     * Redundant with C0 */
    B0?: number;

    /** Defines the number of ratings to be defined for the wire, to be used only when defining seasonal ratings using the "Ratings" property. */
    Seasons?: number;

    /** An array of ratings to be used when the seasonal ratings flag is True. It can be used to insert
     *
     * multiple ratings to change during a QSTS simulation to evaluate different ratings in lines. */
    Ratings?: number[];

    /** Code designating the type of line.
     *
     * One of: OH, UG, UG_TS, UG_CN, SWT_LDBRK, SWT_FUSE, SWT_SECT, SWT_REC, SWT_DISC, SWT_BRK, SWT_ELBOW
     *
     * OpenDSS currently does not use this internally. For whatever purpose the user defines. Default is OH. */
    LineType?: string;

    /** Normal rated current. */
    normAmps?: number;

    /** Maximum or emerg current. */
    emergAmps?: number;

    /** Failure rate PER UNIT LENGTH per year. Length must be same units as LENGTH property. Default is 0.1 fault per unit length per year. */
    faultRate?: number;

    /** Percent of failures that become permanent. Default is 20. */
    pctperm?: number;

    /** Hours to repair. Default is 3 hr. */
    repair?: number;

    /** Base Frequency for ratings. */
    baseFreq?: number;

    /** {Yes|No or True|False} Indicates whether this element is enabled. */
    enabled?: boolean;

    constructor(options: LineInterface) {
        super(options);
        Object.assign(this, options);
    }
}
