import { CreateConductorLocationInput } from "../schemas/ConductorLocation.schema";

export default function hasNoOverlappingConductors(
    conductors: CreateConductorLocationInput[]
): boolean {
    const uniqueConductors = conductors.filter((conductor, index) => {
        return (
            conductors.findIndex(
                (needle) => conductor.x === needle.x && conductor.y === needle.y
            ) === index
        );
    });
    return uniqueConductors.length === conductors.length;
}
