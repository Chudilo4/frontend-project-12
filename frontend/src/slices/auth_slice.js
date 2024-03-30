import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {LocalRoute} from '../routes'

export const AuthenticatedApi = createApi({
  reducerPath: 'authenticated',
  baseQuery: fetchBaseQuery({ baseUrl: LocalRoute.loginApi }),
  endpoints: (builder) => ({
    addToken: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const {
  useAddToken,
} = AuthenticatedApi;