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
    <section className="relative mx-auto max-w-[1440px] overflow-hidden px-5 py-20 md:px-10 md:py-28">
      <img
        src={assetUrl("/assets/plates/botanical-wash.webp")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-[26rem] w-[26rem] object-contain opacity-[0.14]"
      />
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#D6B36A]">
            Khách hàng nói gì
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#222222] md:text-4xl">
            Được tin dùng mỗi ngày
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Đánh giá trước"
            onClick={() => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#222222] transition hover:bg-black/5 active:scale-90"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Đánh giá tiếp theo"
            onClick={() => setIndex((i) => (i + 1) % REVIEWS.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#222222] transition hover:bg-black/5 active:scale-90"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="rounded-[24px] bg-[#BFD8C3]/40 p-8 md:p-14">
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="text-[#1E5B38]/40">
          <path
            d="M0 26V15.5C0 6.5 5 1 13 0v6C8 7 5 9.5 4.5 13.5H13V26H0ZM21 26V15.5C21 6.5 26 1 34 0v6c-5 1-8 3.5-8.5 7.5H34V26H21Z"
            fill="currentColor"
          />
        </svg>
        <p className="mt-4 max-w-2xl text-xl font-medium leading-relaxed text-[#222222] md:text-2xl">
          {active.quote}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E5B38] text-sm font-semibold text-white">
            {active.initials}
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#222222]">
              {active.name}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1E5B38">
                <path d="M12 2l2.4 1.4 2.8-.4 1 2.6 2.6 1-.4 2.8L22 12l-1.6 2.4.4 2.8-2.6 1-1 2.6-2.8-.4L12 22l-2.4-1.6-2.8.4-1-2.6-2.6-1 .4-2.8L2 12l1.6-2.4-.4-2.8 2.6-1 1-2.6 2.8.4L12 2Z" />
                <path d="M9 12.3l2 2 4-4.3" stroke="#FAF9F5" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            </p>
            <p className="text-xs text-[#222222]/55">{active.role}</p>
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
                i === index ? "w-8 bg-[#1E5B38]" : "w-1.5 bg-[#1E5B38]/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
