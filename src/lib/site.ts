export const SITE_ORIGIN = "https://www.sadu.com.vn";
export const SITE_ALTERNATE_ORIGINS = ["https://sadufarms.vn"] as const;
export const SITE_ALLOWED_ORIGINS = [SITE_ORIGIN, ...SITE_ALTERNATE_ORIGINS] as const;
export const SITE_BASE_PATH = "/sadu-store-official";
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;

export function resolveSiteOrigin(origin?: string) {
  return origin && SITE_ALLOWED_ORIGINS.includes(origin as (typeof SITE_ALLOWED_ORIGINS)[number])
    ? origin
    : SITE_ORIGIN;
}

export function resolveSiteUrl(origin?: string) {
  return `${resolveSiteOrigin(origin)}${SITE_BASE_PATH}`;
}

export function getRequestSiteOrigin(request: Request) {
  return resolveSiteOrigin(new URL(request.url).origin);
}

export function getRequestSiteUrl(request: Request) {
  return resolveSiteUrl(getRequestSiteOrigin(request));
}

export function withBasePath(path = "/") {
  if (!path || path === "/") return SITE_BASE_PATH;
  return `${SITE_BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export function assetUrl(path: string) {
  return withBasePath(path);
}
