import { assetUrl } from "../lib/site";

const CERTS = [
  {
    label: "Thương hiệu vàng 2024",
    detail: "Chứng nhận thương hiệu vàng nông nghiệp Việt Nam",
    image: assetUrl("/assets/certifications/thuong-hieu-vang-2024.jpg"),
  },
  {
    label: "ATTP 2023",
    detail: "Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm",
    image: assetUrl("/assets/certifications/an-toan-thuc-pham-2023.jpg"),
  },
  {
    label: "Top 2 năm 2025",
    detail: "Hàng Việt Nam được người tiêu dùng yêu thích",
    image: assetUrl("/assets/certifications/top-2-2025.jpg"),
  },
  {
    label: "OCOP Cà Gai Leo",
    detail: "Sản phẩm trà túi lọc cà gai leo đạt 4 sao",
    image: assetUrl("/assets/certifications/ocop-ca-gai-leo-2023.jpg"),
  },
  {
    label: "OCOP Đinh Lăng 2024",
    detail: "Trà đinh lăng túi lọc đạt chứng nhận 4 sao",
    image: assetUrl("/assets/certifications/ocop-dinh-lang-2024.jpg"),
  },
  {
    label: "OCOP Đinh Lăng 2023",
    detail: "Trà túi lọc cà gai leo đinh lăng đạt 4 sao",
    image: assetUrl("/assets/certifications/ocop-dinh-lang-2023.jpg"),
  },
  {
    label: "OCOP Dây Đau Xương",
    detail: "Trà dây đau xương cà gai leo túi lọc đạt 4 sao",
    image: assetUrl("/assets/certifications/ocop-day-dau-xuong-2024.jpg"),
  },
  {
    label: "OCOP Trà Phúc",
    detail: "Sản phẩm trà phúc đạt 4 sao tiềm năng 5 sao",
    image: assetUrl("/assets/certifications/ocop-tra-phuc-2024.jpg"),
  },
  {
    label: "OCOP Xạ Đen La Hán",
    detail: "Trà xạ đen la hán quả túi lọc đạt 4 sao",
    image: assetUrl("/assets/certifications/ocop-xa-den-la-han-2024.jpg"),
  },
  {
    label: "OCOP Trà Gừng",
    detail: "Trà gừng túi lọc đạt chứng nhận 4 sao",
    image: assetUrl("/assets/certifications/ocop-tra-gung-2024.jpg"),
  },
];

function CertificationCard({
  label,
  detail,
  image,
}: {
  label: string;
  detail: string;
  image: string;
}) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.06)] shadow-[0_20px_50px_rgba(0,0,0,0.26)]">
      <div className="aspect-[4/5] overflow-hidden bg-white">
        <img src={image} alt={label} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-sm font-semibold text-[#fff8ef]">{label}</p>
        <p className="text-xs leading-relaxed text-[#f3e1ca]/62">{detail}</p>
      </div>
    </article>
  );
}

export function Certifications() {
  const slides = [...CERTS, ...CERTS];

  return (
    <section
      id="certifications"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-14 md:px-10 md:py-24"
    >
      <div className="overflow-hidden rounded-[24px] border border-[#d6b36a]/14 bg-[linear-gradient(135deg,#1a130f,#231913)] p-5 shadow-[0_40px_90px_-55px_rgba(0,0,0,0.85)] md:rounded-[28px] md:p-12">
        <div className="mb-7 text-center md:mb-10">
          <h2 className="text-[1.7rem] font-bold tracking-tight text-[#fff8ef] md:text-3xl">
            Chứng nhận & tiêu chuẩn
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#f3e1ca]/62 md:mt-3 md:text-sm">
            Các chứng nhận nổi bật được đưa lên trước để khách xem nhanh độ tin cậy của SADU
            ngay trên điện thoại.
          </p>
        </div>

        <div className="md:hidden">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#f0d5ae]/70">
              Vuốt ngang để xem
            </p>
            <div className="flex items-center gap-1">
              {CERTS.slice(0, 4).map((cert) => (
                <span key={cert.label} className="h-1.5 w-1.5 rounded-full bg-[#d6b36a]/55" />
              ))}
            </div>
          </div>

          <div className="scrollbar-none -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
            {CERTS.map((cert) => (
              <div key={cert.label} className="w-[76vw] shrink-0 snap-start">
                <CertificationCard {...cert} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden overflow-hidden md:block">
          <div className="certification-marquee flex w-max gap-5">
            {slides.map((cert, index) => (
              <div key={`${cert.label}-${index}`} className="w-[250px] shrink-0">
                <CertificationCard {...cert} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .certification-marquee {
          animation: certification-marquee 38s linear infinite;
        }

        .certification-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes certification-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .certification-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
