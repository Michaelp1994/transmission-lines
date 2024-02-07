import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import type { Relation } from "typeorm";
import TowerGeometry from "./TowerGeometry.model";

@Entity()
export default class ConductorLocation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("real")
    x: number;

    @Column("real")
    y: number;

    @ManyToOne(
        () => TowerGeometry,
        (towerGeometery) => towerGeometery.conductors
    )
    geometry: Relation<TowerGeometry>;
}
