import type SourceDB from "@repo/db/models/Source.model";

import { Circuit, Reactor, Vsource } from "@classes/elements";

interface SourceInterface {
    source: Vsource;
    reactor: Reactor;
}

/**   Circuit Element, PC Element  */
export default class Source implements SourceInterface {
    source: Vsource | Circuit;

    reactor: Reactor;

    constructor(sourceInput: SourceDB, isCircuit: boolean = false) {
        if (isCircuit) {
            this.source = new Circuit({
                name: sourceInput.name,
                bus1: `B_${sourceInput.name}`,
                phases: sourceInput.phases,
                basekv: sourceInput.voltage,
                x1r1: sourceInput.x1r1,
                Isc1: sourceInput.isc1,
                Isc3: sourceInput.isc3,
                x0r0: sourceInput.x0r0,
            });
        } else {
            this.source = new Vsource({
                name: sourceInput.name,
                bus1: `B_${sourceInput.name}`,
                phases: sourceInput.phases,
                basekv: sourceInput.voltage,
                x1r1: sourceInput.x1r1,
                Isc1: sourceInput.isc1,
                Isc3: sourceInput.isc3,
                x0r0: sourceInput.x0r0,
            });
        }

        this.reactor = new Reactor({
            name: `${sourceInput.name}_RT`,
            bus1: `B_${sourceInput.name}.20`,
            bus2: `B_${sourceInput.name}.0`,
            R: sourceInput.resistance,
            X: 0,
            phases: 1,
        });
    }

    create() {
        const source = this.source.create();
        const reactor = this.reactor.create();
        return source.concat(reactor);
    }
}
