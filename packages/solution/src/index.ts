import type { Project } from "@repo/db/controllers/project";

import createCircuit from "./createCircuit";

export default function solveProject(project: Project, busName: string) {
    const circuit = createCircuit(project, busName);
    circuit.solve();
    const currents = circuit.getAllCurrents();
    const script = circuit.getScript();
    return {
        ...currents,
        script,
    };
}

export type Solution = ReturnType<typeof solveProject>;
