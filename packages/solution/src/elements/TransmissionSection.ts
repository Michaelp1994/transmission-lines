import Line from "@repo/opendss-interface/classes/line";
import type { TowerID } from "@repo/validators/Ids";
import type TransmissionTower from "./TransmissionTower";

interface TransmissionLineSectionInput {
    // fromTower: TowerID;
    fromTower: TransmissionTower;
    toTower: TowerID;
    busName: string;
    name: string;
    t
}

export default class TransmissionLineSection {
    fromTowerId: TowerID;
    toTowerId: TowerID;
    line: Line;

    constructor(input: TransmissionLineSectionInput) {
        this.id = input.id;
        this.line = new Line({
            name: `${name}_line`,
            bus1: {
                name: ,
                phases: middlePhases,
            },
            bus2: {
                name: `B_${name}`,
                phases: middlePhases,
            },
            length: tower.distance,
            phases: numConductors,
            units: "km",
            geometry: `${input.name}_${tower.geometry.name}`,
        });
    }

    create() {
        return this.line.create();
    }
}
