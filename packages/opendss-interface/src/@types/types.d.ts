// type FunctionPropertyNames<T> = {
//   [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
// }[keyof T];

// type OmitFunctions<T, K> = Omit<Omit<T, K>, FunctionPropertyNames<T>>;

type ObjectValues<T> = T[keyof T];

type OmitName<T> = Omit<T, "name">;

type AllRequired<T> = {
  [P in keyof T]-?: T[P];
};

type AllKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]: any;
};

type HasKeys<T> = AllKeys<Required<T>>;

declare module "winax" {
  type WinaxOptions = {
    activate: boolean;
    getobject: boolean;
    type: boolean;
  };
  class Object extends OpenDSSengine.DSS {
    constructor(value: "OpenDSSengine.DSS", options?: WinaxOptions);
  }
}
