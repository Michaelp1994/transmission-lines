// import { BaseElementInterface } from "@elements/BaseElements";
import BaseElement from "./BaseElement";

export default abstract class GeneralComponent extends BaseElement {
  _editable = false as const;

  // constructor(nameOrOptions: string | BaseElementInterface) {
  //   super(nameOrOptions);
  // }
}
