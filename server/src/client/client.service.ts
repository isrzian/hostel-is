import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {getRepository, Repository} from 'typeorm';
import {ClientEntity} from './client.entity';
import {CreateClientDto} from './dtos/create-client.dto';
import {SearchClientDto} from './dtos/search-client.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>
    ) {
    }

    async createClient(dto: CreateClientDto): Promise<ClientEntity> {
        const passport = await this.clientRepository.findOne({
            passportSeries: dto.passportSeries,
            passportNumber: dto.passportNumber,
        });

        if (passport) {
            throw new HttpException(
                'Клиент с такими паспортными данными уже существует!',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const newClient = new ClientEntity();
        Object.assign(newClient, dto);

        return this.clientRepository.save(newClient);
    }

    async search(dto?: SearchClientDto): Promise<ClientEntity[]> {
        const queryBuilder = getRepository(ClientEntity)
            .createQueryBuilder('сlient')
            .leftJoinAndSelect('сlient.rents', 'rents')

        if (dto) {
            if (dto.surname) {
                queryBuilder.andWhere('сlient.surname = :surname', {surname: dto.surname})
            }

            if (dto.name) {
                queryBuilder.andWhere('сlient.name = :name', {name: dto.name})
            }

            if (dto.patronymic) {
                queryBuilder.andWhere('сlient.patronymic = :patronymic', {patronymic: dto.patronymic})
            }

            if (dto.passportSeries) {
                queryBuilder.andWhere('сlient.passportSeries = :passportSeries', {passportSeries: dto.passportSeries})
            }

            if (dto.passportNumber) {
                queryBuilder.andWhere('сlient.passportNumber = :passportNumber', {passportNumber: dto.passportNumber})
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
