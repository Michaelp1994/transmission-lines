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
export default class TransmissionConductor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    fromPhase: number;

    @Column()
    toPhase: number;

    @Column()
    bundleNumber: number;

    @Column()
    bundleSpacing: number;

    @Column()
    isNeutral: boolean;

    @Column()
    typeId: number;

    @ManyToOne(() => TransmissionLine, (line) => line.conductors)
    transmissionLine: Relation<TransmissionLine>;
}
