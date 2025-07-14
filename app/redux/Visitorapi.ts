import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ✅ Define the type
export type Visitor = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export const visitorApi = createApi({
  reducerPath: 'visitorApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Visitor'],
  endpoints: (builder) => ({
    createVisitor: builder.mutation<Visitor, void>({
      query: () => ({
        url: '/visitor',
        method: 'POST',
      }),
      invalidatesTags: ['Visitor'],
    }),

    getVisitors: builder.query<Visitor[], void>({
      query: () => '/visitor',
      providesTags: ['Visitor'],
    }),
  }),
});

export const {
  useCreateVisitorMutation,
  useGetVisitorsQuery,
} = visitorApi;
