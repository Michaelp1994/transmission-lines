import type { SourceID } from "@repo/validators/Ids";

import OpenDSSFault from "@repo/opendss-interface/classes/fault";
import { randomUUID } from "crypto";

export default class Fault {
    fault: OpenDSSFault;
    id: SourceID;

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

    setBus(bus: string) {
        this.fault.parameters.bus1.name = bus;
        this.fault.parameters.bus2.name = bus;
    }
}
