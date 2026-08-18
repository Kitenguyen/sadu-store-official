import type { Product } from "./products";

type FbqArgs = [string, string, Record<string, unknown>?];

type AnalyticsLine = {
  product: Pick<Product, "id" | "sku" | "name" | "category" | "price">;
  quantity: number;
};

type QueuedEvent = {
  event: string;
  payload: Record<string, unknown>;
};

type FbqWindow = Window & {
  __saduFbFlushTimer?: number;
  __saduFbQueue?: QueuedEvent[];
  dataLayer?: Array<Record<string, unknown>>;
  fbq?: (...args: FbqArgs) => void;
};

const STANDARD_EVENTS = new Set(["ViewContent", "AddToCart", "InitiateCheckout"]);

function getTrackingWindow(): FbqWindow | null {
  if (typeof window === "undefined") return null;
  return window as FbqWindow;
}

function pushDebugEvent(event: string, payload: Record<string, unknown>) {
  const trackingWindow = getTrackingWindow();
  if (!trackingWindow) return;
  trackingWindow.dataLayer?.push({
    event: `sadu_${event}`,
    ...payload,
  });
}

function sendToPixel(trackingWindow: FbqWindow, event: string, payload: Record<string, unknown>) {
  if (!trackingWindow.fbq) return;
  const method = STANDARD_EVENTS.has(event) ? "track" : "trackCustom";
  trackingWindow.fbq(method, event, payload);
}

function flushQueuedEvents(trackingWindow: FbqWindow) {
  if (!trackingWindow.fbq || !trackingWindow.__saduFbQueue?.length) return;
  const queue = [...trackingWindow.__saduFbQueue];
  trackingWindow.__saduFbQueue = [];
  queue.forEach((item) => sendToPixel(trackingWindow, item.event, item.payload));
}

function scheduleQueueFlush(trackingWindow: FbqWindow) {
  if (trackingWindow.__saduFbFlushTimer || typeof window === "undefined") return;
  trackingWindow.__saduFbFlushTimer = window.setInterval(() => {
    if (!trackingWindow.fbq) return;
    flushQueuedEvents(trackingWindow);
    if (trackingWindow.__saduFbFlushTimer) {
      window.clearInterval(trackingWindow.__saduFbFlushTimer);
      trackingWindow.__saduFbFlushTimer = undefined;
    }
  }, 500);
}

export function trackEvent(event: string, payload: Record<string, unknown> = {}) {
  const trackingWindow = getTrackingWindow();
  if (!trackingWindow) return;

  pushDebugEvent(event, payload);

  if (!trackingWindow.fbq) {
    trackingWindow.__saduFbQueue = [...(trackingWindow.__saduFbQueue ?? []), { event, payload }];
    scheduleQueueFlush(trackingWindow);
    return;
  }

  flushQueuedEvents(trackingWindow);
  sendToPixel(trackingWindow, event, payload);
}

function toContents(lines: AnalyticsLine[]) {
  return lines.map((line) => ({
    id: line.product.sku,
    item_price: line.product.price,
    quantity: line.quantity,
  }));
}

export function trackViewContent() {
  trackEvent("ViewContent", {
    content_name: "SADU Store Official",
    content_category: "landing_page",
    content_type: "product_group",
  });
}

export function trackSelectItem(
  product: Pick<Product, "id" | "sku" | "name" | "category" | "price">,
  quantity = 1,
  source = "landing_page",
) {
  trackEvent("SelectItem", {
    content_ids: [product.sku],
    content_name: product.name,
    content_category: product.category,
    content_type: "product",
    quantity,
    source,
    value: product.price * quantity,
    currency: "VND",
  });
}

export function trackAddToCart(
  product: Pick<Product, "id" | "sku" | "name" | "category" | "price">,
  quantity = 1,
  source = "landing_page",
) {
  trackEvent("AddToCart", {
    content_ids: [product.sku],
    content_name: product.name,
    content_category: product.category,
    content_type: "product",
    contents: [
      {
        id: product.sku,
        item_price: product.price,
        quantity,
      },
    ],
    source,
    value: product.price * quantity,
    currency: "VND",
  });
}

export function trackViewCart(lines: AnalyticsLine[], subtotal: number) {
  trackEvent("ViewCart", {
    content_type: "product",
    content_ids: lines.map((line) => line.product.sku),
    contents: toContents(lines),
    num_items: lines.reduce((sum, line) => sum + line.quantity, 0),
    value: subtotal,
    currency: "VND",
  });
}

export function trackInitiateCheckout(lines: AnalyticsLine[], value: number) {
  trackEvent("InitiateCheckout", {
    content_type: "product",
    content_ids: lines.map((line) => line.product.sku),
    contents: toContents(lines),
    num_items: lines.reduce((sum, line) => sum + line.quantity, 0),
    value,
    currency: "VND",
  });
}

export function trackApplyVoucher(code: string, discount: number, value: number) {
  trackEvent("ApplyVoucher", {
    voucher_code: code,
    discount_value: discount,
    value,
    currency: "VND",
  });
}

export function trackContactClick(channel: "phone" | "zalo", location: string) {
  trackEvent(channel === "phone" ? "ClickPhone" : "ClickZalo", {
    channel,
    location,
  });
}
