import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {RoomEntity} from '../room/room.entity';
import {ClientEntity} from '../client/client.entity';

@Entity('rents')
export class RentingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    checkIn: string;

    @Column()
    name: string;

    @Column({type: 'date'})
    checkOut: string;

    @Column()
    discount: number;

    @Column()
    cost: number;

    @Column()
    clientId: number;

    @Column()
    roomId: number;

    @Column({type: 'date'})
    bookedStartDate: string;

    @Column({type: 'date'})
    bookedEndDate: string;

    @ManyToOne(
        () => RoomEntity,
        (room) => room.rents,
    )
    room: RoomEntity;

    @ManyToOne(
        () => ClientEntity,
        (client) => client.rents,
    )
    client: ClientEntity;
}
