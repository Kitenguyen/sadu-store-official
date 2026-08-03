import { createFileRoute } from "@tanstack/react-router";

import { Certifications } from "../components/certifications";
import { FAQS, Faq } from "../components/faq";
import { FarmStory } from "../components/farm-story";
import { FeaturedProducts } from "../components/featured-products";
import { CartDrawer, CouponWidget, MobilePurchaseBar, SupportBubble } from "../components/floating-widgets";
import { ProductCategories } from "../components/product-categories";
import { PromoBanner } from "../components/promo-banner";
import { Reviews } from "../components/reviews";
import { ScrollScrub, type ScrollScrubScene } from "../components/scroll-scrub/scroll-scrub";
import { SiteFooter } from "../components/site-footer";
import { SiteNav } from "../components/site-nav";
import { SongLanhJourney } from "../components/song-lanh-journey";
import { StructuredData } from "../components/StructuredData";
import { WhyChooseUs } from "../components/why-choose-us";
import { CartProvider } from "../lib/cart-context";
import { products } from "../lib/products";
import { assetUrl, SITE_ORIGIN, SITE_URL } from "../lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        href: assetUrl("/assets/world/scene-01-poster.jpg"),
        media: "(min-width: 861px)",
      },
      {
        rel: "preload",
        as: "image",
        href: assetUrl("/assets/world/scene-01-mobile-poster.jpg"),
        media: "(max-width: 860px)",
      },
    ],
  }),
  component: Index,
});

const THEME = {
  accent: "#D6B36A",
  background: "#1E5B38",
  ink: "#FAF9F5",
  muted: "rgba(250,249,245,0.7)",
};

const PAGE_DESCRIPTION =
  "SADU Store Official mang den bo suu tap Tra Mate, san pham thao duoc khuyen mai va combo uu dai giao hang toan quoc.";
const PRIMARY_IMAGE_URL = new URL(assetUrl("/presets/cover.png"), SITE_ORIGIN).toString();
const HOMEPAGE_SCHEMA = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: "SADU Store Official",
    url: SITE_URL,
    logo: new URL(assetUrl("/assets/brand/mark.png"), SITE_ORIGIN).toString(),
    image: PRIMARY_IMAGE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+84-355532863",
        areaServed: "VN",
        availableLanguage: ["vi"],
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: "SADU Store Official",
    inLanguage: "vi-VN",
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}#webpage`,
    url: SITE_URL,
    name: "SADU Store Official",
    description: PAGE_DESCRIPTION,
    inLanguage: "vi-VN",
    isPartOf: { "@id": `${SITE_URL}#website` },
    primaryImageOfPage: PRIMARY_IMAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}#faq`,
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}#products`,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: product.url,
      name: product.name,
    })),
  },
]);

const SCENES: ScrollScrubScene[] = [
  {
    id: "source",
    label: "Nguồn cội",
    kicker: "SADU · Từ núi rừng đến tách trà",
    title: "Nguồn cội nguyên sơ",
    body: "Thảo dược mọc tự nhiên trên những sườn đồi cao nguyên, đón nắng sớm và sương mù mỗi ban mai.",
    poster: assetUrl("/assets/world/scene-01-poster.jpg"),
    mobilePoster: assetUrl("/assets/world/scene-01-mobile-poster.jpg"),
    clip: assetUrl("/assets/world/scene-01.mp4"),
    mobileClip: assetUrl("/assets/world/scene-01-mobile.mp4"),
    align: "left",
    scroll: 1.5,
  },
  {
    id: "handpick",
    label: "Hái tay",
    kicker: "Chuẩn VietGAP",
    title: "Hái bằng tay, chọn từng lá",
    body: "Người nông dân chọn hái từng lá đạt độ trưởng thành tốt nhất, đúng thời điểm để giữ trọn dưỡng chất.",
    tags: ["VietGAP", "Hái thủ công"],
    poster: assetUrl("/assets/world/scene-02-poster.jpg"),
    mobilePoster: assetUrl("/assets/world/scene-02-mobile-poster.jpg"),
    clip: assetUrl("/assets/world/scene-02.mp4"),
    mobileClip: assetUrl("/assets/world/scene-02-mobile.mp4"),
    align: "left",
    scroll: 1.5,
  },
  {
    id: "dry",
    label: "Sấy khô",
    kicker: "Không chất bảo quản",
    title: "Sấy tự nhiên, giữ trọn dưỡng chất",
    body: "Lá thảo dược được phơi và sấy ở nhiệt độ thấp trong nhà xưởng đạt chuẩn, không dùng phụ gia.",
    tags: ["100% tự nhiên", "Không chất bảo quản"],
    poster: assetUrl("/assets/world/scene-03-poster.jpg"),
    mobilePoster: assetUrl("/assets/world/scene-03-mobile-poster.jpg"),
    clip: assetUrl("/assets/world/scene-03.mp4"),
    mobileClip: assetUrl("/assets/world/scene-03-mobile.mp4"),
    align: "right",
    scroll: 1.5,
  },
  {
    id: "cup",
    label: "Tách trà",
    kicker: "SADU",
    title: "Một tách trà, cả vùng núi rừng",
    body: "Từ cao nguyên đến tách trà nóng trên bàn bạn, mỗi ngụm là một câu chuyện thảo dược Việt Nam.",
    poster: assetUrl("/assets/world/scene-04-poster.jpg"),
    mobilePoster: assetUrl("/assets/world/scene-04-mobile-poster.jpg"),
    clip: assetUrl("/assets/world/scene-04.mp4"),
    mobileClip: assetUrl("/assets/world/scene-04-mobile.mp4"),
    align: "left",
    scroll: 1.6,
    actions: <HeroActions />,
  },
];

function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href="#categories"
        className="group relative overflow-hidden rounded-full bg-[#D6B36A] px-7 py-3.5 text-sm font-semibold text-[#1E5B38] transition active:scale-[0.97]"
      >
        <span className="relative z-10">Khám phá bộ sưu tập</span>
        <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
      </a>
      <a href="#farm-story" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
        <span className="border-b border-white/0 transition-colors group-hover:border-white/70">
          Xem câu chuyện nông trại
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

function TrustBadgesBar() {
  return (
    <div className="border-y border-black/6 bg-white/60">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-4 text-xs font-medium text-[#222222]/60 md:justify-between md:px-10">
        <span>Chuẩn VietGAP</span>
        <span>OCOP 4 sao</span>
        <span>100% tự nhiên</span>
        <span>Không chất bảo quản</span>
        <span>Giao hàng toàn quốc</span>
      </div>
    </div>
  );
}

function Index() {
  return (
    <CartProvider>
      <div id="top" className="min-h-dvh bg-[#FAF9F5]">
        <StructuredData json={HOMEPAGE_SCHEMA} />
        <SiteNav />
        <main id="main-content">
          <ScrollScrub scenes={SCENES} theme={THEME} />
          <TrustBadgesBar />
          <div className="relative">
            <SongLanhJourney />
            <PromoBanner />
            <Certifications />
            <ProductCategories />
            <FeaturedProducts />
            <WhyChooseUs />
            <FarmStory />
            <Reviews />
            <Faq />
            <SiteFooter />
          </div>
        </main>
        <CartDrawer />
        <CouponWidget />
        <SupportBubble />
        <MobilePurchaseBar />
      </div>
    </CartProvider>
  );
}
