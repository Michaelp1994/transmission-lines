import type TransmissionLineDB from "@repo/db/models/TransmissionLine.model";

import { Line } from "@classes/elements";

import TransmissionTower from "./TransmissionTower";

interface TransmissionLineInterface {
    towers: TransmissionTower[];
}

const NEUTRAL_PHASE = 20;

/**   Circuit Element, PC Element  */
export default class TransmissionLine implements TransmissionLineInterface {
    towers: TransmissionTower[] = [];

    lastLine!: Line;

    constructor(line: TransmissionLineDB) {
        const numConductors = line.conductors.length;
        const fromPhases = line.conductors.map((transmissionLine) =>
            transmissionLine.isNeutral
                ? NEUTRAL_PHASE
                : transmissionLine.fromPhase
        );
        const intermediatePhases = line.conductors.map(
            (transmissionLine, index) =>
                transmissionLine.isNeutral ? NEUTRAL_PHASE : index + 1
        );
        const toPhases = line.conductors.map((transmissionLine) =>
            transmissionLine.isNeutral
                ? NEUTRAL_PHASE
                : transmissionLine.toPhase
        );

        line.towers.forEach((tower, index, towers) => {
            const name = `${line.name}_${tower.name}`;
            if (index === 0) {
                const transmissionTower = new TransmissionTower({
                    name,
                    bus1: `B_${line.fromSource.name}`,
                    bus1Phases: fromPhases,
                    bus2: name,
                    bus2Phases: intermediatePhases,
                    phases: numConductors,
                    length: tower.distance,
                    geometry: `${line.name}_${tower.geometry.name}`,
                    resistance: tower.resistance,
                });
                this.towers.push(transmissionTower);
            } else {
                const prevName = towers[index - 1]?.name;
                if (!prevName) throw Error("can't find previous tower!");
                const bus1Name = `${line.name}_${prevName}`;

                const transmissionTower = new TransmissionTower({
                    name,
                    bus1: bus1Name,
                    bus1Phases: intermediatePhases,
                    bus2: name,
                    bus2Phases: intermediatePhases,
                    phases: numConductors,
                    length: tower.distance,
                    geometry: `${line.name}_${tower.geometry.name}`,
                    resistance: tower.resistance,
                });

                this.towers.push(transmissionTower);

                if (index === line.towers.length - 1) {
                    const lastLineObject = new Line({
                        name: `${name}_extra_span`,
                        bus1: `${name}.${intermediatePhases.join(".")}`,
                        bus2: `B_${line.toSource.name}.${toPhases.join(".")}`,
                        length: tower.distance, // FIXME: This is wrong, assuming the last line to substation is same as previous
                        phases: numConductors,
                        units: "km",
                        geometry: `${line.name}_${tower.geometry.name}`,
                    });
                    this.lastLine = lastLineObject;
                }
            }
        });
    }

    create() {
        this.towers.forEach((tower) => {
            tower.create();
        });
        const commands = this.towers.flatMap((tower) => tower.create());
        return commands.concat(this.lastLine?.create());
    }
}
