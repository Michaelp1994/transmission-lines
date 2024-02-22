import CircuitElement from "@elements/BaseElements/CircuitElement";
import { ConnEnum } from "@enums/enums";

import ReactorInterface from "./ReactorInterface";

/**   Circuit Element, PD Element  */
export default class Reactor
    extends CircuitElement
    implements ReactorInterface
{
    override #type = "Reactor";

    parameters: Array<keyof this> = [
        "bus1",
        "bus2",
        "phases",
        "kvar",
        "kv",
        "conn",
        "Rmatrix",
        "Xmatrix",
        "Parallel",
        "R",
        "X",
        "Rp",
        "Z1",
        "Z2",
        "Z0",
        "Z",
        "RCurve",
        "LCurve",
        "LmH",
        "normAmps",
        "emergAmps",
        "faultRate",
        "pctperm",
        "repair",
        "baseFreq",
        "enabled",
        "like",
    ];

    /** Name of first bus. Examples:
     *
     * bus1=busname
     *
     * bus1=busname.1.2.3
     *
     * Bus2 property will default to this bus, node 0, unless previously specified. Only Bus1 need be specified for a Yg shunt reactor. */
    bus1?: string | undefined;

    /** Name of 2nd bus. Defaults to all phases connected to first bus, node 0, (Shunt Wye Connection) except when Bus2 is specifically defined.
     *
     * Not necessary to specify for delta (LL) connection */
    bus2?: string | undefined;

    /** Number of phases. */
    phases?: number;

    /** Total kvar, all phases.  Evenly divided among phases. Only determines X. Specify R separately */
    kvar?: number;

    /** For 2, 3-phase, kV phase-phase. Otherwise specify actual coil rating. */
    kv?: number;

    /** ={wye | delta |LN |LL}  Default is wye, which is equivalent to LN. If Delta, then only one terminal. */
    conn?: ConnEnum;

    /** Resistance matrix, lower triangle, ohms at base frequency. Order of the matrix is the number of phases. Mutually exclusive to specifying parameters by kvar or X. */
    Rmatrix?: number[];

    /** Reactance matrix, lower triangle, ohms at base frequency. Order of the matrix is the number of phases. Mutually exclusive to specifying parameters by kvar or X. */
    Xmatrix?: number[];

    /** {Yes | No}  Default=No. Indicates whether Rmatrix and Xmatrix are to be considered in parallel. Default is series. For other models, specify R and Rp. */
    Parallel?: boolean;

    /** Resistance (in series with reactance), each phase, ohms. This property applies to REACTOR specified by either kvar or X. See also help on Z.
     *
     * Redundant with Z */
    R?: number;

    /** Reactance, each phase, ohms at base frequency. See also help on Z and LmH properties.
     *
     * Redundant with Z */
    X?: number;

    /** Resistance in parallel with R and X (the entire branch). Assumed infinite if not specified. */
    Rp?: number;

    /** Positive-sequence impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z1=[1, 2]  ! represents 1 + j2
     *
     * If defined, Z1, Z2, and Z0 are used to define the impedance matrix of the REACTOR. Z1 MUST BE DEFINED TO USE THIS OPTION FOR DEFINING THE MATRIX.
     *
     * Side Effect: Sets Z2 and Z0 to same values unless they were previously defined. */
    Z1?: number[];

    /** Negative-sequence impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z2=[1, 2]  ! represents 1 + j2
     *
     * Used to define the impedance matrix of the REACTOR if Z1 is also specified.
     *
     * Note: Z2 defaults to Z1 if it is not specifically defined. If Z2 is not equal to Z1, the impedance matrix is asymmetrical. */
    Z2?: number[];

    /** Zer0-sequence impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z0=[3, 4]  ! represents 3 + j4
     *
     * Used to define the impedance matrix of the REACTOR if Z1 is also specified.
     *
     * Note: Z0 defaults to Z1 if it is not specifically defined. */
    Z0?: number[];

    /** Alternative way of defining R and X properties. Enter a 2-element array representing R +jX in ohms. Example:
     *
     * Z=[5  10]   ! equivalent to R=5  X=10 */
    Z?: number[];

    /** Name of XYCurve object, previously defined, describing per-unit variation of phase resistance, R, vs. frequency. Applies to resistance specified by R or Z property. If actual values are not known, R often increases by approximately the square root of frequency. */
    RCurve?: string;

    /** Name of XYCurve object, previously defined, describing per-unit variation of phase inductance, L=X/w, vs. frequency. Applies to reactance specified by X, LmH, Z, or kvar property.L generally decreases somewhat with frequency above the base frequency, approaching a limit at a few kHz. */
    LCurve?: string;

    /** Inductance, mH. Alternate way to define the reactance, X, property.
     *
     * Redundant with X */
    LmH?: number;

    /** Normal rated current. */
    normAmps?: number;

    /** Maximum or emerg current. */
    emergAmps?: number;

    /** Failure rate per year. */
    faultRate?: number;

    /** Percent of failures that become permanent. */
    pctperm?: number;

    /** Hours to repair. */
    repair?: number;

    /** Base Frequency for ratings. */
    baseFreq?: number;

    /** {Yes|No or True|False} Indicates whether this element is enabled. */
    enabled?: boolean;

    constructor(options: ReactorInterface) {
        super(options);
        Object.assign(this, options);
    }
}
