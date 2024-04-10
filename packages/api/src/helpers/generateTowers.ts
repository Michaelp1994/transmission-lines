import type { GenerateTowersInput } from "@repo/validators/schemas/GenerateTowers.schema";
import type { CreateTransmissionTowerInput } from "@repo/validators/schemas/TransmissionTower.schema";

export default function generateTowers(
    values: GenerateTowersInput
): CreateTransmissionTowerInput[] {
    const avgDistance = values.distance / values.numTowers;
    const newTowers: CreateTransmissionTowerInput[] = Array(values.numTowers)
        .fill(0)
        .map((_, index) => ({
            name: values.namePrefix + (index + 1),
            resistance: values.resistance,
            distance: avgDistance,
            geometryId: values.geometryId,
            lineId: values.lineId,
        }));
    return newTowers;
}
