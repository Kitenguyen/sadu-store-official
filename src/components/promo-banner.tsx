import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { hours, minutes, seconds };
}

function two(n: number) {
  return String(n).padStart(2, "0");
}

function TimerBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-[58px] rounded-2xl bg-white/10 px-3 py-2 text-center">
      <div className="text-base font-bold tracking-[0.16em] text-white">{two(value)}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/55">{label}</div>
    </div>
  );
}

export function PromoBanner() {
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 8);
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <div className="relative overflow-hidden bg-[#1E5B38] py-4 text-[#FAF9F5]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 md:px-10">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-5">
          <span>🚚 Miễn phí vận chuyển cho đơn hàng từ 250.000đ</span>
          <span>🎁 Đơn đầu tiên nhận Voucher 5.000đ</span>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/6 px-5 py-5 text-center md:flex-row md:text-left">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full bg-[#D6B36A] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1E5B38]">
              Flash Sale
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Today Only</h2>
            <p className="mt-2 text-sm text-white/70">Save up to 30% cho các dòng trà túi lọc và combo khuyến mại.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <TimerBox label="HH" value={remaining.hours} />
            <TimerBox label="MM" value={remaining.minutes} />
            <TimerBox label="SS" value={remaining.seconds} />
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("promo-products");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="whitespace-nowrap rounded-full bg-[#D6B36A] px-5 py-3 text-sm font-semibold text-[#222222] transition hover:brightness-105 active:scale-[0.97]"
          >
            Xem ưu đãi ngay
          </button>
        </div>
      </div>
    </div>
  );
}
