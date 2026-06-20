type AnalyticsEvent = 
  | "college_selected"
  | "product_added"
  | "product_removed"
  | "category_viewed"
  | "review_order_opened"
  | "whatsapp_checkout_clicked";

export const trackEvent = (eventName: AnalyticsEvent, properties?: Record<string, any>) => {
  // Placeholder for future analytics provider integration (e.g., PostHog, Mixpanel, Google Analytics)
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Event: ${eventName}`, properties || "");
  }
  
  // Implementation will go here
  // e.g. window.posthog?.capture(eventName, properties)
};
