import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from "typeorm";

// eslint-disable-next-line import/no-cycle
import Project from "./Project.model";

@Entity()
export default class Source extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    phases: number;

    @Column()
    voltage: number;

    @Column()
    x1r1: number;

    @Column()
    x0r0: number;

    @Column()
    isc3: number;

    @Column()
    isc1: number;

    @Column()
    resistance: number;

    @Column()
    frequency: number;

    @ManyToOne(() => Project, (project) => project.sources, {
        cascade: true,
        onDelete: "CASCADE",
    })
    project: Relation<Project>;

    @Column("uuid")
    projectId: string;
}
