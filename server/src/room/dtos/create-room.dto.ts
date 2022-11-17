import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @IsNotEmpty()
    @IsString()
    comfort: string;

    @IsNotEmpty()
    @IsNumber()
    cost: number;
}
