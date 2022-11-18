import {IRent} from './IRent';

export interface IRoom {
    id: number;
    capacity: number;
    comfort: string;
    cost: number;
    rents?: IRent[];
}
