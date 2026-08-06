import { useState } from "react";

export const FAQS = [
  {
    q: "Trà SADU có phù hợp uống hằng ngày không?",
    a: "Có. Các dòng trà thảo dược SADU được thiết kế để dùng đều đặn mỗi ngày, nguyên liệu 100% tự nhiên và không chất bảo quản.",
  },
  {
    q: "Phí vận chuyển đang được áp dụng như thế nào?",
    a: "SADU miễn phí vận chuyển cho mọi đơn hàng từ 250.000đ trên toàn website.",
  },
  {
    q: "Thời gian giao hàng là bao lâu?",
    a: "Đơn nội thành thường giao trong 24 giờ, các tỉnh thành khác từ 2 đến 4 ngày làm việc tùy khu vực.",
  },
  {
    q: "Tôi có thể đổi trả sản phẩm không?",
    a: "Có. SADU hỗ trợ đổi trả trong vòng 7 ngày theo chính sách shipping & returns hiện hành.",
  },
  {
    q: "Liên hệ tư vấn ở đâu?",
    a: "Bạn có thể gọi hoặc nhắn Zalo số 0355532863 để được tư vấn nhanh, hoặc liên hệ Công ty Cổ phần Nông nghiệp Công nghệ cao Thăng Long tại Đoàn Kết, Đại Yên, Chương Mỹ, Hà Nội.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="mb-7 text-center md:mb-10">
          <h2 className="text-[1.9rem] font-bold tracking-tight text-[#fff8ef] md:text-4xl">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.05)] shadow-[0_18px_45px_-35px_rgba(0,0,0,0.85)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-[#fff8ef] md:text-base">{item.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D6B36A"
                    strokeWidth="2"
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#f3e1ca]/68">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
