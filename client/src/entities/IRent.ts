import {IClient} from './IClient';
import {IRoom} from './IRoom';

export interface IRent {
    id: number;
    checkIn: string;
    name: string;
    checkOut: string;
    discount: number;
    cost: number;
    clientId: number;
    roomId: number;
    bookedStartDate: string;
    bookedEndDate: string;
    room?: IRoom;
    client?: IClient;
}
