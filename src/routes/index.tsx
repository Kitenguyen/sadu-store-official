import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Certifications } from "../components/certifications";
import { FAQS, Faq } from "../components/faq";
import { FarmStory } from "../components/farm-story";
import { FeaturedProducts } from "../components/featured-products";
import {
  CartDrawer,
  CouponWidget,
  MobilePurchaseBar,
  SupportBubble,
} from "../components/floating-widgets";
import { IngredientsSection } from "../components/ingredients-section";
import { MobileHero } from "../components/mobile-hero";
import { ProductCategories } from "../components/product-categories";
import { PromoBanner } from "../components/promo-banner";
import { Reviews } from "../components/reviews";
import { ScrollScrub, type ScrollScrubScene } from "../components/scroll-scrub/scroll-scrub";
import { SiteFooter } from "../components/site-footer";
import { SiteNav } from "../components/site-nav";
import { SongLanhJourney } from "../components/song-lanh-journey";
import { StructuredData } from "../components/StructuredData";
import { WhyChooseUs } from "../components/why-choose-us";
import { trackViewContent } from "../lib/analytics";
import { CartProvider } from "../lib/cart-context";
import { products } from "../lib/products";
import { assetUrl, SITE_ORIGIN, SITE_URL } from "../lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        href: assetUrl("/assets/iloveimg-compressed/img-hero.png"),
        media: "(max-width: 767px)",
      },
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
        media: "(min-width: 768px) and (max-width: 860px)",
      },
    ],
  }),
  component: Index,
});

const THEME = {
  accent: "#D6B36A",
  background: "#120D09",
  ink: "#FFF8EF",
  muted: "rgba(243,225,202,0.72)",
};

const PAGE_DESCRIPTION =
  "SADU Store Official mang đến bộ sưu tập trà mate, trà thảo dược và các ưu đãi giao hàng toàn quốc.";
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
    kicker: "SADU Store Official",
    title: "Trà thảo dược Việt Nam dễ chọn, dễ uống và đáng tin cậy mỗi ngày.",
    body: "Từ xạ đen, lá sen đến hoa cúc, SADU giữ chất mộc sạch trong bộ sưu tập trà tiện pha, ưu đãi rõ ràng và giao hàng toàn quốc.",
    tags: ["Miễn phí ship từ 250K", "Đổi trả 7 ngày"],
    poster: assetUrl("/assets/world/scene-01-poster.jpg"),
    mobilePoster: assetUrl("/assets/world/scene-01-mobile-poster.jpg"),
    clip: assetUrl("/assets/world/scene-01.mp4"),
    mobileClip: assetUrl("/assets/world/scene-01-mobile.mp4"),
    align: "left",
    scroll: 1.5,
    actions: (
      <HeroActions
        primaryLabel="Xem bộ sưu tập đang bán"
        secondaryLabel="Xem ưu đãi hôm nay"
        secondaryHref="#promo-products"
      />
    ),
  },
  {
    id: "handpick",
    label: "Hái tay",
    kicker: "Chuẩn VietGAP",
    title: "Nguyên liệu được chọn kỹ từ vùng trồng sạch.",
    body: "Người làm vườn hái theo lứa, chọn đúng độ lá và giữ sự đồng đều để từng mẻ trà lên nước ổn định, dễ uống và thơm dịu hơn.",
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
    title: "Sấy và phối vị để hợp nhịp uống hằng ngày.",
    body: "Nguyên liệu được làm sạch, sấy ở nhiệt độ phù hợp và phối công thức vừa vị để khách nhìn là hiểu ngay: sạch, tiện dùng và dễ duy trì.",
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
    title: "Một tách trà sáng vị, trầm sắc và gọn trong trải nghiệm mua.",
    body: "Phần hero dẫn khách từ cảm xúc thương hiệu sang quyết định mua nhanh hơn, để thấy rõ bộ sưu tập, flash sale và combo đang bán tốt của SADU.",
    poster: assetUrl("/assets/world/scene-04-poster.jpg"),
    mobilePoster: assetUrl("/assets/world/scene-04-mobile-poster.jpg"),
    clip: assetUrl("/assets/world/scene-04.mp4"),
    mobileClip: assetUrl("/assets/world/scene-04-mobile.mp4"),
    align: "left",
    scroll: 1.6,
    actions: (
      <HeroActions
        primaryLabel="Khám phá bộ sưu tập"
        secondaryLabel="Xem câu chuyện nông trại"
        secondaryHref="#farm-story"
      />
    ),
  },
];

function HeroActions({
  primaryLabel,
  secondaryLabel,
  secondaryHref,
}: {
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href="#categories"
        className="group relative inline-flex min-h-12 items-center overflow-hidden rounded-full bg-[#D6B36A] px-7 py-3.5 text-base font-semibold text-[#1E5B38] transition active:scale-[0.97]"
      >
        <span className="relative z-10">{primaryLabel}</span>
        <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
      </a>
      <a
        href={secondaryHref}
        className="group inline-flex min-h-12 items-center gap-2 text-base font-medium text-white/84"
      >
        <span className="border-b border-white/0 transition-colors group-hover:border-white/70">
          {secondaryLabel}
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
    <div className="border-y border-[#d6b36a]/10 bg-[#120d09]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-4 gap-y-3 px-5 py-4 text-xs font-medium text-[#f3e1ca]/66 md:justify-between md:px-10">
        {[
          "Chuẩn VietGAP",
          "OCOP 4 sao",
          "100% tự nhiên",
          "Không chất bảo quản",
          "Giao hàng toàn quốc",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function DesktopSections() {
  return (
    <>
      <TrustBadgesBar />
      <div className="relative">
        <IngredientsSection />
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
    </>
  );
}

function MobileSections() {
  return (
    <div className="relative">
      <SongLanhJourney />
      <FeaturedProducts />
      <TrustBadgesBar />
      <IngredientsSection />
      <Certifications />
      <ProductCategories />
      <WhyChooseUs />
      <FarmStory />
      <Reviews />
      <Faq />
      <SiteFooter />
    </div>
  );
}

function Index() {
  const [isMobileLayout, setIsMobileLayout] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false,
  );

  useEffect(() => {
    trackViewContent();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobileLayout(media.matches);

    sync();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", sync);
      return () => media.removeEventListener("change", sync);
    }

    media.addListener(sync);
    return () => media.removeListener(sync);
  }, []);

  return (
    <CartProvider>
      <div id="top" className="min-h-dvh bg-[#120d09] text-[#FFF8EF]">
        <StructuredData json={HOMEPAGE_SCHEMA} />
        <SiteNav />
        <main id="main-content">
          <div className="md:hidden">
            <MobileHero />
          </div>
          <div className="hidden md:block">
            <ScrollScrub scenes={SCENES} theme={THEME} />
          </div>
          {isMobileLayout ? <MobileSections /> : <DesktopSections />}
        </main>
        <CartDrawer />
        <CouponWidget />
        <SupportBubble />
        <MobilePurchaseBar />
      </div>
    </CartProvider>
  );
}
