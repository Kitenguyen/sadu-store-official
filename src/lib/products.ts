import { SITE_ORIGIN, SITE_URL, assetUrl } from "./site";

export type ProductCategory = "tra-mate" | "khuyen-mai" | "combo";
export type ProductBadge = "SALE" | "NEW" | "BEST SELLER" | "COMBO";
export type ProductAvailability = "https://schema.org/InStock" | "https://schema.org/OutOfStock";

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: ProductCategory;
  brand: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  availability: ProductAvailability;
  image: string;
  images: string[];
  url: string;
  badge?: ProductBadge;
  size: string;
  condition: "https://schema.org/NewCondition";
  priceCurrency: "VND";
}

export interface CategoryCard {
  id: string;
  name: string;
  image: string;
  count: number;
  href: string;
}

type ProductSeed = Omit<
  Product,
  "brand" | "availability" | "condition" | "priceCurrency" | "url" | "discount"
>;

const DEFAULT_BRAND = "SADU";
const DEFAULT_AVAILABILITY: ProductAvailability = "https://schema.org/InStock";
const DEFAULT_CONDITION = "https://schema.org/NewCondition" as const;
const DEFAULT_CURRENCY = "VND" as const;

function toProduct(seed: ProductSeed): Product {
  const oldPrice = seed.oldPrice;
  const discount = oldPrice ? Math.round((1 - seed.price / oldPrice) * 100) : undefined;

  return {
    ...seed,
    brand: DEFAULT_BRAND,
    availability: DEFAULT_AVAILABILITY,
    condition: DEFAULT_CONDITION,
    priceCurrency: DEFAULT_CURRENCY,
    discount,
    url: `${SITE_URL}#${seed.slug}`,
  };
}

export const mateProducts: Product[] = [
  toProduct({
    id: "sadu-mate-xa-den",
    sku: "MATE-XD-150",
    slug: "tra-mate-xa-den",
    name: "Trà Mate Xạ Đen",
    category: "tra-mate",
    image: assetUrl("/assets/products/tra-xa-den.jpg"),
    images: [assetUrl("/assets/products/tra-xa-den.jpg")],
    price: 149000,
    rating: 4.9,
    reviewCount: 302,
    badge: "BEST SELLER",
    size: "150g",
    shortDescription: "Xạ đen • Thanh nhẹ • Dễ duy trì thói quen tốt",
    description:
      "Xạ đen nguyên chất, sao thủ công theo phương pháp truyền thống, giữ trọn hương vị mộc mạc và màu nước cánh gián đẹp mắt.",
    benefits: ["Xạ đen nguyên chất", "Thanh nhẹ mỗi ngày", "Dễ bắt đầu thói quen tốt"],
  }),
  toProduct({
    id: "sadu-mate-xa-den-hoa-cuc",
    sku: "MATE-XDHC-150",
    slug: "tra-mate-xa-den-hoa-cuc",
    name: "Trà Mate Xạ Đen Hoa Cúc",
    category: "tra-mate",
    image: assetUrl("/assets/products/tra-xa-den-hoa-cuc.jpg"),
    images: [assetUrl("/assets/products/tra-xa-den-hoa-cuc.jpg")],
    price: 149000,
    rating: 4.8,
    reviewCount: 156,
    badge: "NEW",
    size: "150g",
    shortDescription: "Hoa cúc chi • Dịu êm • Hợp buổi tối",
    description:
      "Hoa cúc chi vàng ươm hoà cùng xạ đen, mang lại tách trà dịu êm, hương thơm ấm áp, thích hợp buổi tối.",
    benefits: ["Hương cúc ấm áp", "Dịu êm dễ uống", "Thích hợp buổi tối"],
  }),
  toProduct({
    id: "sadu-mate-xa-den-la-sen",
    sku: "MATE-XDLS-150",
    slug: "tra-mate-xa-den-la-sen",
    name: "Trà Mate Xạ Đen Lá Sen",
    category: "tra-mate",
    image: assetUrl("/assets/products/tra-xa-den-la-sen.jpg"),
    images: [assetUrl("/assets/products/tra-xa-den-la-sen.jpg")],
    price: 149000,
    rating: 4.9,
    reviewCount: 214,
    badge: "BEST SELLER",
    size: "150g",
    shortDescription: "Lá sen • Thanh vị • Hậu ngọt nhẹ",
    description:
      "Xạ đen kết hợp lá sen và hoa sen khô, cho vị trà thanh, hậu ngọt nhẹ, hương sen thoang thoảng dễ chịu.",
    benefits: ["Hương sen thoang thoảng", "Vị trà thanh", "Hậu ngọt nhẹ"],
  }),
];

export const promotionProducts: Product[] = [
  toProduct({
    id: "promo-ca-gai-leo-xa-den-1kg",
    sku: "CGL-XD-1KG",
    slug: "tra-ca-gai-leo-xa-den-1kg",
    name: "Trà Cà Gai Leo Xạ Đen SADU",
    category: "khuyen-mai",
    image: assetUrl("/assets/products/promo-ca-gai-leo-xa-den-1kg.jpg"),
    images: [assetUrl("/assets/products/promo-ca-gai-leo-xa-den-1kg.jpg")],
    price: 396000,
    oldPrice: 436000,
    rating: 4.9,
    reviewCount: 278,
    badge: "SALE",
    size: "1kg",
    shortDescription: "Mát gan • Thanh lọc • Hỗ trợ chức năng gan",
    description: "Mát gan, hỗ trợ tăng cường chức năng gan, thanh lọc cơ thể.",
    benefits: ["Mát gan", "Thanh lọc cơ thể", "Hỗ trợ chức năng gan"],
  }),
  toProduct({
    id: "promo-ca-gai-leo-1kg",
    sku: "CGL-TL-1KG",
    slug: "tra-tui-loc-ca-gai-leo-1kg",
    name: "Trà Túi Lọc Cà Gai Leo SADU",
    category: "khuyen-mai",
    image: assetUrl("/assets/products/promo-ca-gai-leo-1kg.jpg"),
    images: [assetUrl("/assets/products/promo-ca-gai-leo-1kg.jpg")],
    price: 396000,
    oldPrice: 436000,
    rating: 4.8,
    reviewCount: 321,
    badge: "SALE",
    size: "1kg",
    shortDescription: "Mát gan • Thanh nhiệt • Giải độc cơ thể",
    description: "Hỗ trợ mát gan, thanh nhiệt, giải độc cơ thể.",
    benefits: ["Mát gan", "Thanh nhiệt", "Giải độc cơ thể"],
  }),
  toProduct({
    id: "promo-ca-gai-leo-dinh-lang-1kg",
    sku: "CGL-DL-1KG",
    slug: "tra-ca-gai-leo-dinh-lang-1kg",
    name: "Trà Cà Gai Leo Đinh Lăng",
    category: "khuyen-mai",
    image: assetUrl("/assets/products/promo-ca-gai-leo-dinh-lang-1kg.jpg"),
    images: [assetUrl("/assets/products/promo-ca-gai-leo-dinh-lang-1kg.jpg")],
    price: 396000,
    oldPrice: 436000,
    rating: 4.8,
    reviewCount: 204,
    badge: "SALE",
    size: "1kg",
    shortDescription: "Bồi bổ • Giảm mệt mỏi • Tăng đề kháng",
    description: "Hỗ trợ bồi bổ cơ thể, giảm mệt mỏi, tăng sức đề kháng.",
    benefits: ["Bồi bổ cơ thể", "Giảm mệt mỏi", "Tăng đề kháng"],
  }),
  toProduct({
    id: "promo-diep-ca-ca-gai-leo-1kg",
    sku: "DC-CGL-1KG",
    slug: "tra-diep-ca-ca-gai-leo-1kg",
    name: "Trà Diếp Cá Cà Gai Leo",
    category: "khuyen-mai",
    image: assetUrl("/assets/products/promo-diep-ca-ca-gai-leo-1kg.jpg"),
    images: [assetUrl("/assets/products/promo-diep-ca-ca-gai-leo-1kg.jpg")],
    price: 396000,
    oldPrice: 436000,
    rating: 4.7,
    reviewCount: 166,
    badge: "SALE",
    size: "1kg",
    shortDescription: "Thanh nhiệt • Mát cơ thể • Giảm nóng trong",
    description: "Thanh nhiệt, hỗ trợ giảm nóng trong, làm mát cơ thể.",
    benefits: ["Thanh nhiệt", "Làm mát cơ thể", "Hỗ trợ giảm nóng trong"],
  }),
  toProduct({
    id: "promo-ca-gai-leo-che-xanh-1kg",
    sku: "CGL-CX-1KG",
    slug: "tra-ca-gai-leo-che-xanh-1kg",
    name: "Trà Cà Gai Leo Chè Xanh",
    category: "khuyen-mai",
    image: assetUrl("/assets/products/promo-ca-gai-leo-che-xanh-1kg.jpg"),
    images: [assetUrl("/assets/products/promo-ca-gai-leo-che-xanh-1kg.jpg")],
    price: 396000,
    oldPrice: 436000,
    rating: 4.8,
    reviewCount: 187,
    badge: "SALE",
    size: "1kg",
    shortDescription: "Chống oxy hóa • Thanh nhiệt • Tỉnh táo nhẹ",
    description: "Chống oxy hóa, thanh nhiệt, hỗ trợ tỉnh táo.",
    benefits: ["Chống oxy hóa", "Thanh nhiệt", "Hỗ trợ tỉnh táo"],
  }),
  toProduct({
    id: "promo-ca-gai-leo-rau-ma-1kg",
    sku: "CGL-RM-1KG",
    slug: "tra-ca-gai-leo-rau-ma-1kg",
    name: "Trà Cà Gai Leo Rau Má",
    category: "khuyen-mai",
    image: assetUrl("/assets/products/promo-ca-gai-leo-rau-ma-1kg.jpg"),
    images: [assetUrl("/assets/products/promo-ca-gai-leo-rau-ma-1kg.jpg")],
    price: 480000,
    oldPrice: 504000,
    rating: 4.9,
    reviewCount: 249,
    badge: "SALE",
    size: "1kg",
    shortDescription: "Thanh nhiệt • Mát cơ thể • Hỗ trợ đẹp da",
    description: "Thanh nhiệt, làm mát cơ thể, hỗ trợ đẹp da.",
    benefits: ["Thanh nhiệt", "Làm mát cơ thể", "Hỗ trợ đẹp da"],
  }),
  toProduct({
    id: "promo-ca-gai-leo-la-oi-1kg",
    sku: "CGL-LO-1KG",
    slug: "tra-ca-gai-leo-la-oi-1kg",
    name: "Trà Cà Gai Leo Lá Ổi",
    category: "khuyen-mai",
    image: assetUrl("/assets/products/promo-ca-gai-leo-la-oi-1kg.jpg"),
    images: [assetUrl("/assets/products/promo-ca-gai-leo-la-oi-1kg.jpg")],
    price: 480000,
    oldPrice: 504000,
    rating: 4.9,
    reviewCount: 291,
    badge: "SALE",
    size: "1kg",
    shortDescription: "Tiêu hóa nhẹ • Ổn định đường huyết • Giảm đầy bụng",
    description: "Hỗ trợ tiêu hóa, hỗ trợ ổn định đường huyết, giảm đầy bụng.",
    benefits: ["Hỗ trợ tiêu hóa", "Ổn định đường huyết", "Giảm đầy bụng"],
  }),
  toProduct({
    id: "promo-ca-gai-leo-tia-to-1kg",
    sku: "CGL-TT-1KG",
    slug: "tra-ca-gai-leo-tia-to-1kg",
    name: "Trà Cà Gai Leo Tía Tô",
    category: "khuyen-mai",
    image: assetUrl("/assets/products/promo-ca-gai-leo-tia-to-1kg.jpg"),
    images: [assetUrl("/assets/products/promo-ca-gai-leo-tia-to-1kg.jpg")],
    price: 480000,
    oldPrice: 504000,
    rating: 4.7,
    reviewCount: 173,
    badge: "SALE",
    size: "1kg",
    shortDescription: "Giải cảm nhẹ • Ấm cơ thể • Giảm dị ứng theo mùa",
    description: "Hỗ trợ giải cảm, giảm dị ứng theo mùa, làm ấm cơ thể.",
    benefits: ["Hỗ trợ giải cảm", "Giảm dị ứng theo mùa", "Làm ấm cơ thể"],
  }),
];

export const comboProducts: Product[] = [
  toProduct({
    id: "combo-trung-ga-thao-duoc-3-tang-1",
    sku: "COMBO-TGTD-3T1",
    slug: "combo-trung-ga-thao-duoc-3-tang-1",
    name: "Combo 3 tặng 1 · Trứng gà thảo dược SADU",
    category: "combo",
    image: assetUrl("/assets/products/combo-trung-ga-thao-duoc-sadu.jpg"),
    images: [assetUrl("/assets/products/combo-trung-ga-thao-duoc-sadu.jpg")],
    price: 358500,
    rating: 4.9,
    reviewCount: 86,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Không kháng sinh • Thảo dược sạch • Cholesterol xấu thấp",
    description:
      "Trứng không kháng sinh, ăn thảo dược sạch, cholesterol xấu thấp, phù hợp khách cần thực phẩm sạch dùng hằng ngày.",
    benefits: ["Không kháng sinh", "Ăn thảo dược sạch", "Cholesterol xấu thấp"],
  }),
  toProduct({
    id: "combo-la-oi-2-tang-1",
    sku: "COMBO-LO-2T1",
    slug: "combo-ca-gai-leo-la-oi-2-tang-1",
    name: "Combo 2 tặng 1 · Cà Gai Leo Lá Ổi 100g",
    category: "combo",
    image: assetUrl("/assets/products/combo-ca-gai-leo-la-oi-100g.jpg"),
    images: [assetUrl("/assets/products/combo-ca-gai-leo-la-oi-100g.jpg")],
    price: 278000,
    rating: 4.8,
    reviewCount: 138,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Tiêu hóa nhẹ • Dễ uống • Combo tiết kiệm",
    description: "Combo lá ổi dành cho khách ưu tiên tiêu hóa nhẹ, vị trà dễ uống và chi phí tiết kiệm hơn.",
    benefits: ["Hỗ trợ tiêu hóa", "Vị trà dễ uống", "Combo tiết kiệm"],
  }),
  toProduct({
    id: "combo-la-oi-3-tang-2",
    sku: "COMBO-LO-3T2",
    slug: "combo-ca-gai-leo-la-oi-3-tang-2",
    name: "Combo 3 tặng 2 · Cà Gai Leo Lá Ổi 100g",
    category: "combo",
    image: assetUrl("/assets/products/combo-ca-gai-leo-la-oi-100g.jpg"),
    images: [assetUrl("/assets/products/combo-ca-gai-leo-la-oi-100g.jpg")],
    price: 417000,
    rating: 4.9,
    reviewCount: 164,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Dễ uống • Mua nhiều lợi hơn • Tiết kiệm dài hạn",
    description: "Combo lá ổi số lượng lớn cho khách dùng đều mỗi ngày và muốn tối ưu chi phí tốt hơn.",
    benefits: ["Dễ uống mỗi ngày", "Ưu đãi số lượng", "Tiết kiệm dài hạn"],
  }),
  toProduct({
    id: "combo-day-dau-xuong-5-tang-2",
    sku: "COMBO-DDX-5T2",
    slug: "combo-day-dau-xuong-5-tang-2",
    name: "Combo 5 tặng 2 · Trà túi lọc Dây Đau Xương Cà Gai Leo 250g",
    category: "combo",
    image: assetUrl("/assets/products/combo-day-dau-xuong-ca-gai-leo.jpg"),
    images: [assetUrl("/assets/products/combo-day-dau-xuong-ca-gai-leo.jpg")],
    price: 945000,
    rating: 4.7,
    reviewCount: 88,
    badge: "COMBO",
    size: "250g",
    shortDescription: "Thảo dược sạch • Đúng hình hộp • Mua số lượng lớn",
    description: "Combo dây đau xương cà gai leo dành cho khách mua số lượng lớn với packshot hộp chuẩn sản phẩm thực tế.",
    benefits: ["Thảo dược sạch", "Đúng hình hộp", "Ưu đãi số lượng lớn"],
  }),
  toProduct({
    id: "combo-rau-ma-2-tang-1",
    sku: "COMBO-RM-2T1",
    slug: "combo-ca-gai-leo-rau-ma-2-tang-1",
    name: "Combo 2 tặng 1 · Cà Gai Leo Rau Má",
    category: "combo",
    image: assetUrl("/assets/products/combo-ca-gai-leo-rau-ma-premium.jpg"),
    images: [assetUrl("/assets/products/combo-ca-gai-leo-rau-ma-premium.jpg")],
    price: 278000,
    rating: 4.8,
    reviewCount: 141,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Thanh nhiệt • Mát cơ thể • Hỗ trợ đẹp da",
    description: "Combo rau má premium phù hợp khách thích vị thanh mát và nhu cầu dùng hằng ngày.",
    benefits: ["Thanh nhiệt", "Mát cơ thể", "Hỗ trợ đẹp da"],
  }),
  toProduct({
    id: "combo-xa-den-2-tang-1",
    sku: "COMBO-XD-2T1",
    slug: "combo-ca-gai-leo-xa-den-2-tang-1",
    name: "Combo 2 tặng 1 · Cà Gai Leo Xạ Đen",
    category: "combo",
    image: assetUrl("/assets/products/combo-ca-gai-leo-xa-den-box.jpg"),
    images: [assetUrl("/assets/products/combo-ca-gai-leo-xa-den-box.jpg")],
    price: 278000,
    rating: 4.9,
    reviewCount: 176,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Mát gan • Thanh lọc • Combo bán chạy",
    description: "Combo xạ đen dùng hình hộp chuẩn để khách nhận diện nhanh và chốt đơn dễ hơn.",
    benefits: ["Mát gan", "Thanh lọc cơ thể", "Combo bán chạy"],
  }),
  toProduct({
    id: "combo-xa-den-3-tang-2",
    sku: "COMBO-XD-3T2",
    slug: "combo-ca-gai-leo-xa-den-3-tang-2",
    name: "Combo 3 tặng 2 · Cà Gai Leo Xạ Đen",
    category: "combo",
    image: assetUrl("/assets/products/combo-ca-gai-leo-xa-den-box.jpg"),
    images: [assetUrl("/assets/products/combo-ca-gai-leo-xa-den-box.jpg")],
    price: 417000,
    rating: 4.9,
    reviewCount: 193,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Xạ đen • Mua nhiều lợi hơn • Dễ nhận diện",
    description: "Combo xạ đen số lượng lớn cho khách cần tối ưu giá và dùng đều trong thời gian dài.",
    benefits: ["Mua nhiều lợi hơn", "Dễ nhận diện sản phẩm", "Phù hợp dùng dài hạn"],
  }),
  toProduct({
    id: "combo-la-oi-3-tang-1",
    sku: "COMBO-LO-3T1",
    slug: "combo-ca-gai-leo-la-oi-3-tang-1",
    name: "Combo 3 tặng 1 · Cà Gai Leo Lá Ổi",
    category: "combo",
    image: assetUrl("/assets/products/combo-ca-gai-leo-la-oi-100g.jpg"),
    images: [assetUrl("/assets/products/combo-ca-gai-leo-la-oi-100g.jpg")],
    price: 447000,
    rating: 4.8,
    reviewCount: 121,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Lá ổi • Dễ uống • Ưu đãi số lượng",
    description: "Combo lá ổi cho khách thích vị trà dễ uống, nhận diện packshot màu cam nổi bật.",
    benefits: ["Vị trà dễ uống", "Ưu đãi số lượng", "Packshot nhận diện tốt"],
  }),
  toProduct({
    id: "combo-la-oi-5-tang-3",
    sku: "COMBO-LO-5T3",
    slug: "combo-ca-gai-leo-la-oi-5-tang-3",
    name: "Combo 5 tặng 3 · Cà Gai Leo Lá Ổi",
    category: "combo",
    image: assetUrl("/assets/products/combo-ca-gai-leo-la-oi-100g.jpg"),
    images: [assetUrl("/assets/products/combo-ca-gai-leo-la-oi-100g.jpg")],
    price: 695000,
    rating: 4.9,
    reviewCount: 109,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Ưu đãi sâu • Lá ổi dễ uống • Chốt đơn nhanh",
    description: "Ưu đãi sâu cho khách chốt số lượng lớn dòng lá ổi với mức giá tốt hơn theo combo.",
    benefits: ["Ưu đãi sâu", "Dễ uống", "Chốt đơn nhanh"],
  }),
  toProduct({
    id: "combo-dinh-lang-5-tang-3",
    sku: "COMBO-DL-5T3",
    slug: "combo-ca-gai-leo-dinh-lang-5-tang-3",
    name: "Combo 5 tặng 3 · Cà Gai Leo Đinh Lăng",
    category: "combo",
    image: assetUrl("/assets/products/combo-ca-gai-leo-dinh-lang-box.jpg"),
    images: [assetUrl("/assets/products/combo-ca-gai-leo-dinh-lang-box.jpg")],
    price: 695000,
    rating: 4.8,
    reviewCount: 97,
    badge: "COMBO",
    size: "Combo quà tặng",
    shortDescription: "Bồi bổ • Tăng đề kháng • Combo tiết kiệm",
    description: "Combo đinh lăng phù hợp khách cần mua dài ngày và ưu tiên các dòng trà bồi bổ cơ thể.",
    benefits: ["Bồi bổ cơ thể", "Tăng đề kháng", "Combo tiết kiệm"],
  }),
  toProduct({
    id: "combo-mate-xa-den-3-tang-1",
    sku: "COMBO-MATEXD-3T1",
    slug: "combo-tra-mate-xa-den-3-tang-1",
    name: "Combo 3 tặng 1 · Trà Mate Xạ Đen 150g",
    category: "combo",
    image: assetUrl("/assets/products/tra-xa-den.jpg"),
    images: [assetUrl("/assets/products/tra-xa-den.jpg")],
    price: 447000,
    rating: 4.9,
    reviewCount: 145,
    badge: "COMBO",
    size: "150g",
    shortDescription: "Xạ đen • Thanh nhẹ • Tặng thêm hấp dẫn",
    description: "Combo Mate Xạ Đen phù hợp khách yêu thích vị mộc mạc và muốn mua dùng hoặc làm quà.",
    benefits: ["Thanh nhẹ", "Hương vị mộc mạc", "Ưu đãi tặng thêm"],
  }),
  toProduct({
    id: "combo-mate-xa-den-5-tang-2",
    sku: "COMBO-MATEXD-5T2",
    slug: "combo-tra-mate-xa-den-5-tang-2",
    name: "Combo 5 tặng 2 · Trà Mate Xạ Đen 150g",
    category: "combo",
    image: assetUrl("/assets/products/tra-xa-den.jpg"),
    images: [assetUrl("/assets/products/tra-xa-den.jpg")],
    price: 745000,
    rating: 4.9,
    reviewCount: 132,
    badge: "COMBO",
    size: "150g",
    shortDescription: "Premium • Dùng dài ngày • Tặng thêm giá trị",
    description: "Combo cao cấp cho dòng Mate Xạ Đen, phù hợp khách mua dài ngày hoặc chọn làm quà premium.",
    benefits: ["Dùng dài ngày", "Premium", "Tặng thêm giá trị"],
  }),
  toProduct({
    id: "combo-mate-la-sen-3-tang-1",
    sku: "COMBO-MATELS-3T1",
    slug: "combo-tra-mate-la-sen-3-tang-1",
    name: "Combo 3 tặng 1 · Trà Mate Xạ Đen Lá Sen",
    category: "combo",
    image: assetUrl("/assets/products/tra-xa-den-la-sen.jpg"),
    images: [assetUrl("/assets/products/tra-xa-den-la-sen.jpg")],
    price: 447000,
    rating: 4.8,
    reviewCount: 118,
    badge: "COMBO",
    size: "150g",
    shortDescription: "Lá sen • Vị thanh • Hậu ngọt nhẹ",
    description: "Combo Mate Lá Sen dành cho khách thích hương sen thanh mát và hậu vị nhẹ nhàng.",
    benefits: ["Vị thanh", "Hậu ngọt nhẹ", "Hương sen dễ chịu"],
  }),
  toProduct({
    id: "combo-mate-la-sen-5-tang-2",
    sku: "COMBO-MATELS-5T2",
    slug: "combo-tra-mate-la-sen-5-tang-2",
    name: "Combo 5 tặng 2 · Trà Mate Xạ Đen Lá Sen",
    category: "combo",
    image: assetUrl("/assets/products/tra-xa-den-la-sen.jpg"),
    images: [assetUrl("/assets/products/tra-xa-den-la-sen.jpg")],
    price: 745000,
    rating: 4.9,
    reviewCount: 101,
    badge: "COMBO",
    size: "150g",
    shortDescription: "Hương sen • Thanh nhẹ • Combo quà tặng",
    description: "Combo quà tặng số lượng lớn cho khách yêu thích hương lá sen thanh mát và phong cách premium.",
    benefits: ["Hương sen", "Thanh nhẹ", "Combo quà tặng"],
  }),
];

export const products: Product[] = [...mateProducts, ...promotionProducts, ...comboProducts];

export const categories: CategoryCard[] = [
  {
    id: "tra-mate",
    name: "Bộ sưu tập Mate",
    image: assetUrl("/assets/products/tra-xa-den.jpg"),
    count: mateProducts.length,
    href: "#mate-collection",
  },
  {
    id: "khuyen-mai",
    name: "Trà túi lọc khuyến mại",
    image: assetUrl("/assets/products/promo-ca-gai-leo-xa-den-1kg.jpg"),
    count: promotionProducts.length,
    href: "#promo-products",
  },
  {
    id: "combo",
    name: "Combo khuyến mại",
    image: assetUrl("/assets/products/tra-xa-den-la-sen.jpg"),
    count: comboProducts.length,
    href: "#bundle",
  },
];

export function formatVnd(value: number): string {
  return value.toLocaleString("vi-VN") + "đ";
}

export function getProductImageUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_ORIGIN}${path}`;
}

export function getProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": product.url,
    sku: product.sku,
    name: product.name,
    category: product.category,
    description: product.description,
    image: product.images.map(getProductImageUrl),
    url: product.url,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: product.priceCurrency,
      price: product.price,
      availability: product.availability,
      itemCondition: product.condition,
      priceValidUntil: "2027-08-01",
      url: product.url,
      seller: {
        "@type": "Organization",
        name: product.brand,
        url: SITE_URL,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: product.price >= 250000 ? "0" : "30000",
          currency: product.priceCurrency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "VN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "VN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };
}

