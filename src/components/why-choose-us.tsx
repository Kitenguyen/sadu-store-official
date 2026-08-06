import { assetUrl } from "../lib/site";

const ITEMS = [
  {
    icon: assetUrl("/assets/icons/leaf.png"),
    title: "Nguyên liệu tự nhiên",
    body: "Thảo dược hái tay từ vùng cao nguyên, không thuốc trừ sâu, không chất hóa học.",
    span: "md:col-span-2 md:row-span-2",
    tone: "bg-[linear-gradient(160deg,#2b1b13,#1b130f)] text-[#FAF9F5] border border-[#d6b36a]/14",
    invert: true,
  },
  {
    icon: assetUrl("/assets/icons/shield.png"),
    title: "Đổi trả 7 ngày",
    body: "Giữ theo thông tin trên hình sản phẩm và chính sách đổi trả đã được cập nhật lại ở footer.",
    span: "md:col-span-1",
    tone: "bg-white/6 text-[#fff8ef] border border-white/8",
  },
  {
    icon: assetUrl("/assets/icons/truck.png"),
    title: "Free ship từ 250.000đ",
    body: "Thông điệp giao hàng đã được đồng bộ ở banner, cart drawer và phần liên hệ.",
    span: "md:col-span-1",
    tone: "bg-[#d6b36a]/12 text-[#fff8ef] border border-[#d6b36a]/14",
  },
  {
    icon: assetUrl("/assets/icons/nochem.png"),
    title: "Không chất bảo quản",
    body: "Sấy khô tự nhiên, không phụ gia, an toàn cho cả gia đình.",
    span: "md:col-span-1",
    tone: "bg-white/6 text-[#fff8ef] border border-white/8",
  },
  {
    icon: assetUrl("/assets/icons/cup.png"),
    title: "Ưu đãi rõ ràng",
    body: "Sản phẩm khuyến mại hiển thị giá cũ, giá mới và badge giảm giá để khách dễ quyết định.",
    span: "md:col-span-1",
    tone: "bg-[#2a2017] text-[#fff8ef] border border-white/8",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-28">
      <div className="mb-7 md:mb-10">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#D6B36A]">
          Vì sao chọn SADU
        </p>
        <h2 className="max-w-lg text-[1.9rem] font-bold tracking-tight text-[#fff8ef] md:text-4xl">
          Một tách trà, trọn niềm tin
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className={`flex flex-col justify-between rounded-[22px] p-6 transition-transform duration-300 hover:-translate-y-1 ${item.tone} ${item.span}`}
          >
            <img
              src={item.icon}
              alt=""
              aria-hidden="true"
              className={`h-9 w-9 ${item.invert ? "brightness-0 invert" : ""}`}
            />
            <div className="mt-4 md:mt-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-[13px] leading-5 opacity-75 md:mt-2 md:text-sm md:leading-relaxed">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
