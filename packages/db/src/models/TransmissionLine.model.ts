import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from "typeorm";

// eslint-disable-next-line import/no-cycle
import Project from "./Project.model";
import Source from "./Source.model";
import TransmissionConductor from "./TransmissionConductor";
// eslint-disable-next-line import/no-cycle
import TransmissionTower from "./TransmissionTower.model";

@Entity()
export default class TransmissionLine extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Project, (project) => project.sources, {
        cascade: true,
        onDelete: "CASCADE",
    })
    project: Relation<Project>;

    @Column("uuid")
    projectId: string;

    @ManyToOne(() => Source, {
        onDelete: "CASCADE",
    })
    fromSource: Relation<Source>;

    @Column("uuid")
    fromSourceId: string;

    @ManyToOne(() => Source, {
        onDelete: "CASCADE",
    })
    toSource: Relation<Source>;

    @Column("uuid")
    toSourceId: string;

    @OneToMany(
        () => TransmissionConductor,
        (conductor) => conductor.transmissionLine,
        {
            cascade: true,
        }
    )
    conductors: Relation<TransmissionConductor[]>;

    @OneToMany(() => TransmissionTower, (tower) => tower.transmissionLine, {
        cascade: true,
    })
    towers: Relation<TransmissionTower[]>;
}
