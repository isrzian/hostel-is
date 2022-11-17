import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {RoomService} from './room.service';
import {CreateRoomDto} from './dtos/create-room.dto';
import {SearchRoomDto} from './dtos/search-room.dto';

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
    ) {
    }

    @Post()
    async create(
        @Body() dto: CreateRoomDto,
    ) {
        return this.roomService.createRoom(dto);
    }

    @Get('/search')
    async search(
        @Query() dto: SearchRoomDto,
    ) {
        return this.roomService.search(dto);
    }
}
