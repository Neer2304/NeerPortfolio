"use client";

import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import { useVisitorTracking } from "@/app/hooks/useVisitorTracking";

// Create a separate component for tracking
function VisitorTracker() {
  useVisitorTracking();
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <VisitorTracker />
      {children}
    </Provider>
  );
}