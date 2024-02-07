import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    type Relation,
} from "typeorm";
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

    @ManyToOne(() => TransmissionLine, (line) => line.conductors)
    transmissionLine: Relation<TransmissionLine>;
}
