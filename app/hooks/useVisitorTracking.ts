"use client";

import { useEffect } from "react";
import { useCreateVisitorAnalyticsMutation } from "@/app/redux/VisitorAnalyticsApi";
import { usePathname } from "next/navigation";

export const useVisitorTracking = () => {
  const [createVisitor] = useCreateVisitorAnalyticsMutation();
  const pathname = usePathname();

  useEffect(() => {
    // Get location data from a service like ipapi.co or ipinfo.io
    const trackVisitor = async () => {
      try {
        // You can use a free IP geolocation service
        const response = await fetch("https://ipapi.co/json/");
        const locationData = await response.json();
        
        await createVisitor({
          country: locationData.country_name,
          city: locationData.city,
          region: locationData.region,
          page: pathname,
        });
      } catch {
        // Fallback if geolocation fails
        await createVisitor({
          page: pathname,
        });
      }
    };

    trackVisitor();
  }, [createVisitor, pathname]);
};