import { ScanTypeEnum, SequenceEnum } from "@enums/enums";
import CircuitElement from "@elements/BaseElements/CircuitElement";
import IsourceInterface from "./IsourceInterface";

/**   Circuit Element, PC Element  */
export default class Isource
  extends CircuitElement
  implements IsourceInterface
{
  _type = "Isource";

  parameters: Array<keyof this> = [
    "bus1",
    "amps",
    "angle",
    "frequency",
    "phases",
    "scantype",
    "sequence",
    "Yearly",
    "Daily",
    "Duty",
    "Bus2",
    "spectrum",
    "baseFreq",
    "enabled",
    "like",
  ];

  /** Name of bus to which source is connected.
   *
   * bus1=busname
   *
   * bus1=busname.1.2.3 */
  bus1?: string;

  /** Magnitude of current source, each phase, in Amps. */
  amps?: number;

  /** Phase angle in degrees of first phase: e.g.,Angle=10.3.
   *
   * Phase shift between phases is assumed 120 degrees when number of phases <= 3 */
  angle?: number;

  /** Source frequency.  Defaults to  circuit fundamental frequency. */
  frequency?: number;

  /** Number of phases.  Defaults to 3. For 3 or less, phase shift is 120 degrees. */
  phases?: number;

  /** {pos*| zero | none} Maintain specified sequence for harmonic solution. Default is positive sequence. Otherwise, angle between phases rotates with harmonic. */
  scantype?: ScanTypeEnum;

  /** {pos*| neg | zero} Set the phase angles for the specified symmetrical component sequence for non-harmonic solution modes. Default is positive sequence. */
  sequence?: SequenceEnum;

  /** LOADSHAPE object to use for the per-unit current for YEARLY-mode simulations. Set the Mult property of the LOADSHAPE to the pu curve. Qmult is not used. If UseActual=Yes then the Mult curve should be actual Amp.
   *
   * Must be previously defined as a LOADSHAPE object.
   *
   * Is set to the Daily load shape when Daily is defined.  The daily load shape is repeated in this case. Set to NONE to reset to no loadahape for Yearly mode. The default is no variation. */
  Yearly?: string;

  /** LOADSHAPE object to use for the per-unit current for DAILY-mode simulations. Set the Mult property of the LOADSHAPE to the pu curve. Qmult is not used. If UseActual=Yes then the Mult curve should be actual A.
   *
   * Must be previously defined as a LOADSHAPE object.
   *
   * Sets Yearly curve if it is not already defined.   Set to NONE to reset to no loadahape for Yearly mode. The default is no variation. */
  Daily?: string;

  /** LOADSHAPE object to use for the per-unit current for DUTYCYCLE-mode simulations. Set the Mult property of the LOADSHAPE to the pu curve. Qmult is not used. If UseActual=Yes then the Mult curve should be actual A.
   *
   * Must be previously defined as a LOADSHAPE object.
   *
   * Defaults to Daily load shape when Daily is defined.   Set to NONE to reset to no loadahape for Yearly mode. The default is no variation. */
  Duty?: string;

  /** Name of bus to which 2nd terminal is connected.
   *
   * bus2=busname
   *
   * bus2=busname.1.2.3
   *
   * Default is Bus1.0.0.0 (grounded-wye connection) */
  Bus2?: string;

  /** Harmonic spectrum assumed for this source.  Default is "default". */
  spectrum?: string;

  /** Base Frequency for ratings. */
  baseFreq?: number;

  /** {Yes|No or True|False} Indicates whether this element is enabled. */
  enabled?: boolean;

  constructor(options: IsourceInterface);
  constructor(name: string, options?: OmitName<IsourceInterface>);
  constructor(
    nameOrOptions: string | IsourceInterface,
    options?: OmitName<IsourceInterface>,
  ) {
    super(nameOrOptions);
    if (typeof nameOrOptions === "string") {
      Object.assign(this, options);
    } else {
      const { name, ...otherOptions } = nameOrOptions;
      Object.assign(this, otherOptions);
    }
  }
}
