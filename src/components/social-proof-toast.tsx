import { useEffect, useRef, useState } from "react";
import type { MobileHeroVariant } from "../lib/mobile-hero-content";
import { getSocialProofFeed, type SocialProofItem } from "../lib/social-proof-feed";

const TOAST_INITIAL_DELAY = 6000;
const TOAST_VISIBLE_DURATION = 6500;
const TOAST_NEXT_DELAY = 18000;
const TOAST_CLOSE_DELAY = 24000;
const TOAST_RESUME_DELAY = 4000;

function getRandomNextItem(feed: SocialProofItem[], currentIndex: number) {
  if (feed.length === 1) {
    return { item: feed[0], index: 0 };
  }

  let nextIndex = currentIndex;

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * feed.length);
  }

  return { item: feed[nextIndex], index: nextIndex };
}

export function SocialProofToast({ variant = "default" }: { variant?: MobileHeroVariant }) {
  const feed = getSocialProofFeed(variant);
  const [currentItem, setCurrentItem] = useState<SocialProofItem>(feed[0]);
  const [visible, setVisible] = useState(false);
  const currentIndexRef = useRef(-1);
  const pausedRef = useRef(false);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const clearShowTimer = () => {
    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  };

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const scheduleNext = (delay: number) => {
    clearShowTimer();
    showTimerRef.current = window.setTimeout(() => {
      if (pausedRef.current) return;

      const { item, index } = getRandomNextItem(feed, currentIndexRef.current);
      currentIndexRef.current = index;
      setCurrentItem(item);
      setVisible(true);
      clearHideTimer();
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
        scheduleNext(TOAST_NEXT_DELAY);
      }, TOAST_VISIBLE_DURATION);
    }, delay);
  };

  useEffect(() => {
    if (!feed.length) return;

    currentIndexRef.current = -1;
    setCurrentItem(feed[0]);
    setVisible(false);

    scheduleNext(TOAST_INITIAL_DELAY);

    return () => {
      clearShowTimer();
      clearHideTimer();
    };
  }, [variant]);

  if (!feed.length) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      onMouseEnter={() => {
        pausedRef.current = true;
        clearShowTimer();
        clearHideTimer();
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
        if (visible) {
          clearHideTimer();
          hideTimerRef.current = window.setTimeout(() => {
            setVisible(false);
            scheduleNext(TOAST_NEXT_DELAY);
          }, TOAST_RESUME_DELAY);
        } else {
          scheduleNext(TOAST_RESUME_DELAY);
        }
      }}
      className={`fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-4 z-50 flex w-[min(360px,calc(100vw-2rem))] items-center gap-3 rounded-[22px] border border-[#C98A3D]/20 bg-[rgba(255,253,248,0.96)] px-4 py-4 text-left shadow-[0_24px_54px_-28px_rgba(18,60,38,0.45)] backdrop-blur-md transition duration-300 md:bottom-44 md:left-5 ${
        visible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-6 scale-[0.96] opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Đóng thông báo"
        onClick={() => {
          setVisible(false);
          clearHideTimer();
          scheduleNext(TOAST_CLOSE_DELAY);
        }}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-sm text-[#6f6457] transition hover:bg-[#ede4d3]"
      >
        ×
      </button>

      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[18px] bg-[#efe8d8]">
        <img
          src={currentItem.avatar}
          alt={currentItem.customer}
          width={56}
          height={56}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 pr-5">
        <p className="line-clamp-1 text-[14px] font-bold text-[#184f33]">{currentItem.customer}</p>
        <p className="mt-1 line-clamp-2 text-[13px] font-semibold leading-5 text-[#43764f]">
          vừa đặt {currentItem.combo}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#766b5f]">
          <span>{currentItem.city}</span>
          <span>{currentItem.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
