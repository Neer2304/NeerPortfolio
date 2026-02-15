import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type VisitorAnalytics = {
  _id: string;
  ip: string;
  country?: string;
  city?: string;
  region?: string;
  userAgent?: string;
  page?: string;
  createdAt: string;
  updatedAt: string;
};

export const visitorAnalyticsApi = createApi({
  reducerPath: "visitorAnalyticsApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api",
    // Add timeout and credentials if needed
    timeout: 10000,
  }),
  tagTypes: ["VisitorAnalytics"],
  endpoints: (builder) => ({
    createVisitorAnalytics: builder.mutation<
      VisitorAnalytics,
      Partial<{
        country: string;
        city: string;
        region: string;
        page: string;
      }>
    >({
      query: (body) => ({
        url: "/visitor-analytics",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["VisitorAnalytics"],
    }),

    getVisitorAnalytics: builder.query<VisitorAnalytics[], void>({
      query: () => "/visitor-analytics",
      providesTags: (result = []) => [
        "VisitorAnalytics",
        ...result.map(({ _id }) => ({ type: "VisitorAnalytics", id: _id } as const)),
      ],
    }),
  }),
});

export const {
  useCreateVisitorAnalyticsMutation,
  useGetVisitorAnalyticsQuery,
} = visitorAnalyticsApi;