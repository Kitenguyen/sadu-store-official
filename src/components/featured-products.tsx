import { comboProducts, mateProducts, promotionProducts } from "../lib/products";
import { assetUrl } from "../lib/site";
import { ProductCard } from "./product-card";

const mateComboProducts = comboProducts.filter((product) =>
  [
    "combo-mate-xa-den-3-tang-1",
    "combo-mate-la-sen-3-tang-1",
    "combo-mate-hoa-cuc-3-tang-1",
  ].includes(product.id),
);

const mateCollectionProducts = [...mateProducts, ...mateComboProducts];

function SectionHeader({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#D6B36A]">
          {kicker}
        </p>
        <h2 className="text-[1.9rem] font-bold tracking-tight text-[#fff8ef] md:text-4xl">
          {title}
        </h2>
      </div>
      {body ? <p className="max-w-sm text-sm leading-relaxed text-[#f3e1ca]/64">{body}</p> : null}
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section
      id="products"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#120d09,#18110d)] py-14 md:py-28"
    >
      <img
        src={assetUrl("/assets/plates/paper-grain.jpg")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-18 mix-blend-soft-light"
      />

      <div className="relative mx-auto max-w-[1440px] space-y-11 px-5 md:space-y-16 md:px-10">
        <div id="mate-collection" className="scroll-mt-28">
          <SectionHeader kicker="Mate collection" title="Bộ sưu tập Trà Mate" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {mateCollectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} compactMobile />
            ))}
          </div>
        </div>

        <div id="promo-products" className="scroll-mt-28">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d6b36a]/20 bg-[#d6b36a]/10 px-4 py-2 text-sm font-semibold text-[#f0d5ae]">
            <span className="rounded-full bg-[#b5502f] px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-white">
              Today Only
            </span>
            <span>Flash Sale · Save up to 30%</span>
          </div>

          <SectionHeader
            kicker="Trà túi lọc khuyến mại"
            title="Trà túi lọc khuyến mại"
            body="Mỗi sản phẩm khuyến mại đều hiển thị rõ giá gốc, giá giảm và thông tin ưu đãi để khách dễ chốt đơn."
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {promotionProducts.map((product) => (
              <ProductCard key={product.id} product={product} compactMobile />
            ))}
          </div>
        </div>

        <div id="bundle" className="scroll-mt-28">
          <SectionHeader kicker="Combo khuyến mại" title="Combo khuyến mại" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {comboProducts.map((product) => (
              <ProductCard key={product.id} product={product} compactMobile />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
