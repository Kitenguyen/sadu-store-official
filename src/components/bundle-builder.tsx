import { useMemo, useState } from "react";
import { formatVnd, products } from "../lib/products";
import { useCart } from "../lib/cart-context";

const BUNDLE_OPTIONS = products.slice(0, 5);
const TIER_DISCOUNT: Record<number, number> = { 2: 0.08, 3: 0.15 };

export function BundleBuilder() {
  const [selected, setSelected] = useState<string[]>([
    BUNDLE_OPTIONS[0].id,
    BUNDLE_OPTIONS[2].id,
  ]);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const { total, discountRate, savings } = useMemo(() => {
    const chosen = BUNDLE_OPTIONS.filter((p) => selected.includes(p.id));
    const raw = chosen.reduce((sum, p) => sum + p.price, 0);
    const rate = TIER_DISCOUNT[chosen.length] ?? 0;
    return { total: raw * (1 - rate), discountRate: rate, savings: raw * rate };
  }, [selected]);

  return (
    <section id="bundle" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-10 rounded-[24px] bg-[#1E5B38] p-6 md:grid-cols-[1.1fr,1fr] md:p-12">
        <div className="text-[#FAF9F5]">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#D6B36A]">
            Tự chọn combo
          </p>
          <h2 className="max-w-md text-3xl font-bold tracking-tight md:text-4xl">
            Kết hợp yêu thích của bạn, tiết kiệm hơn
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            Chọn 2 sản phẩm để giảm 8%, chọn 3 sản phẩm để giảm 15%. Giá cập nhật ngay khi bạn chọn.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {BUNDLE_OPTIONS.map((product) => {
              const active = selected.includes(product.id);
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggle(product.id)}
                  className={`group relative overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 ${
                    active
                      ? "border-[#D6B36A] shadow-[0_0_0_4px_rgba(214,179,106,0.2)]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-white/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="bg-black/25 px-2.5 py-2">
                    <p className="line-clamp-1 text-[11px] font-medium text-white">
                      {product.name}
                    </p>
                  </div>
                  {active ? (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D6B36A]">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1E5B38" strokeWidth="3">
                        <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[20px] bg-[#FAF9F5] p-6 md:p-8">
          <div>
            <p className="text-sm font-medium text-[#222222]/60">Combo của bạn</p>
            <div className="mt-3 space-y-2">
              {selected.length === 0 ? (
                <p className="text-sm text-[#222222]/40">Chọn ít nhất 1 sản phẩm.</p>
              ) : (
                BUNDLE_OPTIONS.filter((p) => selected.includes(p.id)).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm">
                    <span className="line-clamp-1 text-[#222222]/80">{p.name}</span>
                    <span className="shrink-0 font-medium text-[#222222]">
                      {formatVnd(p.price)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {discountRate > 0 ? (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#BFD8C3]/50 px-3 py-2 text-sm">
                <span className="text-[#1E5B38]">Ưu đãi combo</span>
                <span className="font-semibold text-[#1E5B38]">
                  -{Math.round(discountRate * 100)}% ({formatVnd(savings)})
                </span>
              </div>
            ) : null}

            <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-[#D6B36A] transition-all duration-500"
                style={{ width: `${Math.min(100, (selected.length / 3) * 100)}%` }}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-sm text-[#222222]/60">Tổng cộng</span>
              <span className="text-2xl font-bold text-[#1E5B38]">{formatVnd(Math.round(total))}</span>
            </div>
            <button
              type="button"
              disabled={selected.length === 0}
              onClick={() => {
                selected.forEach((id) => addToCart(id, 1));
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1800);
              }}
              className="w-full rounded-full bg-[#222222] py-3.5 text-sm font-semibold text-white transition hover:bg-[#1E5B38] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {added ? "Đã thêm vào giỏ ✓" : "Thêm bộ vào giỏ"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
