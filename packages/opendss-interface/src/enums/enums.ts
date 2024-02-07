export type MonitorActionEnum = "Clear" | "Save" | "Take" | "Process";
export type EnergyMeterActionEnum =
  | "Clear (reset)"
  | "Save"
  | "Take"
  | "Zonedump"
  | "Allocate"
  | "Reduce";
export type ActionEnum = "DblSave" | "SngSave";
export type LoadShapeActionEnum = "NORMALIZE" | "DblSave" | "SngSave";
export type SwtControlActionEnum = "Open" | "Close";
export type CombiModeEnum = "VV_VW" | "VV_DRC";

export type AutoTransConnEnum = "Series" | "wye" | "Delta" | "LN" | "LL";
export type ConnEnum = "wye" | "delta" | "LN" | "LL";

export type ControlModeEnum = "GFM" | "GFL";
export type CoreEnum =
  | "Shell"
  | "5-leg"
  | "3-Leg"
  | "1-phase"
  | "core-1-phase"
  | "4-leg";

export type CTPhaseEnum = "AVG" | "MAX" | "MIN";
export type DeltaDirectionEnum = "1" | "-1";
export type DispModeEnum =
  | "DEFAULT"
  | "FOLLOW"
  | "EXTERNAL"
  | "LOADLEVEL"
  | "PRICE";
export type DispmodeEnum = "Default" | "Loadlevel" | "Price";
export type EarthModelEnum = "Carson" | "FullCarson" | "Deri";
export type FuelkWhEnum = "0";
export type GMRunitsEnum =
  | "mi"
  | "kft"
  | "km"
  | "m"
  | "Ft"
  | "in"
  | "cm"
  | "mm";
export type LeadLagEnum = "Lead" | "Lag" | "ANSI" | "Euro";
export type ModeChargeEnum =
  | "Loadshape"
  | "Time"
  | "PeakShaveLow"
  | "I-PeakShaveLow";
export type ModeDischargeEnum =
  | "PeakShave"
  | "Follow"
  | "Support"
  | "Loadshape"
  | "Time"
  | "Schedule"
  | "I-PeakShave";
export type InvControlModeEnum =
  | "VOLTVAR"
  | "VOLTWATT"
  | "DYNAMICREACCURR"
  | "WATTPF"
  | "WATTVAR"
  | "GFM";
export type ModelEnum = "Thevenin" | "Ideal";
export type MonPhaseEnum = "AVG" | "MAX" | "MIN";
export type MonVoltageCalcEnum = "AVG" | "MAX" | "MIN";
export type NormalEnum = "Open" | "Closed";
export type PTphaseEnum = " MAX" | "MIN";
export type PTPhaseEnum = "AVG" | "MAX" | "MIN";
export type RadunitsEnum =
  | "mi"
  | "kft"
  | "km"
  | "m"
  | "Ft"
  | "in"
  | "cm"
  | "mm";
export type RateofChangeModeEnum = "INACTIVE" | "LPF" | "RISEFALL";
export type ScanTypeEnum = "pos" | "zero" | "none";
export type SequenceEnum = "pos" | "neg" | "zero";
export type SlipOptionEnum = "fixedslip" | "variableslip ";
export type StorageStateEnum = "idling" | "charging" | "discharging";
export type StateEnum = "Open" | "Closed";
export type StatesEnum = "1" | "0";
export type StatusEnum = "Fixed" | "Variable";
export type LoadStatusEnum = "Variable" | "Fixed" | "Exempt";
export type CapControlTypeEnum = "Current" | "voltage" | "kvar" | "PF" | "time";
export type TypeEnum = "GSU" | "Auto" | "YY";
export type UnitsEnum = "mi" | "kft" | "km" | "m" | "Ft" | "in" | "cm";
export type UnitsWithNoneEnum =
  | "none"
  | "mi"
  | "kft"
  | "km"
  | "m"
  | "Ft"
  | "in"
  | "cm";
export type UnitsWithMilliMeterEnum =
  | "mi"
  | "kft"
  | "km"
  | "m"
  | "Ft"
  | "in"
  | "cm"
  | "mm";
export type LineTypeEnum =
  | "OH"
  | "UG"
  | "UG_TS"
  | "UG_CN"
  | "SWT_LDBRK"
  | "SWT_FUSE"
  | "SWT_SECT"
  | "SWT_REC"
  | "SWT_DISC"
  | "SWT_BRK"
  | "SWT_ELBOW";
export type VoltageCurvexRefEnum = "rated" | "avg" | "ravg";
export type VoltwattYAxisEnum =
  | "PMPPPU"
  | "PAVAILABLEPU"
  | "PCTPMPPPU"
  | "KVARATINGPU";
export type CktModelEnum = "Multiphase" | "Positive";
export type ControlModeOptionEnum = "OFF" | "STATIC" | "EVENT" | "TIME";
export type LoadModelEnum = "Powerflow" | "Admittance";

export type LoadShapeClassEnum = "Daily" | "Yearly" | "Duty" | "None";
export type ModeEnum =
  | "Daily"
  | "Yearly DIrect"
  | "DUtycycle"
  | "Time"
  | " DYnamic"
  | " Harmonic"
  | "HarmonicT"
  | " M1"
  | " M2"
  | " M3"
  | " Faultstudy"
  | "MF"
  | " Peakday"
  | "LD1"
  | "LD2"
  | "AutoAdd"
  | "YearlyVQ"
  | "DutyVQ";

export type RandomEnum = "Uniform" | "Gaussian" | "Lognormal" | "None";
export type ReduceOptionEnum =
  | "Default"
  | "Shortlines"
  | "MergeParallel"
  | "BreakLoops"
  | "Switches"
  | "Ends"
  | "Laterals";
