export const SITE_ORIGIN = "https://www.sadu.com.vn";
export const SITE_BASE_PATH = "/sadu-store-official";
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;

export function withBasePath(path = "/") {
  if (!path || path === "/") return SITE_BASE_PATH;
  return `${SITE_BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export function assetUrl(path: string) {
  return withBasePath(path);
}
