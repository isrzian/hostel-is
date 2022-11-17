import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {RentingEntity} from '../renting/renting.entity';

@Entity('room')
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    capacity: number;

    @Column()
    comfort: string;

    @Column()
    cost: number;

    @OneToMany(
        () => RentingEntity,
        (renting) => renting.room,
    )
    rents: RentingEntity[];
}
