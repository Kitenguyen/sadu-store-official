import type { MobileHeroVariant } from "./mobile-hero-content";
import { assetUrl } from "./site";

export type SocialProofItem = {
  city: string;
  timeAgo: string;
  customer: string;
  avatar: string;
  combo: string;
  note: string;
};

type SocialProofFeedMap = Record<MobileHeroVariant, SocialProofItem[]>;

const AVATARS = {
  nu11: assetUrl("/assets/social-proof/nu-feedback (11).jpg"),
  nu4: assetUrl("/assets/social-proof/nu-feedback (4).jpg"),
  nam4: assetUrl("/assets/social-proof/nam-feedback (4).jpg"),
  nu8: assetUrl("/assets/social-proof/nu-feedback (8).jpg"),
  nu6: assetUrl("/assets/social-proof/nu-feedback (6).jpg"),
  nu9: assetUrl("/assets/social-proof/nu-feedback (9).jpg"),
  nam2: assetUrl("/assets/social-proof/nam-feedback (2).jpg"),
  nu12: assetUrl("/assets/social-proof/nu-feedback (12).jpg"),
} as const;

export const SOCIAL_PROOF_FEED: SocialProofFeedMap = {
  default: [
    {
      city: "Hà Nội",
      timeAgo: "3 phút trước",
      customer: "Chị Hương, Cầu Giấy",
      avatar: AVATARS.nu11,
      combo: "2 gói trà cà gai leo xạ đen 500g",
      note: "Khách muốn dùng mỗi ngày và ưu tiên vị thảo mộc đậm, dễ pha tại nhà.",
    },
    {
      city: "Hải Phòng",
      timeAgo: "8 phút trước",
      customer: "Anh Tuấn, Lê Chân",
      avatar: AVATARS.nam2,
      combo: "1 gói trà cà gai leo xạ đen 1kg",
      note: "Mua loại 1kg để dùng đều dài ngày cho cả nhà, ưu tiên mức giá tiết kiệm hơn.",
    },
    {
      city: "Bình Dương",
      timeAgo: "17 phút trước",
      customer: "Chị Diễm My, Dĩ An",
      avatar: AVATARS.nu12,
      combo: "1 gói trà cà gai leo 500g",
      note: "Khách thích vị mộc dịu và muốn bắt đầu với dung lượng vừa phải cho dễ duy trì.",
    },
    {
      city: "Đà Nẵng",
      timeAgo: "29 phút trước",
      customer: "Cô Hạnh, Hải Châu",
      avatar: AVATARS.nu8,
      combo: "combo 3 tặng 1 trứng gà thảo dược",
      note: "Khách đặt chung cho gia đình vì ưu tiên trứng thơm ngon, rõ nguồn gốc và dễ dùng hằng ngày.",
    },
  ],
  "ca-gai-leo-xa-den": [
    {
      city: "Hà Nội",
      timeAgo: "2 phút trước",
      customer: "Chị Lan, Thanh Xuân",
      avatar: AVATARS.nu4,
      combo: "2 gói trà cà gai leo xạ đen 500g",
      note: "Đặt để dùng mỗi ngày vì thích vị đậm và cảm giác thanh mát, dễ uống.",
    },
    {
      city: "TP.HCM",
      timeAgo: "6 phút trước",
      customer: "Anh Hưng, Phú Nhuận",
      avatar: AVATARS.nam4,
      combo: "1 gói trà cà gai leo xạ đen 1kg",
      note: "Khách mua loại 1kg để dùng lâu hơn và tối ưu giá theo khối lượng.",
    },
    {
      city: "Đà Nẵng",
      timeAgo: "11 phút trước",
      customer: "Chị Thảo, Hải Châu",
      avatar: AVATARS.nu6,
      combo: "3 gói trà cà gai leo xạ đen 500g",
      note: "Đặt chung cho nhóm văn phòng, ưu tiên trà dễ pha và tiện chia nhau dùng.",
    },
    {
      city: "Bình Dương",
      timeAgo: "18 phút trước",
      customer: "Chị Diễm My, Dĩ An",
      avatar: AVATARS.nu12,
      combo: "1 gói trà cà gai leo xạ đen 500g và 1 gói 1kg",
      note: "Khách muốn mua một gói dùng ngay và một gói lớn để dự trữ tại nhà.",
    },
    {
      city: "Cần Thơ",
      timeAgo: "27 phút trước",
      customer: "Cô Mai, Ninh Kiều",
      avatar: AVATARS.nu9,
      combo: "2 gói trà cà gai leo xạ đen 1kg",
      note: "Khách ưu tiên mua số lượng lớn để tiết kiệm chi phí cho nhu cầu dùng dài ngày.",
    },
  ],
  "ca-gai-leo": [
    {
      city: "Hà Nội",
      timeAgo: "1 phút trước",
      customer: "Chị Vân, Đống Đa",
      avatar: AVATARS.nu11,
      combo: "2 gói trà cà gai leo 500g",
      note: "Khách thích vị mộc dịu, muốn chọn dòng trà dễ làm quen để uống thường xuyên.",
    },
    {
      city: "Đà Nẵng",
      timeAgo: "5 phút trước",
      customer: "Cô Hạnh, Hải Châu",
      avatar: AVATARS.nu8,
      combo: "1 gói trà cà gai leo 1kg",
      note: "Chọn loại 1kg vì gia đình uống đều và muốn tối ưu giá theo khối lượng.",
    },
    {
      city: "TP.HCM",
      timeAgo: "9 phút trước",
      customer: "Anh Đức, Gò Vấp",
      avatar: AVATARS.nam2,
      combo: "3 gói trà cà gai leo 500g",
      note: "Khách đặt giúp người nhà, ưu tiên sản phẩm đơn giản, dễ uống và dễ duy trì.",
    },
    {
      city: "Hải Phòng",
      timeAgo: "16 phút trước",
      customer: "Chị Mai, Ngô Quyền",
      avatar: AVATARS.nu6,
      combo: "1 gói trà cà gai leo 500g và 1 gói 1kg",
      note: "Mua để thử trước rồi giữ sẵn thêm gói lớn cho nhu cầu dùng lâu dài.",
    },
    {
      city: "Bình Dương",
      timeAgo: "24 phút trước",
      customer: "Chị Diễm My, Dĩ An",
      avatar: AVATARS.nu12,
      combo: "2 gói trà cà gai leo 1kg",
      note: "Khách mua cùng đồng nghiệp vì thích dòng trà thanh mộc và mức giá tốt hơn khi lấy nhiều.",
    },
  ],
  "trung-ga-thao-duoc": [
    {
      city: "Hà Nội",
      timeAgo: "2 phút trước",
      customer: "Chị Hoa, Hoàng Mai",
      avatar: AVATARS.nu4,
      combo: "combo 3 tặng 1 trứng gà thảo dược",
      note: "Khách đặt cho gia đình nhỏ vì thích trứng thơm hơn, béo hơn và ăn không tanh.",
    },
    {
      city: "TP.HCM",
      timeAgo: "7 phút trước",
      customer: "Anh Bình, Tân Bình",
      avatar: AVATARS.nam4,
      combo: "2 hộp trứng gà thảo dược",
      note: "Khách muốn lấy trước số lượng vừa phải để dùng thử trong bữa sáng hằng ngày.",
    },
    {
      city: "Đà Nẵng",
      timeAgo: "12 phút trước",
      customer: "Chị Thảo, Hải Châu",
      avatar: AVATARS.nu6,
      combo: "combo 6 tặng 2 và 1 hộp cà gai leo tía tô 100g",
      note: "Đặt chung cho hai gia đình, ưu tiên combo lớn để tiết kiệm và có thêm quà tặng.",
    },
    {
      city: "Cần Thơ",
      timeAgo: "18 phút trước",
      customer: "Cô Mai, Ninh Kiều",
      avatar: AVATARS.nu9,
      combo: "combo 3 tặng 1 trứng gà thảo dược",
      note: "Khách chốt nhanh vì cần thực phẩm sạch, rõ nguồn gốc cho cả nhà dùng mỗi ngày.",
    },
    {
      city: "Bình Dương",
      timeAgo: "31 phút trước",
      customer: "Chị Diễm My, Dĩ An",
      avatar: AVATARS.nu12,
      combo: "combo 6 tặng 2 trứng gà thảo dược",
      note: "Khách lấy combo lớn để biếu người thân và tiện chia cho bữa ăn trong tuần.",
    },
  ],
};

export function getSocialProofFeed(variant: MobileHeroVariant) {
  return SOCIAL_PROOF_FEED[variant] ?? SOCIAL_PROOF_FEED.default;
}
