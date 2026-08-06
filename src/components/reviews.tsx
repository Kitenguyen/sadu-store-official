import { useState } from "react";
import { assetUrl } from "../lib/site";

const REVIEWS = [
  {
    name: "Thu Hà",
    role: "Khách hàng thân thiết",
    quote:
      "Trà xạ đen lá sen của SADU thơm dịu, uống buổi tối ngủ ngon hơn hẳn. Đóng gói cũng rất đẹp để làm quà.",
    initials: "TH",
  },
  {
    name: "Minh Quân",
    role: "Đã mua 3 lần",
    quote:
      "Cà gai leo Xạ đen mình dùng cho ba mẹ, uống đều mỗi ngày thấy người khỏe hơn. Sẽ ủng hộ SADU dài lâu.",
    initials: "MQ",
  },
  {
    name: "Ngọc Anh",
    role: "Người mua đã xác minh",
    quote:
      "Thích nhất là bao bì có ghi rõ nguồn gốc VietGAP, uống yên tâm. Vị trà cũng đậm đà hơn loại mình từng dùng.",
    initials: "NA",
  },
];

export function Reviews() {
  const [index, setIndex] = useState(0);
  const active = REVIEWS[index];

  return (
    <section className="relative mx-auto max-w-[1440px] overflow-hidden px-5 py-14 md:px-10 md:py-28">
      <img
        src={assetUrl("/assets/plates/botanical-wash.webp")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-[26rem] w-[26rem] object-contain opacity-[0.1]"
      />
      <div className="mb-7 flex items-end justify-between md:mb-10">
        <div>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#D6B36A]">
            Khách hàng nói gì
          </p>
          <h2 className="text-[1.9rem] font-bold tracking-tight text-[#fff8ef] md:text-4xl">
            Được tin dùng mỗi ngày
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Đánh giá trước"
            onClick={() => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#fff8ef] transition hover:bg-white/8 active:scale-90"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Đánh giá tiếp theo"
            onClick={() => setIndex((i) => (i + 1) % REVIEWS.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#fff8ef] transition hover:bg-white/8 active:scale-90"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="rounded-[24px] border border-[#d6b36a]/14 bg-[linear-gradient(135deg,#1a130f,#231913)] p-5 shadow-[0_35px_80px_-50px_rgba(0,0,0,0.82)] md:rounded-[28px] md:p-14">
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="text-[#d6b36a]/34">
          <path
            d="M0 26V15.5C0 6.5 5 1 13 0v6C8 7 5 9.5 4.5 13.5H13V26H0ZM21 26V15.5C21 6.5 26 1 34 0v6c-5 1-8 3.5-8.5 7.5H34V26H21Z"
            fill="currentColor"
          />
        </svg>
        <p className="mt-3 max-w-2xl text-lg font-medium leading-8 text-[#fff8ef] md:mt-4 md:text-2xl md:leading-relaxed">
          {active.quote}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E5B38] text-sm font-semibold text-white">
            {active.initials}
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#fff8ef]">
              {active.name}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1E5B38">
                <path d="M12 2l2.4 1.4 2.8-.4 1 2.6 2.6 1-.4 2.8L22 12l-1.6 2.4.4 2.8-2.6 1-1 2.6-2.8-.4L12 22l-2.4-1.6-2.8.4-1-2.6-2.6-1 .4-2.8L2 12l1.6-2.4-.4-2.8 2.6-1 1-2.6 2.8.4L12 2Z" />
                <path d="M9 12.3l2 2 4-4.3" stroke="#FAF9F5" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            </p>
            <p className="text-xs text-[#f3e1ca]/55">{active.role}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          {REVIEWS.map((r, i) => (
            <button
              key={r.name}
              type="button"
              aria-label={`Xem đánh giá của ${r.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-[#D6B36A]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
