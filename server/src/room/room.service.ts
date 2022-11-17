import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RoomEntity} from './room.entity';
import {getRepository, Repository} from 'typeorm';
import {CreateRoomDto} from './dtos/create-room.dto';
import {SearchRoomDto} from './dtos/search-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomRepository: Repository<RoomEntity>
    ) {
    }

    async createRoom(dto: CreateRoomDto): Promise<RoomEntity> {
        const newRoom = new RoomEntity();
        Object.assign(newRoom, dto);

        return this.roomRepository.save(newRoom);
    }

    async search(dto?: SearchRoomDto): Promise<RoomEntity[]> {
        const queryBuilder = getRepository(RoomEntity)
            .createQueryBuilder('room')
            .leftJoinAndSelect('room.rents', 'rents')

        if (dto) {
            if (dto.capacity) {
                queryBuilder.andWhere('room.capacity = :capacity', {capacity: dto.capacity})
            }

            if (dto.cost) {
                queryBuilder.andWhere('room.cost = :cost', {cost: dto.cost})
            }

            if (dto.comfort) {
                queryBuilder.andWhere('room.comfort = :comfort', {comfort: dto.comfort})
            }
        }

        if (dto.limit) {
            queryBuilder.limit(dto.limit)
        }

        if (dto.offset) {
            queryBuilder.offset(dto.offset)
        }

        return queryBuilder.getMany();
    }
}
