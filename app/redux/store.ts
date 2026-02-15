import { configureStore } from "@reduxjs/toolkit";
import { visitorApi } from "./Visitorapi";
import { contactApi } from "./Contactapi";
import { suggestionApi } from "./Suggestion"; // ✅ Add this
import { visitorAnalyticsApi } from "./VisitorAnalyticsApi";

export const store = configureStore({
  reducer: {
    [visitorApi.reducerPath]: visitorApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [suggestionApi.reducerPath]: suggestionApi.reducer, // ✅ Add here
    [visitorAnalyticsApi.reducerPath]: visitorAnalyticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(visitorApi.middleware)
      .concat(contactApi.middleware)
      .concat(suggestionApi.middleware) // ✅ Add here
      .concat(visitorAnalyticsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;