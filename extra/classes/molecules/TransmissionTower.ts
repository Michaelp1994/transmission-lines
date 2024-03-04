import { Line, Reactor } from "@classes/elements";

interface TransmissionTowerInterface {
    line: Line;
    reactor: Reactor;
}
const NEUTRAL_PHASE = 20;

interface TransmissionTowerConstructor {
    name: string;
    bus1: string;
    bus1Phases: number[];
    bus2: string;
    bus2Phases: number[];
    phases: number;
    length: number;
    geometry: string;
    resistance: number;
}
/**   Circuit Element, PC Element  */
export default class TransmissionTower implements TransmissionTowerInterface {
    line: Line;

    reactor: Reactor;

    constructor(towerInput: TransmissionTowerConstructor) {
        this.line = new Line({
            name: `${towerInput.name}_line`,
            bus1: `${towerInput.bus1}.${towerInput.bus1Phases.join(".")}`,
            bus2: `${towerInput.bus2}.${towerInput.bus2Phases.join(".")}`,
            phases: towerInput.phases,
            length: towerInput.length,
            units: "km",
            geometry: towerInput.geometry,
        });
        this.reactor = new Reactor({
            name: `${towerInput.name}_RT`,
            bus1: `${towerInput.name}.${NEUTRAL_PHASE}`,
            bus2: `${towerInput.name}.0`,
            R: towerInput.resistance,
            X: 0,
            phases: 1,
        });
    }

    create() {
        const line = this.line.create();
        const reactor = this.reactor.create();
        return line.concat(reactor);
    }
}
