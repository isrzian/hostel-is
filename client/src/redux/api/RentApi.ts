import {createApi} from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {IRent} from '../../entities/IRent';

type RentingResponse = IRent[];

export const RentApi = createApi({
    reducerPath: 'rentApi',
    tagTypes: ['Rent'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/renting'}),
    endpoints: (build) => ({
        getRents: build.query<RentingResponse, void>({
            query: () => ({
                url: 'search',
                method: 'GET',
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Rent' as const, id })),
                    { type: 'Rent', id: 'LIST' },
                ]
                : [{ type: 'Rent', id: 'LIST' }],
        }),
        addRent: build.mutation<IRent, Partial<IRent>>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Rent', id: 'LIST' }],
        }),
    })
})

export const {
    useAddRentMutation,
    useGetRentsQuery,
} = RentApi;
