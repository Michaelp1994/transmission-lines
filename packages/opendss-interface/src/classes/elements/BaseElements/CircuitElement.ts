// import { BaseElementInterface } from "@elements/BaseElements";
import BaseElement from "./BaseElement";

export default abstract class CircuitElement extends BaseElement {
  _editable = true as const;
}
