import { categories } from "../lib/products";

export function ProductCategories() {
  return (
    <section id="categories" className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-28">
      <div className="mb-7 flex items-end justify-between gap-6 md:mb-10">
        <div>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#D6B36A]">
            Danh mục
          </p>
          <h2 className="max-w-md text-[1.9rem] font-bold tracking-tight text-[#fff8ef] md:text-4xl">
            Chọn đúng nhóm sản phẩm đang ưu đãi
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm leading-relaxed text-[#f3e1ca]/62 md:block">
          SADU MATE kết hợp xạ đen, lá sen và hoa cúc trong công thức thanh nhẹ, tiện pha và phù hợp với người muốn bắt đầu một thói quen tốt đơn giản, sạch.
        </p>
      </div>

      <div className="scrollbar-none -mx-5 flex gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={cat.href}
            className="group relative aspect-[3/4] w-[62vw] shrink-0 overflow-hidden rounded-[22px] bg-[#222222] sm:w-[38vw] md:w-auto"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs text-white/70">{cat.count} sản phẩm</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{cat.name}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-white/90">
                Xem ngay
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
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
