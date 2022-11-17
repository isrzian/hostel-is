import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {ClientService} from './client.service';
import {SearchClientDto} from './dtos/search-client.dto';
import {CreateClientDto} from './dtos/create-client.dto';

@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
    ) {
    }

    @Post()
    async create(
        @Body() dto: CreateClientDto,
    ) {
        return this.clientService.createClient(dto);
    }

    @Get('/search')
    async search(
        @Query() dto: SearchClientDto,
    ) {
        return this.clientService.search(dto);
    }
}
