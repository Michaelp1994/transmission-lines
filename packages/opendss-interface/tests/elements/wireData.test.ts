import { describe, expect, test } from "vitest";
import { WireData } from "@/classes";

describe("wireData components in OpenDSS", () => {
    test("create a basic WireData class", () => {
        const source = new WireData({
            name: "Esoura",
            diam: 44.75,
            radUnits: "mm",
            rac: 0.0338,
            rUnits: "km",
            rdc: 0.0265,
            gmrac: 17.92,
            gmrUnits: "mm",
        });
        const script = source.create();

        expect(script).toStrictEqual([
            "New WireData.Esoura rdc=0.0265 rac=0.0338 runits=km gmrac=17.92 gmrunits=mm radunits=mm diam=44.75",
        ]);
    });
});
