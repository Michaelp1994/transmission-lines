import { MigrationInterface, QueryRunner } from "typeorm";

export default class InitialMigration1703610359462
    implements MigrationInterface
{
    name = "InitialMigration1703610359462";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "tower_geometry" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "conductor_location" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "x" real NOT NULL, "y" real NOT NULL, "geometryId" integer)`
        );
        await queryRunner.query(
            `CREATE TABLE "conductor_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "surfaceArea" real, "stranding" real, "outerDiameter" real, "coreDiameter" real, "layers" real, "currentCapacity" real, "dcResistance25" real, "acResistance25" real, "acResistance50" real, "acResistance75" real, "gmr" real)`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_conductor_location" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "x" real NOT NULL, "y" real NOT NULL, "geometryId" integer, CONSTRAINT "FK_db46e07fddae47b3162a3c43559" FOREIGN KEY ("geometryId") REFERENCES "tower_geometry" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_conductor_location"("id", "x", "y", "geometryId") SELECT "id", "x", "y", "geometryId" FROM "conductor_location"`
        );
        await queryRunner.query(`DROP TABLE "conductor_location"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_conductor_location" RENAME TO "conductor_location"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "conductor_location" RENAME TO "temporary_conductor_location"`
        );
        await queryRunner.query(
            `CREATE TABLE "conductor_location" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "x" real NOT NULL, "y" real NOT NULL, "geometryId" integer)`
        );
        await queryRunner.query(
            `INSERT INTO "conductor_location"("id", "x", "y", "geometryId") SELECT "id", "x", "y", "geometryId" FROM "temporary_conductor_location"`
        );
        await queryRunner.query(`DROP TABLE "temporary_conductor_location"`);
        await queryRunner.query(`DROP TABLE "conductor_type"`);
        await queryRunner.query(`DROP TABLE "conductor_location"`);
        await queryRunner.query(`DROP TABLE "tower_geometry"`);
    }
}
