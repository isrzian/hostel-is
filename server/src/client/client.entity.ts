import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RentingEntity} from '../renting/renting.entity';

@Entity('client')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    surname: string;

    @Column()
    name: string;

    @Column()
    patronymic: string;

    @Column()
    address: string;

    @Column()
    passportSeries: string;

    @Column()
    passportNumber: string;

    @Column()
    comment: string;

    @OneToMany(
        () => RentingEntity,
        (rent) => rent.client,
    )
    rents: RentingEntity[];
}
