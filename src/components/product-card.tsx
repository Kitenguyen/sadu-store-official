import { useEffect, useMemo, useState } from "react";
import { useCart } from "../lib/cart-context";
import { formatVnd, getProductSchema, type Product } from "../lib/products";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#D6B36A" : "none"}
          stroke="#D6B36A"
          strokeWidth="1.5"
        >
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.6l-5.8 3 1.1-6.5-4.8-4.6 6.6-.9 2.9-6z" />
        </svg>
      ))}
    </div>
  );
}

function badgeStyles(badge?: Product["badge"]) {
  switch (badge) {
    case "SALE":
      return "bg-[#D6B36A] text-[#222222]";
    case "NEW":
      return "bg-[#EEF6F0] text-[#1E5B38]";
    case "BEST SELLER":
      return "bg-[#1E5B38] text-white";
    case "COMBO":
      return "bg-[#222222] text-white";
    default:
      return "bg-white/90 text-[#222222]";
  }
}

type FlyState = {
  src: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export function ProductCard({
  product,
  compactMobile = false,
}: {
  product: Product;
  compactMobile?: boolean;
}) {
  const { addToCart, checkoutNow, toggleFavorite, favorites, notifyCartFx } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [flyState, setFlyState] = useState<FlyState | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFavorite = favorites.has(product.id);

  const schemaJson = useMemo(() => JSON.stringify(getProductSchema(product)), [product]);
  const shellClass = compactMobile ? "rounded-[18px] md:rounded-[22px]" : "rounded-[22px]";
  const pillTextClass = compactMobile
    ? "px-2 py-1 text-[10px] md:px-2.5 md:text-[11px]"
    : "px-2.5 py-1 text-[11px]";
  const contentClass = compactMobile ? "gap-1.5 p-3 md:gap-2 md:p-4" : "gap-2.5 p-4";
  const titleClass = compactMobile
    ? "min-h-[2.45rem] text-[0.95rem] leading-[1.3] md:min-h-[2.6rem] md:text-sm"
    : "min-h-[2.8rem] text-base leading-[1.35] md:min-h-[2.6rem] md:text-sm";
  const priceClass = compactMobile
    ? "text-[1.08rem] leading-6 md:text-[1.25rem] md:leading-7"
    : "text-[1.12rem] leading-6 md:text-[1.25rem] md:leading-7";

  useEffect(() => {
    if (!flyState) return;

    const start = window.setTimeout(() => {
      const el = document.getElementById(`fly-${product.id}`);
      if (el) {
        el.style.transform = `translate(${flyState.endX - flyState.startX}px, ${flyState.endY - flyState.startY}px) scale(0.18)`;
        el.style.opacity = "0.15";
      }
    }, 20);

    const end = window.setTimeout(() => {
      setFlyState(null);
      notifyCartFx();
    }, 700);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, [flyState, notifyCartFx, product.id]);

  const handleAdd = (event?: React.MouseEvent<HTMLButtonElement>) => {
    addToCart(product.id, quantity);

    const anchor = document.getElementById("cart-icon-anchor");
    const cardImage =
      (event?.currentTarget.closest(".group")?.querySelector("img") as HTMLImageElement | null) ??
      null;
    if (!anchor || !cardImage) return;

    const startRect = cardImage.getBoundingClientRect();
    const endRect = anchor.getBoundingClientRect();
    const cartHasItemsBefore = Number(anchor.getAttribute("data-cart-count") || "0") > 0;

    if (cartHasItemsBefore) {
      setFlyState({
        src: product.image,
        startX: startRect.left + startRect.width / 2 - 24,
        startY: startRect.top + startRect.height / 2 - 24,
        endX: endRect.left + endRect.width / 2 - 24,
        endY: endRect.top + endRect.height / 2 - 24,
      });
    }
  };

  return (
    <>
      <article
        id={product.slug}
        className={`group relative flex h-full flex-col overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(30,91,56,0.32)] ${shellClass}`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />

        <div className="relative aspect-square overflow-hidden bg-[#F1EFE7]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.68),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.32),rgba(214,179,106,0.08))]" />
          <img
            src={product.image}
            srcSet={`${product.image} 640w, ${product.image} 960w`}
            sizes={
              compactMobile
                ? "(max-width: 767px) 50vw, (max-width: 1024px) 50vw, 25vw"
                : "(max-width: 767px) 50vw, (max-width: 1024px) 50vw, 33vw"
            }
            alt={product.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] ${imageLoaded ? "scale-100 blur-0" : "scale-[1.02] blur-sm"}`}
          />

          {product.badge ? (
            <span
              className={`absolute left-3 top-3 rounded-full font-semibold ${pillTextClass} ${badgeStyles(product.badge)}`}
            >
              {product.badge}
            </span>
          ) : null}

          <button
            type="button"
            aria-label={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
            onClick={() => toggleFavorite(product.id)}
            className={`absolute right-3 top-3 flex items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition active:scale-90 ${
              compactMobile ? "h-9 w-9 md:h-8 md:w-8" : "h-11 w-11 md:h-8 md:w-8"
            }`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={isFavorite ? "#D6B36A" : "none"}
              stroke={isFavorite ? "#D6B36A" : "#222222"}
              strokeWidth="2"
              className={`transition-transform duration-300 ${isFavorite ? "scale-110" : "scale-100"}`}
            >
              <path
                d="M12 20s-7-4.4-9.5-9C1 8 2.5 4.5 6 4c2-.3 3.8.8 6 3 2.2-2.2 4-3.3 6-3 3.5.5 5 4 3.5 7-2.5 4.6-9.5 9-9.5 9Z"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={`flex flex-1 flex-col ${contentClass}`}>
          <div className="flex items-center justify-between gap-2">
            <span
              className={`rounded-full bg-[#1E5B38]/8 font-semibold text-[#1E5B38] ${pillTextClass}`}
            >
              {product.brand}
            </span>
            <div className="flex items-center gap-1.5">
              {product.discount ? (
                <span
                  className={`rounded-full bg-[#b5502f]/10 font-bold text-[#b5502f] ${pillTextClass}`}
                >
                  -{product.discount}%
                </span>
              ) : null}
              <span
                className={`rounded-full bg-[#F4F2EB] font-medium text-[#222222]/65 ${pillTextClass}`}
              >
                Còn hàng
              </span>
            </div>
          </div>

          <h3 className={`line-clamp-2 font-semibold text-[#222222] ${titleClass}`}>
            {product.name}
          </h3>

          <p
            className={`line-clamp-2 leading-[1.45] text-[#222222]/55 ${
              compactMobile ? "text-[13px] md:text-sm" : "text-sm"
            }`}
          >
            {product.shortDescription}
          </p>

          <div className={`flex items-center gap-1.5 ${compactMobile ? "text-[11px]" : ""}`}>
            <Stars rating={product.rating} />
            <span className="text-xs font-medium text-[#222222]/80">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-[#222222]/50">({product.reviewCount})</span>
          </div>

          <div className="flex items-end justify-between gap-3 pt-1">
            <div className="flex min-w-0 flex-col">
              {product.oldPrice ? (
                <span className="text-[13px] text-[#222222]/40 line-through">
                  {formatVnd(product.oldPrice)}
                </span>
              ) : (
                <span className="text-[13px] text-transparent">.</span>
              )}
              <span className={`font-bold text-[#d12f2f] ${priceClass}`}>
                {formatVnd(product.price)}
              </span>
            </div>
            <span className="rounded-full border border-black/8 px-2.5 py-1 text-[12px] font-medium text-[#222222]/65">
              {product.size}
            </span>
          </div>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <div className="hidden items-center rounded-full border border-black/10 md:flex">
              <button
                type="button"
                aria-label="Giảm số lượng"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-[#222222]/60 transition active:scale-90"
              >
                -
              </button>
              <span className="inline-flex h-11 min-w-[2.5rem] items-center justify-center px-1 text-center text-sm font-semibold leading-none text-[#222222]">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                className="flex h-11 w-11 items-center justify-center text-[#222222]/60 transition active:scale-90"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="hidden min-h-[44px] flex-1 rounded-full border border-[#1E5B38]/15 bg-[#F7F5EE] px-4 py-2.5 text-sm font-semibold text-[#1E5B38] transition hover:bg-[#EDE8D8] active:scale-[0.98] md:block"
            >
              Thêm vào giỏ
            </button>
          </div>

          <div className="mt-1 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => checkoutNow(product.id, quantity)}
              data-product-primary-cta="true"
              className={`w-full rounded-full bg-[#222222] px-4 font-semibold text-white transition hover:bg-[#1E5B38] active:scale-[0.98] ${
                compactMobile
                  ? "py-3 text-[15px] md:min-h-[44px] md:py-3 md:text-sm"
                  : "py-3.5 text-base md:min-h-[44px] md:py-3 md:text-sm"
              }`}
            >
              Mua ngay
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full rounded-full border border-[#1E5B38]/15 bg-[#F7F5EE] px-4 font-semibold text-[#1E5B38] transition hover:bg-[#EDE8D8] active:scale-[0.98] md:hidden ${
                compactMobile ? "py-2.5 text-[14px]" : "py-3 text-base"
              }`}
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </article>

      {flyState ? (
        <img
          id={`fly-${product.id}`}
          src={flyState.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none fixed z-[120] h-12 w-12 rounded-xl object-cover shadow-xl transition-all duration-700 ease-in-out"
          style={{
            left: `${flyState.startX}px`,
            top: `${flyState.startY}px`,
            opacity: 0.95,
            transform: "translate(0px, 0px) scale(1)",
          }}
        />
      ) : null}
    </>
  );
}
