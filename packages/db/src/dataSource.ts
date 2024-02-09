import { DataSource } from "typeorm";
import ConductorLocation from "./models/ConductorLocation.model";
import ConductorType from "./models/ConductorType.model";
import TowerGeometry from "./models/TowerGeometry.model";
import TransmissionConductor from "./models/TransmissionConductor";
import Source from "./models/Source.model";
import TransmissionTower from "./models/TransmissionTower.model";
import TransmissionLine from "./models/TransmissionLine.model";

import InitialMigration1703610359462 from "./migrations/1703610359462-initialMigration";
import SeedDatabase1703629418838 from "./migrations/1703629418838-seedDatabase";

async function databaseInit(path: string) {
    const mainDb = await new DataSource({
        type: "better-sqlite3",
        database: path,
        // synchronize: true,
        logging: ["error", "warn"],
        entities: [ConductorLocation, ConductorType, TowerGeometry],
        migrations: [InitialMigration1703610359462, SeedDatabase1703629418838],
    }).initialize();

    const memoryDb = await new DataSource({
        type: "better-sqlite3",
        database: ":memory:",
        synchronize: true,
        logging: ["error", "warn"],
        entities: [
            TransmissionLine,
            TransmissionTower,
            TransmissionConductor,
            Source,
        ],
    }).initialize();

    console.log("dataSources initialized");
    return { mainDb, memoryDb };
}

export type DBContext = Awaited<ReturnType<typeof databaseInit>>;

export default databaseInit;
