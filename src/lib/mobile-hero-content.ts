import { assetUrl } from "./site";

export type MobileHeroQueryVariant = "ca-gai-leo-xa-den" | "ca-gai-leo" | "trung-ga-thao-duoc";

export type MobileHeroVariant = MobileHeroQueryVariant | "default";

const MOBILE_HERO_QUERY_ALIASES: Record<string, MobileHeroQueryVariant> = {
  "ca-gai-leo-xa-den": "ca-gai-leo-xa-den",
  "ca-gai-leo-xa-den-dung": "ca-gai-leo-xa-den",
  "ca-gai-leo": "ca-gai-leo",
  "ca-gai-leo-tien": "ca-gai-leo",
  "trung-ga-thao-duoc": "trung-ga-thao-duoc",
};
export interface MobileHeroContent {
  badge: string;
  title: string;
  body: string;
  chips: string[];
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  footerTags: string[];
  image: string;
  imageAlt: string;
  imagePanelClass?: string;
  imageClass?: string;
  collectionKicker: string;
  collectionTitle: string;
  collectionBody?: string;
  collectionProductIds: string[];
}

export const MOBILE_HERO_CONTENT: Record<MobileHeroVariant, MobileHeroContent> = {
  default: {
    badge: "SADU Store Official",
    title: "Trà thảo dược từ vùng trồng VietGAP cho nhịp sống nhẹ và lành mỗi ngày.",
    body: "Từ xạ đen, lá sen đến hoa cúc, SADU chọn kỹ nguyên liệu từ vùng trồng sạch để tạo nên những hộp trà tiện pha, dễ uống và hợp nếp sống hằng ngày.",
    chips: ["Miễn phí ship từ 250K", "Đổi trả trong 7 ngày"],
    primaryLabel: "Khám phá bộ sưu tập",
    primaryHref: "#featured-collection",
    secondaryLabel: "Xem ưu đãi hôm nay",
    secondaryHref: "#promo-products",
    footerTags: ["100% tự nhiên", "Đơn từ 250K", "Đổi trả 7 ngày"],
    image: assetUrl("/assets/iloveimg-compressed/img-hero.png"),
    imageAlt: "Bộ sưu tập trà thảo dược SADU trên nền lá trà xanh",
    imagePanelClass: "bg-[linear-gradient(180deg,rgba(37,31,20,0.96),rgba(18,13,9,0.92))] p-4",
    imageClass: "object-contain object-top",
    collectionKicker: "Mate collection",
    collectionTitle: "Bộ sưu tập Trà Mate",
    collectionProductIds: [
      "sadu-mate-xa-den",
      "sadu-mate-xa-den-hoa-cuc",
      "sadu-mate-xa-den-la-sen",
      "combo-mate-xa-den-3-tang-1",
      "combo-mate-la-sen-3-tang-1",
      "combo-mate-hoa-cuc-3-tang-1",
    ],
  },
  "ca-gai-leo-xa-den": {
    badge: "Công thức thảo mộc chủ lực của SADU",
    title: "Cà gai leo xạ đen thanh mát, dễ uống mỗi ngày cho người muốn chăm gan và sống nhẹ hơn",
    body: "Kết hợp cà gai leo và xạ đen trong một công thức thảo mộc đậm vị, dễ dùng hằng ngày. Phù hợp cho người thường xuyên ăn uống thất thường, hay dùng đồ nóng dầu mỡ hoặc muốn duy trì một thói quen thanh mát, dễ chịu cho cơ thể.",
    chips: ["Thanh mát dễ uống", "Thảo mộc quen thuộc", "Tiện pha mỗi ngày"],
    primaryLabel: "Xem bộ sưu tập đang bán",
    primaryHref: "#featured-collection",
    secondaryLabel: "Xem gói 1kg đang sale",
    secondaryHref: "#tra-ca-gai-leo-xa-den-1kg",
    footerTags: ["Dễ uống hằng ngày", "Vị đậm thanh mát", "Giao hàng toàn quốc"],
    image: assetUrl("/assets/hero/ca-gai-leo-xa-den-mobile.png"),
    imageAlt: "Trà cà gai leo xạ đen SADU trong giỏ mây giữa vườn cây",
    imagePanelClass: "bg-[linear-gradient(180deg,rgba(73,84,38,0.9),rgba(29,22,17,0.96))] p-3",
    imageClass: "object-contain object-center",
    collectionKicker: "Cà gai leo xạ đen",
    collectionTitle: "Bộ sưu tập Trà Cà Gai Leo Xạ Đen",
    collectionBody:
      "Tập trung đúng hai lựa chọn khách chốt đơn nhiều nhất cho quảng cáo này: gói 500g dễ vào đơn và gói 1kg đang có giá sale.",
    collectionProductIds: ["promo-ca-gai-leo-xa-den-500g", "promo-ca-gai-leo-xa-den-1kg"],
  },
  "ca-gai-leo": {
    badge: "Dòng trà thảo mộc dễ duy trì mỗi ngày",
    title: "Trà cà gai leo thanh mộc, dễ uống và phù hợp cho nhịp sống cần sự nhẹ nhàng mỗi ngày",
    body: "Tập trung vào nguyên liệu cà gai leo với hương vị mộc dịu, dễ làm quen và dễ duy trì thành thói quen hằng ngày. Phù hợp cho người yêu trà thảo mộc, muốn chọn một thức uống đơn giản, thanh mát và dễ gắn bó lâu dài.",
    chips: ["Vị mộc dễ uống", "Nguyên liệu tuyển chọn", "Dùng nóng hoặc lạnh"],
    primaryLabel: "Xem bộ sưu tập đang bán",
    primaryHref: "#featured-collection",
    secondaryLabel: "Xem gói 1kg đang sale",
    secondaryHref: "#tra-tui-loc-ca-gai-leo-1kg",
    footerTags: ["Thói quen uống lành", "Dễ duy trì mỗi ngày", "Ưu đãi đang áp dụng"],
    image: assetUrl("/assets/hero/ca-gai-leo-mobile.webp"),
    imageAlt: "Khách hàng dùng trà cà gai leo SADU trong không gian sống thư thái",
    imagePanelClass: "bg-[linear-gradient(180deg,rgba(93,79,62,0.8),rgba(25,19,15,0.96))] p-2",
    imageClass: "object-contain object-center",
    collectionKicker: "Trà cà gai leo",
    collectionTitle: "Bộ sưu tập Trà Cà Gai Leo",
    collectionBody:
      "Giữ đúng hai mức giá dễ chốt cho quảng cáo trà cà gai leo: bản 500g để khách vào thử trước và bản 1kg đang có khuyến mãi rõ ràng.",
    collectionProductIds: ["promo-ca-gai-leo-500g", "promo-ca-gai-leo-1kg"],
  },
  "trung-ga-thao-duoc": {
    badge: "Trứng gà sạch từ trang trại SADU",
    title: "Trứng gà không kháng sinh, thơm ngon tự nhiên, ăn đậm vị mà không tanh",
    body: "Từ đàn gà được chăm sóc theo quy trình sạch và khẩu phần thảo dược, cho ra những quả trứng thơm hơn, béo hơn và dễ dùng trong bữa ăn hằng ngày. Phù hợp cho gia đình muốn chọn thực phẩm ngon, lành và rõ nguồn gốc.",
    chips: ["Không kháng sinh", "Thơm ngon tự nhiên", "Nguồn gốc rõ ràng"],
    primaryLabel: "Xem combo đang bán",
    primaryHref: "#featured-collection",
    secondaryLabel: "Xem combo 6 tặng 2",
    secondaryHref: "#combo-trung-ga-thao-duoc-6-tang-2-tia-to",
    footerTags: ["Trứng thơm ít tanh", "Bữa ăn ngon mỗi ngày", "Từ trang trại SADU"],
    image: assetUrl("/assets/hero/trung-ga-thao-duoc-mobile.png"),
    imageAlt: "Trứng gà không kháng sinh SADU từ đàn gà ăn thảo dược",
    imagePanelClass: "bg-[#18381e] p-0",
    imageClass: "object-cover object-center",
    collectionKicker: "Combo trứng gà thảo dược",
    collectionTitle: "Bộ sưu tập Combo Trứng Gà Thảo Dược",
    collectionBody:
      "Đẩy đúng hai lựa chọn bán hàng cho quảng cáo trứng: combo 3 tặng 1 dễ chốt và combo 6 tặng 2 tặng thêm 1 hộp cà gai leo tía tô 100g cho khách mua số lượng lớn.",
    collectionProductIds: [
      "combo-trung-ga-thao-duoc-3-tang-1",
      "combo-trung-ga-thao-duoc-6-tang-2-tia-to",
    ],
  },
};

export function resolveMobileHeroVariant(hero?: string): MobileHeroVariant {
  if (hero && hero in MOBILE_HERO_QUERY_ALIASES) {
    return MOBILE_HERO_QUERY_ALIASES[hero];
  }

  return "default";
}
