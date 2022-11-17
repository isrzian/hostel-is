import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class CreateRentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    checkIn: string;

    @IsNotEmpty()
    @IsString()
    checkOut: string;

    @IsNotEmpty()
    @IsNumber()
    discount: number;

    @IsNotEmpty()
    @IsNumber()
    cost: number;

    @IsNotEmpty()
    @IsNumber()
    clientId: number;

    @IsNotEmpty()
    @IsNumber()
    roomId: number;

    @IsNotEmpty()
    @IsString()
    bookedStartDate: string;

    @IsNotEmpty()
    @IsString()
    bookedEndDate: string;
}
