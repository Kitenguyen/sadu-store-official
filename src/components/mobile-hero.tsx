import { assetUrl } from "../lib/site";

export function MobileHero() {
  return (
    <section className="relative overflow-hidden bg-[#120d09] pt-18">
      <img
        src={assetUrl("/assets/iloveimg-compressed/img-hero.png")}
        alt="Bộ sưu tập trà thảo dược SADU trên nền lá trà xanh"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-top opacity-24 blur-2xl"
      />
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[linear-gradient(180deg,rgba(18,13,9,0.1),rgba(18,13,9,0.18)_26%,rgba(18,13,9,0.72)_76%,rgba(18,13,9,0.98)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(circle_at_top,rgba(214,179,106,0.18),transparent_58%)]" />

      <div className="relative mx-auto max-w-[1440px] px-4 pb-5">
        <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[rgba(23,16,12,0.82)] shadow-[0_35px_80px_-40px_rgba(0,0,0,0.82)]">
          <div className="relative h-[37.5rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,179,106,0.22),transparent_52%)]" />
            <img
              src={assetUrl("/assets/iloveimg-compressed/img-hero.png")}
              alt="Bộ sưu tập trà thảo dược SADU trên nền lá trà xanh"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-contain object-top"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,10,7,0.06),rgba(16,10,7,0.18)_26%,rgba(16,10,7,0.72)_58%,rgba(16,10,7,0.95)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 pb-3.5">
              <div className="rounded-[26px] border border-[#f0d5ae]/14 bg-[linear-gradient(180deg,rgba(30,20,15,0.84),rgba(18,13,10,0.96))] p-3.5 shadow-[0_24px_70px_-38px_rgba(0,0,0,0.92)] backdrop-blur-md">
                <div className="inline-flex items-center rounded-full border border-[#d6b36a]/22 bg-[#d6b36a]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f0d5ae]">
                  SADU Store Official
                </div>
                <h1 className="mt-2.5 max-w-[12ch] text-[1.58rem] font-bold leading-[1.03] tracking-tight text-[#fff8ef]">
                  Trà thảo dược từ vùng trồng Vietgap cho nhịp sống nhẹ và lành mỗi ngày.
                </h1>
                <p className="mt-2 max-w-[30ch] text-base leading-[1.5] text-[#f6e8d4]/78">
                  Từ xạ đen, lá sen đến hoa cúc, SADU mang đến những hộp trà tiện pha, dễ uống
                  và dễ chọn cho nhu cầu sử dụng hằng ngày.
                </p>

                <div className="mt-2.5 flex flex-wrap gap-2 text-[12px] leading-5 text-[#f0d5ae]/82">
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
                    Miễn phí ship từ 250K
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
                    Đổi trả trong 7 ngày
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="#products"
                    className="inline-flex min-h-[50px] items-center rounded-full bg-[#d6b36a] px-4.5 py-3 text-[15px] font-semibold text-[#1a120c] shadow-[0_14px_30px_-18px_rgba(214,179,106,0.9)] transition hover:brightness-105 active:scale-[0.98]"
                  >
                    Xem sản phẩm nổi bật
                  </a>
                  <a
                    href="#ingredients"
                    className="inline-flex min-h-[50px] items-center text-[15px] font-medium text-[#f3e1ca] transition hover:text-white"
                  >
                    Xem nguyên liệu
                  </a>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-[#f0d5ae]/66">
                  <span>100% tự nhiên</span>
                  <span>Đơn từ 250K</span>
                  <span>Đổi trả 7 ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
