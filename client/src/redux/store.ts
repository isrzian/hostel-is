import {configureStore} from '@reduxjs/toolkit'
import {RoomApi, ClientApi, RentApi} from './api'

export const store = configureStore({
    reducer: {
        [ClientApi.reducerPath]: ClientApi.reducer,
        [RoomApi.reducerPath]: RoomApi.reducer,
        [RentApi.reducerPath]: RentApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        ClientApi.middleware,
        RoomApi.middleware,
        RentApi.middleware,
    )
})
