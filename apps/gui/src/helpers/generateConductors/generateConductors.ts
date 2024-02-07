import type { GenerateConductorsInput } from "@repo/validators/schemas/GenerateConductors.schema";
import type { ConductorInput } from "@repo/validators/schemas/Conductor.schema";

export default function generateConductors(
    values: GenerateConductorsInput
): ConductorInput[] {
    const newConductors: ConductorInput[] = [];
    for (let i = 0; i < values.circuits; i += 1) {
        for (let j = 0; j < values.phases; j += 1) {
            newConductors.push({
                name: `${String.fromCharCode(65 + j)}${i + 1}`,
                fromPhase: j + 1,
                toPhase: j + 1,
                bundleNumber: 1,
                isNeutral: false,
                bundleSpacing: 0,
                typeId: values.phaseConductorTypeId,
            });
        }
    }
    for (let i = 0; i < values.neutrals; i += 1) {
        newConductors.push({
            name: `N${i + 1}`,
            fromPhase: 99,
            toPhase: 99,
            isNeutral: true,
            bundleNumber: 1,
            bundleSpacing: 0,
            typeId: values.neutralConductorTypeId,
        });
    }
    return newConductors;
}
