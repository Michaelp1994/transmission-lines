import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from "typeorm";

// eslint-disable-next-line import/no-cycle
import TransmissionLine from "./TransmissionLine.model";

@Entity()
export default class TransmissionTower extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    resistance: number;

    @Column()
    distance: number;

    @Column()
    geometryId: number;

    @ManyToOne(() => TransmissionLine, (line) => line.conductors, {
        onDelete: "CASCADE",
    })
    transmissionLine: Relation<TransmissionLine>;
}
