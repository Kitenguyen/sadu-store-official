const STEPS = [
  {
    year: "Bước 1",
    title: "Gieo trồng tự nhiên",
    body: "Vùng nguyên liệu SADU được chăm sóc theo hướng sạch và bền vững, ưu tiên độ lành của đất, nguồn nước và nhịp sinh trưởng tự nhiên của cây.",
    image: "/assets/farm/farm-step-1.png",
  },
  {
    year: "Bước 2",
    title: "Thu hái đúng thời điểm",
    body: "Người làm vườn thu hái thủ công theo từng đợt, chọn phần nguyên liệu đạt độ tươi tốt nhất để giữ được hương thơm và dược tính tự nhiên.",
    image: "/assets/farm/farm-step-2.png",
  },
  {
    year: "Bước 3",
    title: "Sấy khô và hoàn thiện",
    body: "Nguyên liệu sau thu hoạch được làm sạch, sấy ở nhiệt độ phù hợp và đóng gói trong quy trình kiểm soát chặt chẽ để giữ trọn chất lượng.",
    image: "/assets/farm/drying.jpg",
  },
];

export function FarmStory() {
  return (
    <section id="farm-story" className="bg-[#F4F2EB] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#222222] md:text-4xl">
            Câu chuyện từ nông trại
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#222222]/65">
            Mỗi sản phẩm SADU bắt đầu từ vùng nguyên liệu sạch, nơi cây được chăm bằng kinh nghiệm thực tế và sự kiên nhẫn của người làm nông qua nhiều mùa vụ.
          </p>
          <a
            href="#certifications"
            className="mt-5 inline-block text-sm font-medium text-[#1E5B38] underline decoration-[#D6B36A] decoration-2 underline-offset-4"
          >
            Xem thêm tiêu chuẩn chất lượng
          </a>
        </div>

        <div className="space-y-16 md:space-y-24">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`flex flex-col gap-8 md:items-center md:gap-14 ${
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
                <h3 className="mt-3 text-2xl font-semibold text-[#222222]">{step.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#222222]/65">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
