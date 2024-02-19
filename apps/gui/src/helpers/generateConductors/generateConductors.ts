import type { CreateConductorInput } from "@repo/validators/schemas/Conductor.schema";
import type { GenerateConductorsInput } from "@repo/validators/schemas/GenerateConductors.schema";

export default function generateConductors(
    values: GenerateConductorsInput
): CreateConductorInput[] {
    const newConductors: CreateConductorInput[] = [];
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
