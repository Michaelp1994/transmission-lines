import CircuitElement from "@elements/BaseElements/CircuitElement";

import FaultInterface from "./FaultInterface";

/**   Circuit Element, PD Element  */
export default class Fault extends CircuitElement implements FaultInterface {
    override _type = "Fault";

    parameters: Array<keyof this> = [
        "bus1",
        "bus2",
        "phases",
        "r",
        "%stddev",
        "Gmatrix",
        "ONtime",
        "temporary",
        "MinAmps",
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
     * Bus2 automatically defaults to busname.0,0,0 unless it was previously defined. */
    bus1?: string;

    /** Name of 2nd bus of the 2-terminal Fault object. Defaults to all phases connected to first bus, node 0, if not specified. (Shunt Wye Connection to ground reference)
     *
     * That is, the Fault defaults to a ground fault unless otherwise specified. */
    bus2?: string;

    /** Number of Phases. Default is 1. */
    phases?: number;

    /** Resistance, each phase, ohms. Default is 0.0001. Assumed to be Mean value if gaussian random mode.Max value if uniform mode.  A Fault is actually a series resistance that defaults to a wye connection to ground on the second terminal.  You may reconnect the 2nd terminal to achieve whatever connection.  Use the Gmatrix property to specify an arbitrary conductance matrix. */
    r?: number;

    /** Percent standard deviation in resistance to assume for Monte Carlo fault (MF) solution mode for GAUSSIAN distribution. Default is 0 (no variation from mean). */
    "%stddev"?: number;

    /** Use this to specify a nodal conductance (G) matrix to represent some arbitrary resistance network. Specify in lower triangle form as usual for DSS matrices. */
    Gmatrix?: number[];

    /** Time (sec) at which the fault is established for time varying simulations. Default is 0.0 (on at the beginning of the simulation) */
    ONtime?: number;

    /** {Yes | No} Default is No.  Designate whether the fault is temporary.  For Time-varying simulations, the fault will be removed if the current through the fault drops below the MINAMPS criteria. */
    temporary?: boolean;

    /** Minimum amps that can sustain a temporary fault. Default is 5. */
    MinAmps?: number;

    /** Normal rated current. */
    normAmps?: number;

    /** Maximum or emergency current. */
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

    constructor(options: FaultInterface) {
        super(options);
        Object.assign(this, options);
    }
}
