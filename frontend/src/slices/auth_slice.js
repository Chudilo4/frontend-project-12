import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import route from '../routes'

export const AuthenticatedApi = createApi({
  reducerPath: 'authenticated',
  baseQuery: fetchBaseQuery({ baseUrl: route.loginApi }),
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