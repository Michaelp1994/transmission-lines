import type Circuit from "@repo/opendss-interface/Circuit";

import Fault from "@repo/opendss-interface/elements/Fault";

export default function faultCurrents(circuit: Circuit) {
    const fault = new Fault({
        name: "FAULT",
        phases: 1,
        bus1: {
            name: "bus1",
            phases: [1],
        },
        bus2: {
            name: "bus1",
            phases: [1],
        },
    });
    circuit.add(fault);
    circuit.driver.clear();
    try {
        circuit.build();
    } catch (e) {
        console.error(e);
    }
}
