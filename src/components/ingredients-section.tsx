import { assetUrl } from "../lib/site";
import { ExpandableText } from "./expandable-text";

const INGREDIENTS = [
  {
    title: "Tuyển lá thủ công",
    note: "Chọn mẻ lá đồng đều để khi pha lên nước trà có màu sâu và vị thanh ổn định.",
    image: assetUrl("/assets/iloveimg-compressed/nguyen-lieu-(10).jpg"),
  },
  {
    title: "Giữ sắc xanh tự nhiên",
    note: "Màu lá được giữ lại nhờ quy trình làm sạch và sấy ở nhiệt độ phù hợp.",
    image: assetUrl("/assets/iloveimg-compressed/nguyen-lieu-(11).jpg"),
  },
  {
    title: "Lọc phần non thơm",
    note: "Ưu tiên những phần lá có mùi thơm dịu và hậu vị dễ uống cho nhiều đối tượng.",
    image: assetUrl("/assets/iloveimg-compressed/nguyen-lieu-(12).jpg"),
  },
  {
    title: "Phối vị bằng hoa quả",
    note: "Một số công thức dùng thêm thành phần tạo hương để vị trà cân bằng và dễ tiếp cận hơn.",
    image: assetUrl("/assets/iloveimg-compressed/nguyen-lieu-(13).jpg"),
  },
  {
    title: "Lá bản địa tuyển chọn",
    note: "Nguồn nguyên liệu được chọn từ vùng trồng có kiểm soát để đảm bảo độ đồng nhất.",
    image: assetUrl("/assets/iloveimg-compressed/nguyen-lieu-(14).jpg"),
  },
  {
    title: "Làm sạch trước khi phối",
    note: "Trước khi đóng gói, nguyên liệu được sàng lọc kỹ để giữ cảm giác sạch và nhẹ.",
    image: assetUrl("/assets/iloveimg-compressed/nguyen-lieu-(15).jpg"),
  },
  {
    title: "Sấy giữ mùi trà",
    note: "Mục tiêu của từng mẻ là giữ mùi lá rõ, không nồng gắt và không mất đi hậu thơm.",
    image: assetUrl("/assets/iloveimg-compressed/nguyen-lieu-(16).jpg"),
  },
  {
    title: "Cân bằng vị trà mỗi ngày",
    note: "Từng công thức được điều chỉnh để dễ uống, thơm dịu và giữ hậu vị sạch khi dùng thường xuyên.",
    image: assetUrl("/assets/iloveimg-compressed/nguyen-lieu-(17).jpg"),
  },
];

export function IngredientsSection() {
  return (
    <section
      id="ingredients"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#18110d_0%,#120d09_100%)] py-14 md:py-28"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b36a]/45 to-transparent" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d6b36a]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-8 grid gap-5 lg:mb-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
          <div>
            <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#d6b36a]">
              Nguồn nguyên liệu
            </p>
            <h2 className="max-w-3xl text-[1.9rem] font-bold tracking-tight text-[#fff8ef] md:text-5xl">
              Mỗi hộp trà SADU bắt đầu từ nguyên liệu sạch, được chọn kỹ để giữ hương thơm dịu và cảm giác dễ uống mỗi ngày.
            </h2>
          </div>
          <ExpandableText
            text="Từ lá, hoa đến thảo mộc, từng thành phần đều được xử lý cẩn thận để khi pha lên vẫn tròn vị, thanh mùi và hợp nhịp uống hằng ngày của gia đình Việt."
            previewLines={3}
            className="max-w-xl text-[13px] leading-6 text-[#f3e1ca]/70 md:text-base md:leading-7"
            buttonClassName="mt-2 text-[12px] font-semibold text-[#d6b36a] md:hidden"
          />
        </div>

        <div className="mb-5 rounded-[24px] border border-[#d6b36a]/16 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_40px_80px_-55px_rgba(0,0,0,0.85)] md:mb-6 md:rounded-[30px] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-3">
              <p className="inline-flex rounded-full border border-[#d6b36a]/22 bg-[#d6b36a]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d5ae]">
                Craftsmanship
              </p>
              <h3 className="text-xl font-semibold text-[#fff8ef] md:text-3xl">
                Từ độ xanh của lá đến mùi thơm trong tách trà, mọi thứ đều cần kiểm soát bằng mắt và bằng tay.
              </h3>
              <ExpandableText
                text="Phần nguyên liệu giúp landing page kể rõ hơn câu chuyện sản phẩm: sạch, có chọn lọc và có chủ đích trong từng công thức trà túi lọc của SADU."
                previewLines={3}
                className="max-w-2xl text-[13px] leading-6 text-[#f3e1ca]/72 md:text-base md:leading-7"
                buttonClassName="mt-2 text-[12px] font-semibold text-[#d6b36a] md:hidden"
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:gap-4">
              {[
                "Hái chọn theo lứa",
                "Sấy giữ mùi tự nhiên",
                "Đóng gói rõ nguồn gốc",
                "Phù hợp nhịp uống hằng ngày",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-white/8 bg-black/14 p-3 text-[12px] font-medium text-[#fff1df]/88 md:rounded-[22px] md:p-4 md:text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-5">
          {INGREDIENTS.map((item) => (
            <article
              key={item.image}
              className="group overflow-hidden rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.03)] shadow-[0_25px_60px_-40px_rgba(0,0,0,0.8)]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                />
              </div>
              <div className="space-y-1.5 p-3 md:space-y-2 md:p-4">
                <h3 className="text-[13px] font-semibold text-[#fff8ef] md:text-base">{item.title}</h3>
                <p className="text-[11px] leading-5 text-[#f3e1ca]/64 md:text-sm md:leading-6">
                  {item.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
