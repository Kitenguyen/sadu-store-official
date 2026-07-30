import { comboProducts, mateProducts, promotionProducts } from "../lib/products";
import { ProductCard } from "./product-card";

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
        <h2 className="text-3xl font-bold tracking-tight text-[#222222] md:text-4xl">
          {title}
        </h2>
      </div>
      {body ? <p className="max-w-sm text-sm leading-relaxed text-[#222222]/60">{body}</p> : null}
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section id="products" className="relative overflow-hidden bg-[#F4F2EB] py-20 md:py-28">
      <img
        src="/assets/plates/paper-grain.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply"
      />

      <div className="relative mx-auto max-w-[1440px] space-y-16 px-5 md:px-10">
        <div id="mate-collection">
          <SectionHeader kicker="Mate collection" title="Bộ sưu tập Trà Mate" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {mateProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div id="promo-products">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#b5502f]/15 bg-[#b5502f]/8 px-4 py-2 text-sm font-semibold text-[#b5502f]">
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
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {promotionProducts.map((product) => (
              <ProductCard key={product.id} product={product} compactMobile />
            ))}
          </div>
        </div>

        <div id="bundle">
          <SectionHeader kicker="Combo khuyến mại" title="Combo khuyến mại" />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {comboProducts.map((product) => (
              <ProductCard key={product.id} product={product} compactMobile />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
