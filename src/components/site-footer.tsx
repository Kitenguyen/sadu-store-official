const CONTACT_PHONE = "0355532863";

const QUICK_LINKS = [
  { label: "Trà Mate", href: "#mate-collection" },
  { label: "Trà túi lọc khuyến mại", href: "#promo-products" },
  { label: "Combo khuyến mại", href: "#bundle" },
  { label: "Thanh toán", href: "#products" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#1E5B38] pb-24 pt-16 text-[#FAF9F5] md:pb-12 md:pt-14">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm md:px-8 md:py-9">
          <div className="grid gap-8 lg:grid-cols-[1.25fr,0.85fr,0.9fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/12">
                  <img src="/assets/brand/mark.png" alt="" aria-hidden="true" className="h-full w-full object-cover" />
                </span>
                <div>
                  <p className="text-lg font-extrabold tracking-tight">SADU</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">Thảo dược Việt Nam</p>
                </div>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/68">
                Ngày 18/5/2016 SADU ra đời với sứ mệnh đặc biệt, làm lan tỏa và biến vùng nguyên liệu sạch trở thành
                từng sản phẩm thảo dược giá trị tới tay người tiêu dùng.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Khám phá nhanh</p>
              <ul className="mt-4 grid gap-2.5 text-sm text-white/78">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="transition hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Liên hệ</p>
              <div className="mt-4 space-y-3 text-sm text-white/78">
                <p>Hotline / Zalo: {CONTACT_PHONE}</p>
                <p>Công ty Cổ phần Nông nghiệp Công nghệ cao Thăng Long</p>
                <p>Đoàn Kết, Đại Yên, Chương Mỹ, Hà Nội</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="rounded-full bg-[#FAF9F5] px-4 py-2.5 text-sm font-semibold text-[#1E5B38] transition hover:bg-white"
                >
                  Gọi ngay
                </a>
                <a
                  href={`https://zalo.me/${CONTACT_PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/18 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  Zalo tư vấn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© 2026 SADU. Toàn bộ quyền được bảo lưu.</p>
            <p>Miễn phí vận chuyển từ 250.000đ · Đổi trả trong 7 ngày.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
