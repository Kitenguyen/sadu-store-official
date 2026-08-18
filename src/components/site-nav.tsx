import { useEffect, useState } from "react";
import { useCart } from "../lib/cart-context";
import { assetUrl } from "../lib/site";

const NAV_LINKS = [
  { href: "#categories", label: "Danh mục" },
  { href: "#ingredients", label: "Nguyên liệu" },
  { href: "#promo-products", label: "Flash sale" },
  { href: "#bundle", label: "Combo" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartFxActive, setCartFxActive] = useState(false);
  const { count, openCart, cartFxTick } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!cartFxTick) return;
    setCartFxActive(true);
    const timer = window.setTimeout(() => setCartFxActive(false), 900);
    return () => window.clearTimeout(timer);
  }, [cartFxTick]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#d6b36a]/10 bg-[#140f0b]/84 py-3 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-colors ${
              scrolled ? "bg-[#2b1d15]" : "bg-black/24 backdrop-blur-md"
            }`}
          >
            <img
              src={assetUrl("/assets/brand/mark.png")}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </span>
          <span
            className={`text-lg font-extrabold tracking-tight ${
              scrolled ? "text-[#fff8ef]" : "text-white"
            }`}
          >
            SADU
          </span>
        </a>

        <nav
          className={`hidden items-center gap-8 text-sm font-medium lg:flex ${
            scrolled ? "text-[#f3e1ca]/80" : "text-white/85"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="relative transition-colors hover:opacity-100">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Tìm kiếm"
            onClick={() => setSearchOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              scrolled ? "text-[#fff8ef] hover:bg-white/8" : "text-white hover:bg-white/10"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Tài khoản"
            className={`hidden h-10 w-10 items-center justify-center rounded-full transition-colors sm:flex ${
              scrolled ? "text-[#fff8ef] hover:bg-white/8" : "text-white hover:bg-white/10"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20c1.6-3.6 4.7-5.5 7.5-5.5S17.9 16.4 19.5 20" strokeLinecap="round" />
            </svg>
          </button>
          <button
            id="cart-icon-anchor"
            data-cart-count={count}
            type="button"
            aria-label={`Giỏ hàng, ${count} sản phẩm`}
            onClick={openCart}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all ${
              scrolled ? "text-[#fff8ef] hover:bg-white/8" : "text-white hover:bg-white/10"
            } ${count > 0 ? "animate-[pulse_2.2s_ease-in-out_infinite]" : ""} ${
              cartFxActive ? "scale-110 ring-4 ring-[#D6B36A]/30" : ""
            }`}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#D6B36A] px-1 text-[10px] font-bold text-[#222222] shadow-sm">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="mx-auto mt-3 max-w-[1440px] px-5 md:px-10">
          <div className="flex items-center gap-3 rounded-full border border-[#d6b36a]/20 bg-[#1a120d]/92 px-5 py-3 shadow-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6B36A" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              autoFocus
              type="text"
              placeholder="Tìm trà khuyến mại, ví dụ: lá ổi 1kg..."
              className="w-full bg-transparent text-sm text-[#fff8ef] placeholder:text-[#f3e1ca]/38 focus:outline-none"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
