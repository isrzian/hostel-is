import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IRoom} from '../../entities/IRoom';

type RoomResponse = IRoom[];

export const RoomApi = createApi({
    reducerPath: 'roomApi',
    tagTypes: ['Room'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/room'}),
    endpoints: (build) => ({
        getRooms: build.query<RoomResponse, void>({
            query: () => `search`,
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Room' as const, id })),
                    { type: 'Room', id: 'LIST' },
                ]
                : [{ type: 'Room', id: 'LIST' }],
        }),
        addRoom: build.mutation<IRoom, Partial<IRoom>>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Room', id: 'LIST' }],
        })
    })
});

export const {
    useGetRoomsQuery,
    useAddRoomMutation,
} = RoomApi;
