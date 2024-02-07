import { UnitsEnum } from "@enums/enums";
import { BaseElementInterface } from "@elements/BaseElements";

/**   General  */
export default interface LineSpacingInterface extends BaseElementInterface {
  /** Number of wires in this geometry. Default is 3. Triggers memory allocations. Define first! */
  nConds?: number;

  /** Number of retained phase conductors. If less than the number of wires, list the retained phase coordinates first. */
  nPhases?: number;

  /** Array of wire X coordinates. */
  x?: number[];

  /** Array of wire Heights. */
  h?: number[];

  /** Units for x and h: {mi|kft|km|m|Ft|in|cm } Initial default is "ft", but defaults to last unit defined */
  units?: UnitsEnum;
}
