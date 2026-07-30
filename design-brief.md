# SADU — Design Brief

## Design read
An educated, health-conscious Vietnamese urban customer choosing a daily
ritual, not a supplement — the register is calm, botanical, editorial trust
(VietGAP/OCOP verified), never a loud "sale" shop.

## Concept spine
"The tea is grown, not manufactured." The whole page performs one continuous
provenance journey — from wild highland shrub to the steaming cup on your
table — before it ever asks you to shop. The scroll IS the walk from the
mountain to the mug.

## Delivery tier
`cinema` — Lenis + GSAP scroll chapters, the animated-website (A4) seam-locked
scroll-scrub as the Tier-1 hero mechanic, editorial section rhythm afterward.

## Locked palette (user's explicit brand colors — override the ban)
- Primary — Forest Green `#1E5B38`
- Secondary — Sage Green `#BFD8C3`
- Background — Warm White `#FAF9F5`
- Accent — Gold `#D6B36A`
- Text — Charcoal `#222222`
Defense: these are SADU's real brand colors (from the logo + packaging); no
substitution needed.

## Locked type
`Be Vietnam Pro` (variable, full Vietnamese diacritic coverage) for display
and body — one family, weight does the work (300/500/700/900). `JetBrains
Mono` for the rare kicker/spec-label/countdown-digit role only. No serif: this
is a modern grocery/wellness brand, not a heritage institution.

## Animation mode: animated-website

Animation mode: animated-website
User picked "Animated (khuyến nghị)" at intake. The seam-locked scroll-scrub
journey (A4) is the hero, occupying the page's "Hero Section" slot; normal
content sections resolve underneath it exactly as in the section plan below.

### Journey (Architecture A — continuous forward flight, 4 scenes / 3 legs)
1. **Nguồn cội** (`source`) — misty highland forest at sunrise, wild herb
   shrubs, floating leaves. Kicker: "SADU · Từ núi rừng". Title "Nguồn cội
   nguyên sơ". Body: một sentence on wild-grown herbs. No CTA (opening beat).
2. **Bàn tay hái lá** (`handpick`) — hands hand-picking leaves in golden farm
   light, VietGAP rows behind. Title "Hái bằng tay, chọn từng lá". Tags:
   "VietGAP", "Hái thủ công".
3. **Sấy khô tự nhiên** (`dry`) — wooden drying racks, warm barn light, dust
   motes. Title "Sấy tự nhiên, giữ trọn dưỡng chất". Tags: "Không chất bảo
   quản", "100% tự nhiên".
4. **Tách trà tinh khiết** (`cup`) — steaming ceramic cup by a sunlit window,
   camera settles. Title "Một tách trà, cả vùng núi rừng". CTA: primary
   "Khám phá bộ sưu tập" (scrolls to categories) + secondary ghost link "Xem
   câu chuyện nông trại" (scrolls to farm-story section).

World grammar: one locked style preamble across all 4 prompts — photoreal
documentary nature film, forest-green/warm-gold grade, soft directional
morning light, slow continuous forward drift, no text/logo/watermark, no cuts.
Camera architecture: **A**. Mobile framing: center-safe focal subject in every
frame; lighter mobile encodes (≤720p, tighter GOP). Cost shape: 1 entry image
(2 candidates) + 3 sequential video legs, no connectors. Delivery budget: ≤32
MiB desktop chain, ≤16 MiB mobile chain — shorten/re-encode before relaxing.

## Section plan (order, family, no consecutive repeats)
1. Sticky nav — transparent → frosted-glass on scroll (chrome family, unique)
2. **Hero** — scroll-scrub journey, 4 chapters (A4 family, unique)
3. Promo banner — thin horizontal marquee strip, countdown chip (banner family)
4. Product categories — horizontal-scroll rounded card rail (card-rail family)
5. Featured products — responsive vertical grid, hover reveal (grid family)
6. Bundle builder — split image + live interactive price panel (split-config family)
7. Why choose us — asymmetric bento (generated icon set), not 3-equal-col (bento family)
8. Farm story — full-bleed editorial timeline, alternating image/text (timeline family)
9. Certifications — logo/seal strip on warm-white ground (strip family)
10. Customer reviews — large-avatar carousel (carousel family)
11. FAQ — rounded accordion (accordion family)
12. Footer — mega footer, newsletter, socials, policies (footer family)

Eyebrow ration: ceil(12/3) = 4 eyebrows max page-wide (categories, featured
products, bundle, why-choose-us only — farm story/certifications/reviews/faq
use a plain heading, no kicker).

## Asset plan
- **Journey**: 4 scene entry stills (only scene 1 rendered as a still; 2-4 are
  reached by the video legs), 3 sequential Seedance legs, boundary-frame
  extraction, desktop+mobile encodes + posters.
- **Section plates**: warm paper-grain texture, sage botanical wash (2 plates).
- **Content imagery**: 2 farm-story editorial photos (harvest terrace, drying
  racks) — generated (no real farm photography supplied). **Real product
  photography is the user's own asset** — all 7 SADU product photos + the logo
  are used as-is, never regenerated.
- **Custom icon set**: 1 sheet of 9 line icons (why-choose-us + trust strip),
  sliced + background-removed.
- **Certification seals**: 1 generated seal-set image representing VietGAP /
  OCOP / HACCP / ISO (OCOP 4-star is also visible on the user's own "Cà Gai
  Leo" packaging photo — reused as supporting proof).
- **Logo/monogram**: user's own SADU logo (green ground) — background-removed
  for the nav mark and head-kit favicon source. No generated logo needed.
- **OG image**: composed from the "cup" scene poster + the SADU wordmark.

## CTA inventory (one identity each, no shared button class)
- Nav cart icon — icon-only bubble, badge-count pop
- Hero chapter 4 primary — "Khám phá bộ sưu tập": pill, gold fill sweep on hover
- Hero chapter 4 secondary — "Xem câu chuyện nông trại": ghost text + arrow underline draw
- Promo banner — "Mua ngay": banner chip button, pulses once on mount
- Category card — "Xem thêm": in-card text link, arrow slides right on hover
- Product card quick-add — circular icon button, fills forest-green + check morph
- Product card favorite — heart outline, fills gold + scale bounce
- Bundle builder — "Thêm bộ vào giỏ": full-width button with live-updating price, gold underline progress
- Farm story — "Đọc câu chuyện đầy đủ": underline-draw text link
- Newsletter — "Đăng ký": filled charcoal button, arrow slide
- Sticky mobile bar — "Thêm vào giỏ": bottom-sheet slab button, full width
- Floating support bubble — icon-only, soft shadow pulse
