import { useEffect, useState } from "react";
import { useCart } from "../lib/cart-context";
import { formatVnd, type Product } from "../lib/products";

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
  const [justAdded, setJustAdded] = useState(false);
  const [flyState, setFlyState] = useState<FlyState | null>(null);
  const isFavorite = favorites.has(product.id);

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
    const willOpenCart = document.querySelectorAll('[aria-label^="Giỏ hàng"]').length > 0 ? false : false;
    addToCart(product.id, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);

    const anchor = document.getElementById("cart-icon-anchor");
    const cardImage = (event?.currentTarget.closest(".group")?.querySelector("img") as HTMLImageElement | null) ?? null;
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

  const handleBuyNow = () => {
    checkoutNow(product.id, quantity);
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_45px_-25px_rgba(30,91,56,0.35)]">
        <div className="relative aspect-square overflow-hidden bg-[#F1EFE7]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />

          {product.badge ? (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                product.badge === "Giảm giá" || product.badge === "Flash Sale"
                  ? "bg-[#D6B36A] text-[#222222]"
                  : "bg-[#1E5B38] text-white"
              }`}
            >
              {product.badge}
            </span>
          ) : null}

          <button
            type="button"
            aria-label={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
            onClick={() => toggleFavorite(product.id)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition active:scale-90"
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

          <button
            type="button"
            onClick={handleAdd}
            aria-label="Thêm nhanh vào giỏ"
            className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all duration-300 active:scale-90 ${
              justAdded ? "bg-[#1E5B38]" : "bg-white text-[#1E5B38] hover:bg-[#1E5B38] hover:text-white"
            }`}
          >
            {justAdded ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <div className={`flex flex-1 flex-col ${compactMobile ? "gap-1.5 p-3 sm:gap-2 sm:p-4" : "gap-2 p-4"}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-[#1E5B38]/8 px-2.5 py-1 text-[11px] font-semibold text-[#1E5B38]">
              {product.size}
            </span>
            {discount ? (
              <span className="rounded-full bg-[#b5502f]/10 px-2.5 py-1 text-[11px] font-bold text-[#b5502f]">
                -{discount}%
              </span>
            ) : null}
          </div>

          <h3
            className={`line-clamp-2 font-semibold text-[#222222] ${
              compactMobile ? "min-h-[2.5rem] text-[13px] leading-5 sm:min-h-[2.6rem] sm:text-sm" : "min-h-[2.6rem] text-sm"
            }`}
          >
            {product.name}
          </h3>

          <p className={`text-xs leading-relaxed text-[#222222]/55 ${compactMobile ? "hidden sm:block" : ""}`}>
            {product.short}
          </p>

          <div className={`flex items-center gap-1.5 ${compactMobile ? "hidden sm:flex" : ""}`}>
            <Stars rating={product.rating} />
            <span className="text-xs text-[#222222]/50">({product.reviewCount})</span>
          </div>

          <div className="mt-auto flex items-baseline gap-2 pt-1">
            <span className={`${compactMobile ? "text-sm sm:text-base" : "text-base"} font-bold ${product.oldPrice ? "text-[#d12f2f]" : "text-[#1E5B38]"}`}>
              {formatVnd(product.price)}
            </span>
            {product.oldPrice ? (
              <span className="text-xs text-[#222222]/40 line-through">{formatVnd(product.oldPrice)}</span>
            ) : null}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <div className={`items-center rounded-full border border-black/10 ${compactMobile ? "hidden sm:flex" : "flex"}`}>
              <button
                type="button"
                aria-label="Giảm số lượng"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center text-[#222222]/60 transition active:scale-90"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium">{quantity}</span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                className="flex h-8 w-8 items-center justify-center text-[#222222]/60 transition active:scale-90"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`rounded-full border border-[#1E5B38]/15 bg-[#F7F5EE] text-xs font-semibold text-[#1E5B38] transition hover:bg-[#EDE8D8] active:scale-[0.98] ${
                compactMobile ? "w-full py-2.5" : "flex-1 py-2"
              }`}
            >
              Thêm vào giỏ
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className={`mt-1 w-full rounded-full bg-[#222222] py-2.5 text-xs font-semibold text-white transition hover:bg-[#1E5B38] active:scale-[0.98] ${
              compactMobile ? "hidden sm:block" : ""
            }`}
          >
            Mua ngay
          </button>
        </div>
      </div>

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
