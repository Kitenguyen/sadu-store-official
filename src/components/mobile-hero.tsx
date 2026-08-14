import { MOBILE_HERO_CONTENT, type MobileHeroVariant } from "../lib/mobile-hero-content";

export function MobileHero({ variant = "default" }: { variant?: MobileHeroVariant }) {
  const hero = MOBILE_HERO_CONTENT[variant];

  return (
    <section className="relative overflow-hidden bg-[#120d09] pt-16">
      <img
        src={hero.image}
        alt={hero.imageAlt}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-top opacity-24 blur-2xl"
      />
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[linear-gradient(180deg,rgba(18,13,9,0.08),rgba(18,13,9,0.16)_24%,rgba(18,13,9,0.74)_72%,rgba(18,13,9,0.98)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(circle_at_top,rgba(214,179,106,0.16),transparent_56%)]" />

      <div className="relative mx-auto max-w-[30rem] px-4 pb-4">
        <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[rgba(23,16,12,0.82)] p-3 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.82)]">
          <div
            className={`relative h-[18.5rem] overflow-hidden rounded-[24px] border border-white/8 min-[390px]:h-[20.5rem] min-[430px]:h-[22rem] ${hero.imagePanelClass ?? "bg-[rgba(24,18,14,0.94)] p-4"}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,179,106,0.2),transparent_58%)]" />
            <img
              src={hero.image}
              alt={hero.imageAlt}
              fetchPriority="high"
              className={`absolute inset-0 h-full w-full ${hero.imageClass ?? "object-contain object-center"}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,10,7,0.04),rgba(16,10,7,0.14)_48%,rgba(16,10,7,0.38)_100%)]" />
          </div>

          <div className="px-1 pb-1 pt-4">
            <div className="inline-flex items-center rounded-full border border-[#d6b36a]/22 bg-[#d6b36a]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f0d5ae]">
              {hero.badge}
            </div>
            <h1 className="mt-3 max-w-[16ch] text-[clamp(1.8rem,7vw,2.45rem)] font-bold leading-[1.05] tracking-tight text-[#fff8ef]">
              {hero.title}
            </h1>
            <p className="mt-3 text-[0.96rem] leading-[1.58] text-[#f6e8d4]/78">{hero.body}</p>

            <div className="mt-3 flex flex-wrap gap-2 text-[11px] leading-5 text-[#f0d5ae]/82">
              {hero.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-2 min-[390px]:grid-cols-2">
              <a
                href={hero.primaryHref}
                className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#d6b36a] px-4.5 py-3 text-center text-[15px] font-semibold text-[#1a120c] shadow-[0_14px_30px_-18px_rgba(214,179,106,0.9)] transition hover:brightness-105 active:scale-[0.98]"
              >
                {hero.primaryLabel}
              </a>
              <a
                href={hero.secondaryHref}
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-4.5 py-3 text-center text-[14px] font-medium text-[#f3e1ca] transition hover:border-white/20 hover:text-white"
              >
                {hero.secondaryLabel}
              </a>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-[#f0d5ae]/66">
              {hero.footerTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
