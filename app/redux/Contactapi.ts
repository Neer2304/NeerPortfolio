import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ContactResponse = {
  message: string;
};

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      ContactResponse, // ✅ use your type instead of any
      { name: string; email: string; message: string }
    >({
      query: (body) => ({
        url: '/contact',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = contactApi;
