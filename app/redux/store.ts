import { configureStore } from "@reduxjs/toolkit";
import { visitorApi } from "./Visitorapi";
import { contactApi } from "./Contactapi";
import { suggestionApi } from "./Suggestion"; // ✅ Add this

export const store = configureStore({
  reducer: {
    [visitorApi.reducerPath]: visitorApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [suggestionApi.reducerPath]: suggestionApi.reducer, // ✅ Add here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(visitorApi.middleware)
      .concat(contactApi.middleware)
      .concat(suggestionApi.middleware), // ✅ Add here
});
