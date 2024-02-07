import { UnitsEnum } from "@enums/enums";
import GeneralElement from "@elements/BaseElements/GeneralElement";
import LineCodeInterface from "./LineCodeInterface";

/**   General  */
export default class LineCode
    extends GeneralElement
    implements LineCodeInterface
{
    _type = "LineCode";

    parameters: Array<keyof this> = [
        "nphases",
        "r1",
        "x1",
        "r0",
        "x0",
        "C1",
        "C0",
        "units",
        "rmatrix",
        "xmatrix",
        "cMatrix",
        "baseFreq",
        "normAmps",
        "emergAmps",
        "faultRate",
        "pctperm",
        "repair",
        "Kron",
        "Rg",
        "Xg",
        "rho",
        "neutral",
        "B1",
        "B0",
        "Seasons",
        "Ratings",
        "LineType",
        "like",
    ];

    /** Number of phases in the line this line code data represents.  Setting this property reinitializes the line code.  Impedance matrix is reset for default symmetrical component. */
    nphases?: number;

    /** Positive-sequence Resistance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. See also Rmatrix. */
    r1?: number;

    /** Positive-sequence Reactance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. See also Xmatrix */
    x1?: number;

    /** Zero-sequence Resistance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. */
    r0?: number;

    /** Zero-sequence Reactance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. */
    x0?: number;

    /** Positive-sequence capacitance, nf per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. See also Cmatrix and B1. */
    C1?: number;

    /** Zero-sequence capacitance, nf per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. See also B0. */
    C0?: number;

    /** One of (ohms per ...) {none|mi|km|kft|m|me|ft|in|cm}.  Default is none; assumes units agree with length unitsgiven in Line object */
    units?: UnitsEnum;

    /** Resistance matrix, lower triangle, ohms per unit length. Order of the matrix is the number of phases. May be used to specify the impedance of any line configuration.  For balanced line models, you may use the standard symmetrical component data definition instead. */
    rmatrix?: number[];

    /** Reactance matrix, lower triangle, ohms per unit length. Order of the matrix is the number of phases. May be used to specify the impedance of any line configuration.  For balanced line models, you may use the standard symmetrical component data definition instead. */
    xmatrix?: number[];

    /** Nodal Capacitance matrix, lower triangle, nf per unit length.Order of the matrix is the number of phases. May be used to specify the shunt capacitance of any line configuration.  For balanced line models, you may use the standard symmetrical component data definition instead. */
    cMatrix?: number[];

    /** Frequency at which impedances are specified. */
    baseFreq?: number;

    /** Normal ampere limit on line.  This is the so-called Planning Limit. It may also be the value above which load will have to be dropped in a contingency.  Usually about 75% - 80% of the emergency (one-hour) rating. */
    normAmps?: number;

    /** Emergency ampere limit on line (usually one-hour rating). */
    emergAmps?: number;

    /** Number of faults per unit length per year. */
    faultRate?: number;

    /** Percentage of the faults that become permanent. */
    pctperm?: number;

    /** Hours to repair. */
    repair?: number;

    /** Kron = Y/N. Default=N.  Perform Kron reduction on the impedance matrix after it is formed, reducing order by 1. Eliminates the conductor designated by the "Neutral=" property. Do this after the R, X, and C matrices are defined. Ignored for symmetrical components. May be issued more than once to eliminate more than one conductor by resetting the Neutral property after the previous invoking of this property. Generally, you do not want to do a Kron reduction on the matrix if you intend to solve at a frequency other than the base frequency and exploit the Rg and Xg values. */
    Kron?: boolean;

    /** Carson earth return resistance per unit length used to compute impedance values at base frequency.  For making better frequency adjustments. Default is 0.01805 = 60 Hz value in ohms per kft (matches default line impedances). This value is required for harmonic solutions if you wish to adjust the earth return impedances for frequency. If not, set both Rg and Xg = 0. */
    Rg?: number;

    /** Carson earth return reactance per unit length used to compute impedance values at base frequency.  For making better frequency adjustments. Default value is 0.155081 = 60 Hz value in ohms per kft (matches default line impedances). This value is required for harmonic solutions if you wish to adjust the earth return impedances for frequency. If not, set both Rg and Xg = 0. */
    Xg?: number;

    /** Default=100 meter ohms.  Earth resitivity used to compute earth correction factor. */
    rho?: number;

    /** Designates which conductor is the "neutral" conductor that will be eliminated by Kron reduction. Default is the last conductor (nphases value). After Kron reduction is set to 0. Subsequent issuing of Kron=Yes will not do anything until this property is set to a legal value. Applies only to LineCodes defined by R, X, and C matrix. */
    neutral?: number;

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

    constructor(options: LineCodeInterface) {
        super(options);
        Object.assign(this, options);
    }
}
