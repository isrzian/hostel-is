import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IClient} from '../../entities/IClient';

type ClientResponse = IClient[];

export const ClientApi = createApi({
    reducerPath: 'clientApi',
    tagTypes: ['Client'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/client'}),
    endpoints: (build) => ({
        getClients: build.query<ClientResponse, void>({
            query: () => `search`,
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'Client' as const, id })),
                    { type: 'Client', id: 'LIST' },
                ]
                : [{ type: 'Client', id: 'LIST' }],
        }),
        addClient: build.mutation<IClient, Partial<IClient>>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Client', id: 'LIST' }],
        })
    })
});

export const {
    useGetClientsQuery,
    useAddClientMutation,
} = ClientApi;
