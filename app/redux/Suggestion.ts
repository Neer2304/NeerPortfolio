// redux/SuggestionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const suggestionApi = createApi({
  reducerPath: "suggestionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    addSuggestion: builder.mutation({
      query: (message: string) => ({
        url: "suggestion",
        method: "POST",
        body: { message },
      }),
    }),
    getSuggestions: builder.query({
      query: () => "suggestion",
    }),
  }),
});

export const { useAddSuggestionMutation, useGetSuggestionsQuery } = suggestionApi;
