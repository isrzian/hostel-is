import {Body, Controller, Get, Post, Query, Put, Param} from '@nestjs/common';
import {RentingService} from './renting.service';
import {CreateRentDto} from './dtos/create-rent.dto';
import {SearchRentDto} from './dtos/search-rent.dto';

@Controller('renting')
export class RentingController {
    constructor(
        private readonly rentingService: RentingService,
    ) {
    }

    @Post()
    async create(
        @Body() dto: CreateRentDto,
    ) {
        return this.rentingService.createRent(dto);
    }

    @Get('/search')
    async search(
        @Query() dto: SearchRentDto,
    ) {
        return this.rentingService.search(dto);
    }
}
