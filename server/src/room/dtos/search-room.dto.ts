import {IsString, IsNumber, IsNotEmpty} from 'class-validator';
import {QueryInterface} from '../../interfaces/QueryInterface';

export class SearchRoomDto extends QueryInterface {
    @IsNumber()
    capacity?: number;

    @IsString()
    comfort?: string;

    @IsNumber()
    cost?: number;
}
