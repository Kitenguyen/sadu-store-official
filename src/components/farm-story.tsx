import { assetUrl } from "../lib/site";
import { ExpandableText } from "./expandable-text";

const STEPS = [
  {
    year: "Bước 1",
    title: "Gieo trồng tự nhiên",
    body: "Vùng nguyên liệu SADU được chăm sóc theo hướng sạch và bền vững, ưu tiên độ lành của đất, nguồn nước và nhịp sinh trưởng tự nhiên của cây.",
    image: assetUrl("/assets/farm/farm-step-1.png"),
  },
  {
    year: "Bước 2",
    title: "Thu hái đúng thời điểm",
    body: "Người làm vườn thu hái thủ công theo từng đợt, chọn phần nguyên liệu đạt độ tươi tốt nhất để giữ được hương thơm và dược tính tự nhiên.",
    image: assetUrl("/assets/farm/farm-step-2.png"),
  },
  {
    year: "Bước 3",
    title: "Sấy khô và hoàn thiện",
    body: "Nguyên liệu sau thu hoạch được làm sạch, sấy ở nhiệt độ phù hợp và đóng gói trong quy trình kiểm soát chặt chẽ để giữ trọn chất lượng.",
    image: assetUrl("/assets/farm/drying.jpg"),
  },
];

export function FarmStory() {
  return (
    <section id="farm-story" className="bg-[linear-gradient(180deg,#18110d,#120d09)] py-14 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-8 max-w-xl md:mb-14">
          <h2 className="text-[1.9rem] font-bold tracking-tight text-[#fff8ef] md:text-4xl">
            Câu chuyện từ nông trại
          </h2>
          <ExpandableText
            text="Mỗi sản phẩm SADU bắt đầu từ vùng nguyên liệu sạch, nơi cây được chăm bằng kinh nghiệm thực tế và sự kiên nhẫn của người làm nông qua nhiều mùa vụ."
            previewLines={3}
            className="mt-3 text-[13px] leading-6 text-[#f3e1ca]/68 md:mt-4 md:text-base md:leading-relaxed"
            buttonClassName="mt-2 text-[12px] font-semibold text-[#d6b36a] md:hidden"
          />
          <a
            href="#certifications"
            className="mt-4 inline-block text-sm font-medium text-[#f0d5ae] underline decoration-[#D6B36A] decoration-2 underline-offset-4 md:mt-5"
          >
            Xem thêm tiêu chuẩn chất lượng
          </a>
        </div>

        <div className="space-y-10 md:space-y-24">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`flex flex-col gap-5 md:items-center md:gap-14 ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[24px] md:w-3/5">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-2/5">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#D6B36A]">
                  {step.year}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-[#fff8ef] md:mt-3 md:text-2xl">{step.title}</h3>
                <ExpandableText
                  text={step.body}
                  previewLines={3}
                  className="mt-2 max-w-md text-[13px] leading-6 text-[#f3e1ca]/68 md:mt-3 md:text-sm md:leading-relaxed"
                  buttonClassName="mt-2 text-[12px] font-semibold text-[#d6b36a] md:hidden"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
