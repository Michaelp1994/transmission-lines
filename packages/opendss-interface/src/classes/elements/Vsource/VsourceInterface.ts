import { ModelEnum, ScanTypeEnum, SequenceEnum } from "@enums/enums";
import { BaseElementInterface } from "@elements/BaseElements";

/**   Circuit Element, PC Element  */
export default interface VsourceInterface extends BaseElementInterface {
  /** Name of the component */
  name: string;
  /**
   *@inheritdoc Models.Vsource#bus1
   */
  bus1?: string;
  /**
   *@inheritdoc Models.Vsource#basekv
   */
  basekv?: number;
  /**
   *@inheritdoc Models.Vsource#pu
   */
  pu?: number;
  /**
   *@inheritdoc Models.Vsource#angle
   */
  angle?: number;
  /**
   *@inheritdoc Models.Vsource#frequency
   */
  frequency?: number;
  /**
   *@inheritdoc Models.Vsource#phases
   */
  phases?: number;
  /**
   *@inheritdoc Models.Vsource#MVAsc3
   */
  MVAsc3?: number;
  /**
   *@inheritdoc Models.Vsource#MVAsc1
   */
  MVAsc1?: number;
  /**
   *@inheritdoc Models.Vsource#x1r1
   */
  x1r1?: number;
  /**
   *@inheritdoc Models.Vsource#x0r0
   */
  x0r0?: number;
  /**
   *@inheritdoc Models.Vsource#Isc3
   */
  Isc3?: number;
  /**
   *@inheritdoc Models.Vsource#Isc1
   */
  Isc1?: number;
  /**
   *@inheritdoc Models.Vsource#R1
   */
  R1?: number;
  /**
   *@inheritdoc Models.Vsource#X1
   */
  X1?: number;
  /**
   *@inheritdoc Models.Vsource#R0
   */
  R0?: number;
  /**
   *@inheritdoc Models.Vsource#X0
   */
  X0?: number;
  /**
   *@inheritdoc Models.Vsource#ScanType
   */
  ScanType?: ScanTypeEnum;
  /**
   *@inheritdoc Models.Vsource#Sequence
   */
  Sequence?: SequenceEnum;
  /**
   *@inheritdoc Models.Vsource#bus2
   */
  bus2?: string;
  /**
   *@inheritdoc Models.Vsource#Z1
   */
  Z1?: number[];
  /**
   *@inheritdoc Models.Vsource#Z0
   */
  Z0?: number[];
  /**
   *@inheritdoc Models.Vsource#Z2
   */
  Z2?: number[];
  /**
   *@inheritdoc Models.Vsource#puZ1
   */
  puZ1?: number[];
  /**
   *@inheritdoc Models.Vsource#puZ0
   */
  puZ0?: number[];
  /**
   *@inheritdoc Models.Vsource#puZ2
   */
  puZ2?: number[];
  /**
   *@inheritdoc Models.Vsource#baseMVA
   */
  baseMVA?: number;
  /**
   *@inheritdoc Models.Vsource#Yearly
   */
  Yearly?: string;
  /**
   *@inheritdoc Models.Vsource#Daily
   */
  Daily?: string;
  /**
   *@inheritdoc Models.Vsource#Duty
   */
  Duty?: string;
  /**
   *@inheritdoc Models.Vsource#Model
   */
  Model?: ModelEnum;
  /**
   *@inheritdoc Models.Vsource#puZideal
   */
  puZideal?: number[];
  /**
   *@inheritdoc Models.Vsource#spectrum
   */
  spectrum?: string;
  /**
   *@inheritdoc Models.Vsource#baseFreq
   */
  baseFreq?: number;
  /**
   *@inheritdoc Models.Vsource#enabled
   */
  enabled?: boolean;
}
