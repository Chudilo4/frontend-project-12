import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/messages' }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      keepUnusedDataFor: 5
    }),
    changeMessageById: builder.mutation({
      query: (id, changeMsg) => ({
        url: id,
        method: 'PATCH',
        body: changeMsg,
      }),
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useChangeMessageById ,
  useAddMessage,
  useRemoveMessage
} = messagesApi;