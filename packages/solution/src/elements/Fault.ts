import OpenDSSFault from "@repo/opendss-interface/classes/fault";
import { randomUUID } from "crypto";

import type { SourceID } from "@repo/validators/Ids";

export default class Fault {
    id: SourceID;
    fault: OpenDSSFault;

    constructor(location: string) {
        this.id = randomUUID();
        this.fault = new OpenDSSFault({
            name: "FAULT",
            bus1: {
                name: location,
                phases: [1],
            },
            bus2: {
                name: location,
                phases: [20],
            },
        });
    }

    create() {
        return this.fault.create();
    }
}
