import {IsNumber, IsString} from 'class-validator';
import {QueryInterface} from '../../interfaces/QueryInterface';

export class SearchRentDto extends QueryInterface {
    @IsString()
    name?: string;

    @IsString()
    checkIn?: string;

    @IsString()
    checkOut?: string;

    @IsNumber()
    clientId?: number;

    @IsNumber()
    roomId?: number;

    @IsString()
    bookedStartDate?: string;

    @IsString()
    bookedEndDate?: string;
}
