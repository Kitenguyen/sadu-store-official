import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../lib/cart-context";

const JOURNEY_STORAGE_KEY = "sadu-song-lanh-journey";
const VOUCHER_STORAGE_KEY = "sadu-voucher-songlanh-claimed";
const VOUCHER_UNLOCK_EVENT = "sadu:voucher-unlocked";
const FRAGMENTS = ["S", "O", "NG", "LA", "NH"] as const;

const SLOT_POOL = [
  { id: "slot-1", top: 6, left: 8, rotate: -14 },
  { id: "slot-2", top: 12, left: 84, rotate: 16 },
  { id: "slot-3", top: 22, left: 18, rotate: -10 },
  { id: "slot-4", top: 30, left: 78, rotate: 11 },
  { id: "slot-5", top: 39, left: 10, rotate: -18 },
  { id: "slot-6", top: 47, left: 88, rotate: 9 },
  { id: "slot-7", top: 56, left: 22, rotate: -12 },
  { id: "slot-8", top: 63, left: 76, rotate: 15 },
  { id: "slot-9", top: 72, left: 12, rotate: -8 },
  { id: "slot-10", top: 79, left: 84, rotate: 13 },
  { id: "slot-11", top: 88, left: 24, rotate: -15 },
  { id: "slot-12", top: 92, left: 72, rotate: 10 },
] as const;

const SLOT_GROUPS = [
  ["slot-1", "slot-2"],
  ["slot-3", "slot-4"],
  ["slot-5", "slot-6"],
  ["slot-7", "slot-8"],
  ["slot-9", "slot-10", "slot-11", "slot-12"],
] as const;

const JOURNEY_CARDS = [
  {
    id: "quote-1",
    quote: "Trà và Thiền đồng một vị.",
    author: "Thiền ngữ phương Đông",
    leSong:
      "Con người dành quá nhiều thời gian để tìm kiếm hạnh phúc ở bên ngoài, nhưng sự bình an luôn bắt đầu từ bên trong. Khi tâm an, mọi việc đều trở nên nhẹ hơn.",
    baiHoc: "Muốn thay đổi cuộc sống, hãy bắt đầu bằng việc thay đổi tâm mình.",
  },
  {
    id: "quote-2",
    quote: "Trà đạo chỉ đơn giản là đun nước, pha trà và uống trà.",
    author: "Sen no Rikyu",
    leSong:
      "Cuộc sống vốn không phức tạp. Chính lòng tham, sự so sánh và kỳ vọng khiến nó trở nên nặng nề.",
    baiHoc: "Điều vĩ đại thường nằm trong những việc rất bình thường.",
  },
  {
    id: "quote-3",
    quote: "Trà là một tôn giáo của nghệ thuật sống.",
    author: "Kakuzo Okakura",
    leSong:
      "Sống không phải chỉ để tồn tại. Mỗi bữa ăn, mỗi chén trà, mỗi cuộc trò chuyện đều có thể trở thành một tác phẩm nếu ta đủ trân trọng.",
    baiHoc: "Chất lượng cuộc sống phụ thuộc vào cách ta cảm nhận nó.",
  },
  {
    id: "quote-4",
    quote: "Uống trà là để lắng nghe chính mình.",
    author: null,
    leSong:
      "Chúng ta thường nghe người khác quá nhiều nhưng lại hiếm khi nghe chính mình. Sự cô đơn không đáng sợ, điều đáng sợ là không còn biết mình muốn gì.",
    baiHoc: "Muốn hiểu cuộc đời, trước tiên hãy hiểu bản thân.",
  },
  {
    id: "quote-5",
    quote: "Nước có thể sôi, lòng người nên tĩnh.",
    author: null,
    leSong:
      "Biến cố là điều không thể tránh khỏi. Điều quyết định cuộc đời không phải là sóng gió, mà là cách ta giữ được sự bình tĩnh trước sóng gió.",
    baiHoc: "Bình tĩnh là sức mạnh lớn nhất của người trưởng thành.",
  },
  {
    id: "quote-6",
    quote: "Trà ngon bởi nước, người quý bởi tâm.",
    author: null,
    leSong:
      "Giá trị của một con người không nằm ở tiền bạc hay địa vị, mà nằm ở nhân cách.",
    baiHoc: "Tâm tốt mới là thứ khiến người khác muốn ở lại.",
  },
  {
    id: "quote-7",
    quote: "Đi thật nhanh ngoài phố, về nhà uống chậm một chén trà.",
    author: null,
    leSong:
      "Có thể nỗ lực hết mình để theo đuổi thành công, nhưng cũng phải biết dừng lại để tận hưởng cuộc sống.",
    baiHoc: "Người biết nghỉ đúng lúc mới đi được đường dài.",
  },
  {
    id: "quote-8",
    quote: "Đời người như một ấm trà, nước càng nóng, hương càng tỏa.",
    author: null,
    leSong:
      "Khó khăn không chỉ để thử thách con người, mà còn để bộc lộ phẩm chất thật của họ.",
    baiHoc: "Nghịch cảnh không tạo nên con người, mà làm lộ ra con người.",
  },
  {
    id: "quote-9",
    quote: "Trà cạn rồi mới biết vị người.",
    author: null,
    leSong:
      "Khi còn đủ đầy, ai cũng có thể mỉm cười. Chỉ khi lợi ích không còn, ta mới biết ai thật lòng.",
    baiHoc: "Thời gian và nghịch cảnh là phép thử chính xác nhất của mọi mối quan hệ.",
  },
  {
    id: "quote-10",
    quote: "Một chén trà ngon là khoảng lặng giữa dòng đời vội vã.",
    author: null,
    leSong:
      "Con người không cần quá nhiều niềm vui lớn. Chỉ cần mỗi ngày có một khoảng lặng để hít thở, để biết mình vẫn đang sống.",
    baiHoc: "Hạnh phúc không nằm ở việc có nhiều hơn, mà ở việc cảm nhận sâu hơn.",
  },
] as const;

type JourneyCard = (typeof JOURNEY_CARDS)[number];
type JourneyCardId = JourneyCard["id"];
type JourneySlotId = (typeof SLOT_POOL)[number]["id"];

const MOBILE_SLOT_MAP = new Map<
  JourneySlotId,
  { top: number; left: number; rotate: number }
>([
  ["slot-1", { top: 1.6, left: 18, rotate: -12 }],
  ["slot-2", { top: 4.8, left: 80, rotate: 14 }],
  ["slot-3", { top: 11, left: 24, rotate: -10 }],
  ["slot-4", { top: 17, left: 78, rotate: 11 }],
  ["slot-5", { top: 28, left: 18, rotate: -16 }],
  ["slot-6", { top: 39, left: 82, rotate: 9 }],
  ["slot-7", { top: 52, left: 25, rotate: -12 }],
  ["slot-8", { top: 63, left: 75, rotate: 15 }],
  ["slot-9", { top: 74, left: 16, rotate: -8 }],
  ["slot-10", { top: 84, left: 80, rotate: 13 }],
  ["slot-11", { top: 92, left: 28, rotate: -15 }],
  ["slot-12", { top: 97, left: 70, rotate: 10 }],
]);

type JourneyLeaf = {
  id: string;
  slotId: JourneySlotId;
  cardId: JourneyCardId;
  fragment: (typeof FRAGMENTS)[number];
  fragmentIndex: number;
};

type JourneyState = {
  leaves: JourneyLeaf[];
  openedLeafIds: string[];
  unlocked: boolean;
};

type FlyingLeafState = {
  leafId: string;
  rect: { left: number; top: number; width: number; height: number };
  dx: number;
  dy: number;
  active: boolean;
};

function getSafeStorage(): Storage | null {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
    return null;
  }

  return window.localStorage;
}

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sampleOne<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

function createJourneyState(): JourneyState {
  const cards = shuffle(JOURNEY_CARDS).slice(0, 5);
  const slots = shuffle(
    SLOT_GROUPS.map((group) => {
      const slotId = sampleOne(group);
      return SLOT_POOL.find((slot) => slot.id === slotId)!;
    }),
  );
  const fragments = shuffle(FRAGMENTS);

  return {
    leaves: cards.map((card, index) => ({
      id: `leaf-${index + 1}`,
      slotId: slots[index]!.id,
      cardId: card.id,
      fragment: fragments[index]!,
      fragmentIndex: FRAGMENTS.indexOf(fragments[index]!) + 1,
    })),
    openedLeafIds: [],
    unlocked: false,
  };
}

function readJourneyState(): JourneyState | null {
  const storage = getSafeStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(JOURNEY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as JourneyState;
    if (!Array.isArray(parsed.leaves) || !Array.isArray(parsed.openedLeafIds)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function TeaLeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id="tea-leaf-gradient"
          x1="12"
          y1="6"
          x2="50"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A8D48A" />
          <stop offset="0.45" stopColor="#3E8D4D" />
          <stop offset="1" stopColor="#1E5B38" />
        </linearGradient>
      </defs>
      <path
        d="M52 11C39 11 24 16 16 27c-9 12-8 28-8 28s16 1 28-8c11-8 16-23 16-36Z"
        fill="url(#tea-leaf-gradient)"
      />
      <path
        d="M52 11C39 11 24 16 16 27c-9 12-8 28-8 28s16 1 28-8c11-8 16-23 16-36Z"
        stroke="rgba(250,249,245,0.42)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M17 47c6-9 15-17 28-26"
        stroke="rgba(250,249,245,0.75)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M28 28c3 1 7 1 11-1M23 36c4 1 8 0 13-3"
        stroke="rgba(250,249,245,0.45)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function JourneyLeaves({
  journey,
  slotMap,
  handleLeafClick,
  mobile,
}: {
  journey: JourneyState;
  slotMap: Map<JourneySlotId, (typeof SLOT_POOL)[number]>;
  handleLeafClick: (leaf: JourneyLeaf, element: HTMLButtonElement) => void;
  mobile?: boolean;
}) {
  return (
    <>
      {journey.leaves.map((leaf, index) => {
        if (journey.openedLeafIds.includes(leaf.id)) return null;
        const slot = mobile ? MOBILE_SLOT_MAP.get(leaf.slotId) : slotMap.get(leaf.slotId);
        if (!slot) return null;
        const mobileLeafButtonClass = mobile
          ? "h-16 w-16 rounded-full border-2 border-[#f6e8bf]/80 ring-1 ring-white/18 bg-[radial-gradient(circle,rgba(246,232,191,0.34),rgba(214,179,106,0.18)_55%,rgba(30,91,56,0.18)_100%)] shadow-[0_20px_36px_-14px_rgba(0,0,0,0.62)]"
          : "";

        return (
          <button
            key={leaf.id}
            type="button"
            onClick={(event) => handleLeafClick(leaf, event.currentTarget)}
            className={`song-lanh-leaf pointer-events-auto absolute isolate flex items-center justify-center transition duration-500 ease-out hover:scale-110 ${mobileLeafButtonClass}`}
            style={{
              top: `${slot.top}%`,
              left: `${slot.left}%`,
              transform: `translate(-50%, -50%) rotate(${slot.rotate}deg)`,
              animationDelay: `${index * 0.35}s`,
            }}
            aria-label={`Mở lá trà ${leaf.fragmentIndex}`}
          >
            <TeaLeafIcon
              className={
                mobile
                  ? "relative z-10 h-14 w-14 brightness-[1.35] saturate-[1.9] contrast-[1.3] drop-shadow-[0_18px_28px_rgba(30,91,56,0.56)]"
                  : "h-12 w-12 drop-shadow-[0_16px_24px_rgba(30,91,56,0.2)] md:h-16 md:w-16"
              }
            />
            <span
              className={`absolute inset-0 rounded-full ${
                mobile ? "z-0 bg-[#f6de96]/28 blur-[12px]" : "bg-white/18 blur-xl"
              }`}
            />
          </button>
        );
      })}
    </>
  );
}

export function SongLanhJourney() {
  const { count, openCheckout } = useCart();
  const [journey, setJourney] = useState<JourneyState | null>(null);
  const [activeLeafId, setActiveLeafId] = useState<string | null>(null);
  const [flyingLeaf, setFlyingLeaf] = useState<FlyingLeafState | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const persistRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const stored = readJourneyState();
    const nextState = stored ?? createJourneyState();
    setJourney(nextState);
    if (nextState.unlocked) {
      getSafeStorage()?.setItem(VOUCHER_STORAGE_KEY, "1");
    }
    persistRef.current = true;
  }, []);

  useEffect(() => {
    if (!mounted || !journey || !persistRef.current) return;
    getSafeStorage()?.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(journey));
  }, [journey, mounted]);

  const openedCount = journey?.openedLeafIds.length ?? 0;
  const isUnlocked = journey?.unlocked ?? false;

  const cardMap = useMemo(() => new Map(JOURNEY_CARDS.map((card) => [card.id, card])), []);
  const slotMap = useMemo(() => new Map(SLOT_POOL.map((slot) => [slot.id, slot])), []);

  const activeLeaf = journey?.leaves.find((leaf) => leaf.id === activeLeafId) ?? null;
  const activeCard = activeLeaf ? cardMap.get(activeLeaf.cardId) ?? null : null;

  const unlockVoucher = () => {
    getSafeStorage()?.setItem(VOUCHER_STORAGE_KEY, "1");
    window.dispatchEvent(new Event(VOUCHER_UNLOCK_EVENT));
  };

  const handleLeafClick = (leaf: JourneyLeaf, element: HTMLButtonElement) => {
    if (!journey || journey.openedLeafIds.includes(leaf.id)) return;

    const rect = element.getBoundingClientRect();
    const targetX = window.innerWidth / 2 - rect.width / 2;
    const targetY = window.innerHeight * 0.24 - rect.height / 2;

    setFlyingLeaf({
      leafId: leaf.id,
      rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
      dx: targetX - rect.left,
      dy: targetY - rect.top,
      active: false,
    });
    setActiveLeafId(leaf.id);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlyingLeaf((prev) => (prev ? { ...prev, active: true } : prev));
      });
    });

    window.setTimeout(() => {
      setFlyingLeaf((prev) => (prev?.leafId === leaf.id ? null : prev));
    }, 720);
  };

  const closeActiveLeaf = () => {
    if (!journey || !activeLeaf) {
      setActiveLeafId(null);
      return;
    }

    const alreadyOpened = journey.openedLeafIds.includes(activeLeaf.id);
    const nextOpened = alreadyOpened ? journey.openedLeafIds : [...journey.openedLeafIds, activeLeaf.id];
    const hasCompleted = nextOpened.length >= 5;

    setJourney({
      ...journey,
      openedLeafIds: nextOpened,
      unlocked: journey.unlocked || hasCompleted,
    });
    setActiveLeafId(null);

    if (hasCompleted && !journey.unlocked) {
      unlockVoucher();
      setShowCompletion(true);
    }
  };

  const copyVoucher = async () => {
    await navigator.clipboard.writeText("SONGLANH");
    unlockVoucher();
    toast.success("Đã sao chép mã SONGLANH");
  };

  const handleBuyNow = () => {
    setShowCompletion(false);
    if (count > 0) {
      openCheckout();
      return;
    }
    document.getElementById("promo-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!mounted) return;
    const handleExternalUnlock = () => {
      setJourney((prev) => (prev ? { ...prev, unlocked: true } : prev));
    };

    window.addEventListener(VOUCHER_UNLOCK_EVENT, handleExternalUnlock);
    return () => window.removeEventListener(VOUCHER_UNLOCK_EVENT, handleExternalUnlock);
  }, [mounted]);

  if (!mounted || !journey) return null;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
        <JourneyLeaves journey={journey} slotMap={slotMap} handleLeafClick={handleLeafClick} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 md:hidden">
        <JourneyLeaves
          journey={journey}
          slotMap={slotMap}
          handleLeafClick={handleLeafClick}
          mobile
        />
      </div>

      <div className="fixed right-4 top-[38%] z-40 hidden md:block">
        <button
          type="button"
          onClick={() => {
            if (isUnlocked) {
              setShowCompletion(true);
            }
          }}
          className="rounded-full border border-white/70 bg-white/88 px-4 py-3 text-sm font-semibold text-[#1E5B38] shadow-[0_20px_45px_-22px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:-translate-y-0.5"
        >
          0/5 {openedCount ? `(${openedCount})` : ""}
        </button>
      </div>

      <div className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] left-4 z-40 md:hidden">
        <button
          type="button"
          onClick={() => {
            if (isUnlocked) {
              setShowCompletion(true);
              return;
            }
            toast.message("Chạm vào các lá trà đang nổi để mở mảnh ghép.");
          }}
          className="rounded-full border border-white/18 bg-[rgba(30,91,56,0.9)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-24px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          Sống Lành {openedCount}/5
        </button>
      </div>

      {flyingLeaf ? (
        <div
          className="pointer-events-none fixed z-[75]"
          style={{
            left: flyingLeaf.rect.left,
            top: flyingLeaf.rect.top,
            width: flyingLeaf.rect.width,
            height: flyingLeaf.rect.height,
            transform: flyingLeaf.active
              ? `translate(${flyingLeaf.dx}px, ${flyingLeaf.dy}px) scale(1.55) rotate(-12deg)`
              : "translate(0, 0) scale(1)",
            opacity: flyingLeaf.active ? 0 : 1,
            transition: "transform 650ms cubic-bezier(0.18, 0.88, 0.28, 1), opacity 650ms ease",
          }}
        >
          <TeaLeafIcon className="h-full w-full drop-shadow-[0_26px_30px_rgba(30,91,56,0.22)]" />
        </div>
      ) : null}

      {activeLeaf && activeCard ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6">
          <button
            type="button"
            aria-label="Đóng thiệp"
            onClick={closeActiveLeaf}
            className="absolute inset-0 bg-[#102117]/55 backdrop-blur-[5px]"
          />
          <div className="song-lanh-card relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/40 bg-[linear-gradient(160deg,rgba(250,249,245,0.98),rgba(244,242,235,0.96))] p-6 shadow-[0_45px_120px_-40px_rgba(0,0,0,0.55)] md:p-8">
            <div className="absolute right-5 top-5 rounded-full border border-[#1E5B38]/10 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1E5B38]/75">
              Mảnh ghép số {activeLeaf.fragmentIndex}
            </div>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#ebf5ec] p-2">
                <TeaLeafIcon className="h-10 w-10" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D6B36A]">
                  Hành Trình Sống Lành
                </p>
                <p className="text-sm text-[#1E5B38]/65">
                  Mỗi lá là một khoảng lặng đẹp giữa hành trình mua trà.
                </p>
              </div>
            </div>

            <blockquote className="text-2xl font-semibold leading-tight tracking-tight text-[#1E5B38] md:text-3xl">
              "{activeCard.quote}"
            </blockquote>

            {activeCard.author ? (
              <p className="mt-3 text-sm font-medium text-[#222222]/55">- {activeCard.author}</p>
            ) : null}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <section className="rounded-[24px] border border-[#1E5B38]/8 bg-white/80 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E5B38]/55">
                  Lẽ sống
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#222222]/72">
                  {activeCard.leSong}
                </p>
              </section>
              <section className="rounded-[24px] border border-[#D6B36A]/18 bg-[#fffbf4] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b47a20]">
                  Bài học
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#6f4f14]">
                  {activeCard.baiHoc}
                </p>
              </section>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[24px] bg-[#1E5B38] px-4 py-4 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/65">
                  Mảnh ghép nhận được
                </p>
                <p className="mt-1 text-2xl font-bold tracking-[0.28em]">{activeLeaf.fragment}</p>
              </div>
              <button
                type="button"
                onClick={closeActiveLeaf}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1E5B38]"
              >
                Tiếp tục hành trình
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showCompletion ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-6">
          <button
            type="button"
            aria-label="Đóng hoàn thành"
            onClick={() => setShowCompletion(false)}
            className="absolute inset-0 bg-[#0f1f17]/70 backdrop-blur-[8px]"
          />

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={`confetti-${index}`}
                className="song-lanh-confetti absolute block rounded-full"
                style={{
                  left: `${6 + index * 5}%`,
                  animationDelay: `${index * 0.08}s`,
                  background:
                    index % 3 === 0
                      ? "#1E5B38"
                      : index % 3 === 1
                        ? "#69A26C"
                        : "#D6B36A",
                }}
              />
            ))}
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={`leaf-rain-${index}`}
                className="song-lanh-leaf-rain absolute"
                style={{
                  left: `${10 + index * 7}%`,
                  animationDelay: `${index * 0.18}s`,
                }}
              >
                <TeaLeafIcon className="h-10 w-10 opacity-70" />
              </span>
            ))}
          </div>

          <div className="relative w-full max-w-xl overflow-hidden rounded-[36px] border border-white/40 bg-[linear-gradient(160deg,rgba(250,249,245,0.98),rgba(244,242,235,0.96))] p-7 shadow-[0_50px_130px_-40px_rgba(0,0,0,0.55)] md:p-9">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D6B36A]/35 bg-[#fff7e8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b47a20]">
              Hành Trình Sống Lành
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-[#1E5B38] md:text-4xl">
              Bạn đã hoàn thành Hành Trình Sống Lành
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#222222]/68">
              Toàn bộ 5 mảnh ghép đã ghép thành mã ưu đãi dành riêng cho khách đang ở lại hành trình cùng SADU.
            </p>

            <div className="mt-6 rounded-[28px] border border-[#1E5B38]/10 bg-white/85 p-5 text-center shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E5B38]/55">
                Mã voucher
              </p>
              <p className="mt-2 text-4xl font-black tracking-[0.4em] text-[#1E5B38]">SONGLANH</p>
              <p className="mt-3 text-base font-semibold text-[#b5502f]">Giảm 5.000đ</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={copyVoucher}
                className="flex-1 rounded-full border border-[#1E5B38]/14 bg-white px-5 py-3.5 text-sm font-semibold text-[#1E5B38]"
              >
                Sao chép mã
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 rounded-full bg-[#1E5B38] px-5 py-3.5 text-sm font-semibold text-white"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <style>{`
        .song-lanh-leaf {
          animation: song-lanh-float 4.8s ease-in-out infinite;
        }

        .song-lanh-card {
          animation: song-lanh-flip 560ms cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: 50% 22%;
          transform-style: preserve-3d;
        }

        .song-lanh-confetti {
          top: -10%;
          width: 10px;
          height: 18px;
          opacity: 0;
          animation: song-lanh-confetti 2.6s ease-out forwards;
        }

        .song-lanh-leaf-rain {
          top: -12%;
          opacity: 0;
          animation: song-lanh-leaf-rain 4.5s linear forwards;
        }

        @keyframes song-lanh-float {
          0%, 100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -10px;
          }
        }

        @keyframes song-lanh-flip {
          0% {
            opacity: 0;
            transform: perspective(1400px) rotateX(-18deg) rotateY(-90deg) translateY(24px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1);
          }
        }

        @keyframes song-lanh-confetti {
          0% {
            opacity: 0;
            transform: translateY(-20px) rotate(0deg) scale(0.8);
          }
          15% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(105vh) rotate(600deg) scale(1.1);
          }
        }

        @keyframes song-lanh-leaf-rain {
          0% {
            opacity: 0;
            transform: translate3d(0, -10px, 0) rotate(0deg);
          }
          12% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate3d(30px, 108vh, 0) rotate(220deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .song-lanh-leaf,
          .song-lanh-card,
          .song-lanh-confetti,
          .song-lanh-leaf-rain {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
