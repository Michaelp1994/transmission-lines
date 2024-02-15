import { DataSource } from "typeorm";

import InitialMigration1703610359462 from "./migrations/1703610359462-initialMigration";
import SeedDatabase1703629418838 from "./migrations/1703629418838-seedDatabase";
import ConductorLocation from "./models/ConductorLocation.model";
import ConductorType from "./models/ConductorType.model";
import Project from "./models/Project.model";
import Source from "./models/Source.model";
import TowerGeometry from "./models/TowerGeometry.model";
import TransmissionConductor from "./models/TransmissionConductor";
import TransmissionLine from "./models/TransmissionLine.model";
import TransmissionTower from "./models/TransmissionTower.model";

async function databaseInit(path: string) {
    const dataSource = await new DataSource({
        type: "better-sqlite3",
        database: path,
        synchronize: true,
        logging: ["error", "warn"],
        entities: [
            TransmissionLine,
            TransmissionTower,
            TransmissionConductor,
            Source,
            Project,
            ConductorLocation,
            ConductorType,
            TowerGeometry,
        ],
        migrations: [InitialMigration1703610359462, SeedDatabase1703629418838],
    }).initialize();

    console.log("dataSource initialized");
    return dataSource;
}

export type DBContext = Awaited<ReturnType<typeof databaseInit>>;

export default databaseInit;
