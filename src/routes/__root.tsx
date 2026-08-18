import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SITE_ORIGIN, SITE_URL, withBasePath } from "../lib/site";
import { Toaster } from "../components/ui/sonner";
import "../styles.css";

const SITE_TITLE = "SADU Store Official | Trà thảo dược Việt Nam";
const SITE_DESCRIPTION =
  "SADU Store Official cung cấp trà thảo dược Việt Nam, bộ sưu tập Trà Mate, sản phẩm khuyến mại và combo ưu đãi giao hàng toàn quốc.";
const SOCIAL_IMAGE_URL = new URL(withBasePath("/presets/cover.png"), SITE_ORIGIN).toString();

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "theme-color", content: "#1E5B38" },
      { property: "og:locale", content: "vi_VN" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SADU Store Official" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SOCIAL_IMAGE_URL },
      { property: "og:image:alt", content: "SADU Store Official" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: SOCIAL_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", href: withBasePath("/favicon.ico") },
      { rel: "apple-touch-icon", href: withBasePath("/apple-touch-icon.png") },
      { rel: "manifest", href: withBasePath("/site.webmanifest") },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var loadPixel=function(){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '4167757806778859');
fbq('track', 'PageView');};
if('requestIdleCallback' in window){window.requestIdleCallback(loadPixel,{timeout:2000});}
else{window.setTimeout(loadPixel,1500);}}();`,
          }}
        />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4167757806778859&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
