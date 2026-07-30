import { assetUrl } from "../lib/site";

const ITEMS = [
  {
    icon: assetUrl("/assets/icons/leaf.png"),
    title: "Nguyên liệu tự nhiên",
    body: "Thảo dược hái tay từ vùng cao nguyên, không thuốc trừ sâu, không chất hóa học.",
    span: "md:col-span-2 md:row-span-2",
    tone: "bg-[#1E5B38] text-[#FAF9F5]",
    invert: true,
  },
  {
    icon: assetUrl("/assets/icons/shield.png"),
    title: "Đổi trả 7 ngày",
    body: "Giữ theo thông tin trên hình sản phẩm và chính sách đổi trả đã được cập nhật lại ở footer.",
    span: "md:col-span-1",
    tone: "bg-white text-[#222222]",
  },
  {
    icon: assetUrl("/assets/icons/truck.png"),
    title: "Free ship từ 250.000đ",
    body: "Thông điệp giao hàng đã được đồng bộ ở banner, cart drawer và phần liên hệ.",
    span: "md:col-span-1",
    tone: "bg-[#BFD8C3]/60 text-[#222222]",
  },
  {
    icon: assetUrl("/assets/icons/nochem.png"),
    title: "Không chất bảo quản",
    body: "Sấy khô tự nhiên, không phụ gia, an toàn cho cả gia đình.",
    span: "md:col-span-1",
    tone: "bg-white text-[#222222]",
  },
  {
    icon: assetUrl("/assets/icons/cup.png"),
    title: "Ưu đãi rõ ràng",
    body: "Sản phẩm khuyến mại hiển thị giá cũ, giá mới và badge giảm giá để khách dễ quyết định.",
    span: "md:col-span-1",
    tone: "bg-[#D6B36A]/25 text-[#222222]",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <div className="mb-10">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#D6B36A]">Vì sao chọn SADU</p>
        <h2 className="max-w-lg text-3xl font-bold tracking-tight text-[#222222] md:text-4xl">Một tách trà, trọn niềm tin</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className={`flex flex-col justify-between rounded-[22px] p-6 transition-transform duration-300 hover:-translate-y-1 ${item.tone} ${item.span}`}
          >
            <img src={item.icon} alt="" aria-hidden="true" className={`h-9 w-9 ${item.invert ? "brightness-0 invert" : ""}`} />
            <div className="mt-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-75">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
