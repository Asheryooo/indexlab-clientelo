export type FunnelEventType =
  | "page_view"
  | "calculator_interacted"
  | "cta_clicked"
  | "lead_form_submitted";

export interface AnalyticsEvent {
  event: FunnelEventType;
  payload?: Record<string, unknown>;
  timestamp: string;
}

const STORAGE_KEY = "clientelo_funnel_events";

/**
 * Zaznamená analytickou událost do konzole a lokálního úložiště pro sledování konverzního trychtýře.
 */
export function trackEvent(
  event: FunnelEventType,
  payload?: Record<string, unknown>
): void {
  const timestamp = new Date().toISOString();
  const eventData: AnalyticsEvent = { event, payload, timestamp };

  // 1. Log do konzole pro transparentní ladění a demonstraci
  // eslint-disable-next-line no-console
  console.log(`[Analytics Funnel] 📊 ${event}`, {
    ...payload,
    time: new Date().toLocaleTimeString("cs-CZ"),
  });

  // 2. Uložení do sessionStorage pro session metriky
  if (typeof window !== "undefined") {
    try {
      const existing = sessionStorage.getItem(STORAGE_KEY);
      const events: AnalyticsEvent[] = existing ? JSON.parse(existing) : [];
      events.push(eventData);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(events));

      // Aktualizace počítadla události
      const countKey = `event_count_${event}`;
      const currentCount = parseInt(sessionStorage.getItem(countKey) || "0", 10);
      sessionStorage.setItem(countKey, String(currentCount + 1));
    } catch {
      // Tiché selhání pokud je storage nedostupný (např. anonymní režim)
    }
  }
}

/**
 * Získá všechny události z aktuální relace.
 */
export function getSessionEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
