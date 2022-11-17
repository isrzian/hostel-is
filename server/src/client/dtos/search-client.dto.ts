import {IsString} from 'class-validator';
import {QueryInterface} from '../../interfaces/QueryInterface';

export class SearchClientDto extends QueryInterface {
    @IsString()
    surname?: string;

    @IsString()
    name?: string;

    @IsString()
    patronymic?: string;

    @IsString()
    passportSeries?: string;

    @IsString()
    passportNumber?: string;
}
