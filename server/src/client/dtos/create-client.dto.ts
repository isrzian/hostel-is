import {IsNotEmpty, IsString} from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    patronymic: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    passportSeries: string;

    @IsNotEmpty()
    @IsString()
    passportNumber: string;

    @IsNotEmpty()
    @IsString()
    comment: string;
}
