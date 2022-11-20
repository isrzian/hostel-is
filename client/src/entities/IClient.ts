import {IRent} from './IRent';

export interface IClient {
    id?: number;
    surname: string;
    name: string;
    patronymic: string;
    address: string;
    passportSeries: string;
    passportNumber: string;
    comment: string;
    rents?: IRent[];
}
