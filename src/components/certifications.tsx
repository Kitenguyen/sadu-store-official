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

export function Certifications() {
  const slides = [...CERTS, ...CERTS];

  return (
    <section id="certifications" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24">
      <div className="overflow-hidden rounded-[24px] bg-white p-8 md:p-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#222222] md:text-3xl">
            Chứng nhận & tiêu chuẩn
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#222222]/60">
            Các chứng nhận được trình bày trực quan theo dải ảnh để khách dễ theo dõi và tăng độ tin cậy khi xem landing page.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="certification-marquee flex w-max gap-5">
            {slides.map((cert, index) => (
              <article
                key={`${cert.label}-${index}`}
                className="w-[250px] shrink-0 overflow-hidden rounded-[22px] border border-[#1E5B38]/10 bg-[#F8F6F0] shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-white">
                  <img
                    src={cert.image}
                    alt={cert.label}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-sm font-semibold text-[#222222]">{cert.label}</p>
                  <p className="text-xs leading-relaxed text-[#222222]/60">{cert.detail}</p>
                </div>
              </article>
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
