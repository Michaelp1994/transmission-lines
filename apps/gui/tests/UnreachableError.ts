/*** Code that can't be reached. Use this to help typescript. */
// eslint-disable-next-line fp/no-class
export default class UnreachableError extends Error {
    constructor(msg?: string) {
        super(msg || "Unreachable code path");
    }
}

// export default function UnreachableError(msg?: string): Error {
//     return new Error(msg || "Unreachable code path");
// }
