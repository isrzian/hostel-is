import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {getRepository, Repository} from 'typeorm';
import {RentingEntity} from './renting.entity';
import {CreateRentDto} from './dtos/create-rent.dto';
import {SearchRentDto} from './dtos/search-rent.dto';

@Injectable()
export class RentingService {
    constructor(
        @InjectRepository(RentingEntity)
        private readonly rentingRepository: Repository<RentingEntity>
    ) {
    }

    async createRent(dto: CreateRentDto): Promise<RentingEntity> {
        const rent = await this.rentingRepository.findOne({name: dto.name})

        if (new Date(dto.checkIn) > new Date(rent.bookedStartDate) && new Date(dto.checkIn) < new Date(rent.bookedEndDate)) {
            throw new HttpException(
                'На эту дату уже забронирован этот номер!',
                HttpStatus.BAD_REQUEST,
            );
        }

        const newRent = new RentingEntity();
        Object.assign(newRent, dto);

        return this.rentingRepository.save(newRent);
    }

    async search(dto?: SearchRentDto): Promise<RentingEntity[]> {
        const queryBuilder = getRepository(RentingEntity)
            .createQueryBuilder('renting')
            .leftJoinAndSelect('renting.room', 'room')
            .leftJoinAndSelect('renting.client', 'client')

        if (dto) {
            if (dto.name) {
                queryBuilder.andWhere('renting.name = :name', {name: dto.name})
            }

            if (dto.checkIn) {
                queryBuilder.andWhere('renting.checkIn ::date = :checkIn ::date', {checkIn: dto.checkIn})
            }

            if (dto.checkOut) {
                queryBuilder.andWhere('renting.checkOut ::date = :checkOut ::date', {checkOut: dto.checkOut})
            }

            if (dto.clientId) {
                queryBuilder.andWhere('renting.clientId = :clientId', {clientId: dto.clientId})
            }

            if (dto.roomId) {
                queryBuilder.andWhere('renting.roomId = :roomId', {roomId: dto.roomId})
            }

            if (dto.bookedStartDate) {
                queryBuilder.andWhere('renting.bookedStartDate ::date = :bookedStartDate ::date', {bookedStartDate: dto.bookedStartDate})
            }

            if (dto.bookedEndDate) {
                queryBuilder.andWhere('renting.bookedEndDate ::date = :bookedEndDate', {bookedEndDate: dto.bookedEndDate})
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
