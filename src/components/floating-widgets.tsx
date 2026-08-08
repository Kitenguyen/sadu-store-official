import { useEffect, useMemo, useState } from "react";
import { useCart } from "../lib/cart-context";
import { useRef } from "react";
import {
  trackApplyVoucher,
  trackContactClick,
  trackInitiateCheckout,
  trackViewCart,
} from "../lib/analytics";
import { formatVnd } from "../lib/products";
import { assetUrl } from "../lib/site";

const CONTACT_PHONE = "0355532863";
const ZALO_URL = `https://zalo.me/${CONTACT_PHONE}`;
const VOUCHER_CODE = "SONGLANH";
const VOUCHER_DISCOUNT = 5000;
const SHIPPING_FEE = 30000;
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxPJagkaTKGJ2w2uc7QKh9wh1JVCQ5pt6wm4hXZegpMHHkz2ZKTdTYoAROCYrG3BZ4/exec";
const VOUCHER_STORAGE_KEY = "sadu-voucher-songlanh-claimed";
const VOUCHER_UNLOCK_EVENT = "sadu:voucher-unlocked";

function normalizeVoucherCode(value: string) {
  return value.trim().toUpperCase();
}

function unlockVoucher() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(VOUCHER_STORAGE_KEY, "1");
  window.dispatchEvent(new Event(VOUCHER_UNLOCK_EVENT));
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GiftSummary({ mateGiftCount }: { mateGiftCount: number }) {
  if (mateGiftCount <= 0) return null;

  return (
    <div className="rounded-2xl border border-[#D6B36A]/30 bg-[#fff8eb] p-3 text-sm text-[#6d4c1d]">
      <p className="font-semibold">Khuyến mãi Trà Mate trong đơn hàng</p>
      <p className="mt-1 text-xs leading-relaxed text-[#6d4c1d]/80">
        {mateGiftCount >= 2
          ? "Mua 5 hộp Trà Mate, tặng 2 hộp. Đơn này của khách đã được tặng "
          : "Mua 3 hộp Trà Mate, tặng 1 hộp. Đơn này của khách đã được tặng "}
        <span className="font-bold">{mateGiftCount} hộp Trà Mate bất kỳ</span>.
      </p>
    </div>
  );
}

function OrderSummaryPanel({
  lines,
  subtotal,
  shipping,
  discount,
  grandTotal,
  mateGiftCount,
}: {
  lines: ReturnType<typeof useCart>["lines"];
  subtotal: number;
  shipping: number;
  discount: number;
  grandTotal: number;
  mateGiftCount: number;
}) {
  return (
    <>
      <p className="text-lg font-bold text-[#222222]">Tóm tắt đơn hàng</p>
      <div className="mt-5 space-y-4">
        {lines.length === 0 ? (
          <div className="rounded-2xl bg-[#FAF9F5] p-4 text-sm text-[#222222]/55">
            Giỏ hàng đang trống. Hãy thêm sản phẩm rồi quay lại thanh toán.
          </div>
        ) : (
          lines.map((line) => (
            <div key={line.product.id} className="flex gap-3 rounded-2xl bg-[#FAF9F5] p-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#F1EFE7]">
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-semibold text-[#222222]">
                  {line.product.name}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3 text-xs text-[#222222]/55">
                  <span>Số lượng: {line.quantity}</span>
                  <span
                    className={`font-semibold ${line.product.oldPrice ? "text-[#d12f2f]" : "text-[#1E5B38]"}`}
                  >
                    {formatVnd(line.quantity * line.product.price)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-5 space-y-3 rounded-[24px] bg-[#F7F5EE] p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#222222]/60">Tạm tính</span>
          <span className="font-semibold text-[#222222]">{formatVnd(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#222222]/60">Phí vận chuyển</span>
          <span className="font-semibold text-[#222222]">
            {shipping === 0 ? "Miễn phí" : formatVnd(shipping)}
          </span>
        </div>
        {subtotal > 0 && subtotal < 250000 ? (
          <p className="text-xs text-[#b5502f]">
            Đơn hàng dưới 250.000đ đang được cộng 30.000đ phí giao hàng.
          </p>
        ) : null}
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#222222]/60">Voucher {VOUCHER_CODE}</span>
          <span className="font-semibold text-[#b5502f]">-{formatVnd(discount)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-black/8 pt-3">
          <span className="text-sm font-semibold text-[#222222]">Tổng thanh toán</span>
          <span className="text-xl font-bold text-[#1E5B38]">{formatVnd(grandTotal)}</span>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <GiftSummary mateGiftCount={mateGiftCount} />

        <div className="rounded-[24px] border border-[#1E5B38]/10 bg-[#f7fbf8] p-4">
          <p className="text-sm font-semibold text-[#1E5B38]">Liên hệ nhanh để xác nhận đơn</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={`tel:${CONTACT_PHONE}`}
              onClick={() => trackContactClick("phone", "checkout_sidebar")}
              className="rounded-full bg-[#1E5B38] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Gọi {CONTACT_PHONE}
            </a>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContactClick("zalo", "checkout_sidebar")}
              className="rounded-full border border-[#1E5B38]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#1E5B38]"
            >
              Zalo {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function CheckoutModal() {
  const { lines, isCheckoutOpen, closeCheckout, clearCart, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponClaimed, setCouponClaimed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    payment: "cod",
  });
  const checkoutTrackedRef = useRef(false);
  const voucherTrackedRef = useRef(false);

  const mateCount = useMemo(
    () =>
      lines
        .filter((line) => line.product.category === "tra-mate")
        .reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );
  const mateGiftCount = mateCount >= 5 ? 2 : mateCount >= 3 ? 1 : 0;
  const shipping = subtotal >= 250000 ? 0 : lines.length > 0 ? SHIPPING_FEE : 0;
  const normalizedCouponCode = normalizeVoucherCode(couponCode);
  const voucherMatches = normalizedCouponCode === VOUCHER_CODE;
  const discount = couponApplied && voucherMatches ? VOUCHER_DISCOUNT : 0;
  const grandTotal = Math.max(0, subtotal + shipping - discount);

  useEffect(() => {
    const syncClaimState = () => {
      const claimed = window.localStorage.getItem(VOUCHER_STORAGE_KEY) === "1";
      setCouponClaimed(claimed);
    };

    syncClaimState();
    window.addEventListener(VOUCHER_UNLOCK_EVENT, syncClaimState);
    window.addEventListener("storage", syncClaimState);

    return () => {
      window.removeEventListener(VOUCHER_UNLOCK_EVENT, syncClaimState);
      window.removeEventListener("storage", syncClaimState);
    };
  }, []);

  useEffect(() => {
    if (!couponClaimed) return;
    setCouponCode((prev) => prev || VOUCHER_CODE);
    setCouponApplied(true);
  }, [couponClaimed]);

  useEffect(() => {
    if (!isCheckoutOpen || !couponClaimed) return;
    setCouponCode(VOUCHER_CODE);
    setCouponApplied(true);
  }, [couponClaimed, isCheckoutOpen]);

  useEffect(() => {
    if (!isCheckoutOpen) {
      setSubmitted(false);
      setSubmitError("");
      setCouponCode("");
      setCouponApplied(false);
      checkoutTrackedRef.current = false;
      voucherTrackedRef.current = false;
    }
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (!isCheckoutOpen || checkoutTrackedRef.current) return;
    trackInitiateCheckout(lines, grandTotal);
    checkoutTrackedRef.current = true;
  }, [grandTotal, isCheckoutOpen, lines]);

  useEffect(() => {
    if (!isCheckoutOpen || !couponApplied || !voucherMatches || voucherTrackedRef.current) return;
    trackApplyVoucher(VOUCHER_CODE, VOUCHER_DISCOUNT, grandTotal);
    voucherTrackedRef.current = true;
  }, [couponApplied, grandTotal, isCheckoutOpen, voucherMatches]);

  const applyVoucher = () => {
    setCouponCode(normalizedCouponCode);
    const isValid = normalizedCouponCode === VOUCHER_CODE;
    setCouponApplied(isValid);
    if (isValid) {
      unlockVoucher();
      setCouponClaimed(true);
    }
  };

  const matePromotionSummary =
    mateGiftCount >= 2
      ? `Khuyến mãi Trà Mate: mua 5 tặng 2, khách được tặng ${mateGiftCount} hộp`
      : mateGiftCount === 1
        ? `Khuyến mãi Trà Mate: mua 3 tặng 1, khách được tặng ${mateGiftCount} hộp`
        : "";

  async function submitOrder() {
    if (lines.length === 0) return;

    const noteWithPromotion = [customer.note.trim(), matePromotionSummary]
      .filter(Boolean)
      .join(" | ");

    const payload = {
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        note: noteWithPromotion,
        payment: customer.payment,
      },
      items: lines.map((line) => ({
        id: line.product.id,
        sku: line.product.sku,
        slug: line.product.slug,
        name: line.product.name,
        category: line.product.category,
        price: line.product.price,
        quantity: line.quantity,
        lineTotal: line.product.price * line.quantity,
        image: line.product.image,
        url: line.product.url,
      })),
      subtotal,
      shipping,
      discount,
      grandTotal,
      voucherCode: normalizedCouponCode,
      couponApplied,
      couponClaimed,
      mateCount,
      mateGiftCount,
      matePromotionSummary,
      sourcePage: window.location.href,
      userAgent: navigator.userAgent,
    };

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch (error) {
      setSubmitError("Không gửi được đơn hàng. Vui lòng thử lại.");
      console.error("Submit order failed", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Đóng form thanh toán"
        onClick={closeCheckout}
        className="absolute inset-0 bg-[#0f1f17]/55 backdrop-blur-[3px]"
      />

      <div className="absolute inset-0 flex items-start justify-center overflow-y-auto p-3 md:items-center md:p-5">
        <div className="relative mt-3 grid w-full max-w-[1040px] overflow-hidden rounded-[30px] bg-[#FAF9F5] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.5)] max-md:max-h-[calc(100dvh-1.5rem)] max-md:grid-rows-[auto_minmax(0,1fr)] md:mt-0 md:h-[min(88vh,760px)] md:grid-cols-[minmax(0,1.05fr)_360px]">
          <button
            type="button"
            aria-label="Đóng"
            onClick={closeCheckout}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/90 text-[#222222] shadow-sm transition hover:bg-white"
          >
            ✕
          </button>

          <div className="flex min-h-0 flex-col overflow-hidden px-5 py-5 md:px-7 md:py-6">
            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E5B38]/55">
                Checkout
              </p>
              <h2 className="mt-2 pr-10 text-2xl font-bold tracking-tight text-[#1E5B38] md:text-[2rem]">
                Hoàn tất đơn hàng SADU
              </h2>
              <p className="mt-2 text-xs font-medium text-[#b5502f]">
                Đơn dưới 250.000đ sẽ cộng thêm 30.000đ phí ship.
              </p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#222222]/60">
                Điền thông tin thanh toán.
              </p>
            </div>

            <div className="mb-4 rounded-[24px] bg-white p-4 shadow-sm md:hidden">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Tóm tắt đơn hàng</p>
                  <p className="mt-1 text-xs text-[#222222]/55">
                    {lines.length > 0
                      ? `${lines.reduce((sum, line) => sum + line.quantity, 0)} sản phẩm`
                      : "Giỏ hàng đang trống"}
                  </p>
                </div>
                <p className="text-lg font-bold text-[#1E5B38]">{formatVnd(grandTotal)}</p>
              </div>
              {subtotal > 0 && subtotal < 250000 ? (
                <p className="mt-3 text-xs text-[#b5502f]">
                  Đơn dưới 250.000đ đang cộng 30.000đ phí giao hàng.
                </p>
              ) : null}
            </div>

            {submitted ? (
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E5B38] text-white">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#1E5B38]">Đã gửi yêu cầu đặt hàng</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#222222]/65">
                  Cảm ơn {customer.name || "bạn"} đã gửi thông tin. Đội ngũ SADU sẽ liên hệ qua số{" "}
                  <span className="font-semibold">{customer.phone || CONTACT_PHONE}</span> để xác
                  nhận đơn sớm nhất.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    onClick={() => trackContactClick("phone", "checkout_success")}
                    className="rounded-full bg-[#1E5B38] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Gọi {CONTACT_PHONE}
                  </a>
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackContactClick("zalo", "checkout_success")}
                    className="rounded-full border border-[#1E5B38]/15 bg-white px-5 py-3 text-sm font-semibold text-[#1E5B38]"
                  >
                    Nhắn Zalo xác nhận
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      setCustomer({ name: "", phone: "", address: "", note: "", payment: "cod" });
                    }}
                    className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#222222]"
                  >
                    Xong
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await submitOrder();
                }}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
                      <span className="font-medium text-[#222222]">Họ và tên</span>
                      <input
                        required
                        value={customer.name}
                        onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#222222] outline-none transition placeholder:text-[#222222]/40 focus:border-[#1E5B38]"
                        placeholder="Nhập họ và tên"
                      />
                    </label>
                    <label className="space-y-2 text-sm">
                      <span className="font-medium text-[#222222]">Số điện thoại</span>
                      <input
                        required
                        value={customer.phone}
                        onChange={(e) =>
                          setCustomer((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#222222] outline-none transition placeholder:text-[#222222]/40 focus:border-[#1E5B38]"
                        placeholder="0355532863"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-[#222222]">Địa chỉ nhận hàng</span>
                    <textarea
                      required
                      rows={3}
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer((prev) => ({ ...prev, address: e.target.value }))
                      }
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#222222] outline-none transition placeholder:text-[#222222]/40 focus:border-[#1E5B38]"
                      placeholder="Số nhà, thôn/xóm, xã/phường, quận/huyện, tỉnh/thành"
                    />
                  </label>

                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-[#222222]">Ghi chú đơn hàng</span>
                    <textarea
                      rows={2}
                      value={customer.note}
                      onChange={(e) => setCustomer((prev) => ({ ...prev, note: e.target.value }))}
                      className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#222222] outline-none transition placeholder:text-[#222222]/40 focus:border-[#1E5B38]"
                      placeholder="Ví dụ: Gọi trước khi giao, giao giờ hành chính..."
                    />
                  </label>

                  <div className="rounded-[24px] bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b5502f]">
                          Voucher 5K
                        </p>
                        <p className="mt-1 text-sm text-[#222222]/65">
                          Nhập mã voucher hoặc lấy nhanh từ popup.
                        </p>
                      </div>
                      <div className="rounded-full bg-[#fff3ee] px-3 py-1 text-sm font-bold text-[#b5502f]">
                        {formatVnd(VOUCHER_DISCOUNT)}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="w-full rounded-2xl border border-[#D6B36A]/40 bg-[#fffdf8] px-4 py-3 text-sm font-semibold tracking-[0.08em] text-[#222222] outline-none transition placeholder:text-[#222222]/40 focus:border-[#1E5B38]"
                        placeholder="Nhập mã SONGLANH"
                      />
                      <button
                        type="button"
                        onClick={applyVoucher}
                        className="rounded-2xl bg-[#1E5B38] px-5 py-3 text-sm font-semibold text-white"
                      >
                        Áp dụng
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-[#222222]/55">
                      {couponApplied && voucherMatches
                        ? `Đã áp dụng mã ${VOUCHER_CODE} thành công.`
                        : couponClaimed
                          ? `Mã ${VOUCHER_CODE} đã sẵn sàng. Nhập đúng mã để giảm ${formatVnd(VOUCHER_DISCOUNT)}.`
                          : `Khách có thể nhập trực tiếp mã ${VOUCHER_CODE} để giảm ${formatVnd(VOUCHER_DISCOUNT)}.`}
                    </p>
                  </div>

                  <div className="rounded-[24px] bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-[#222222]">Phương thức thanh toán</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {[
                        { id: "cod", label: "Thanh toán khi nhận hàng" },
                        { id: "bank", label: "Chuyển khoản trước" },
                      ].map((option) => (
                        <label
                          key={option.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                            customer.payment === option.id
                              ? "border-[#1E5B38] bg-[#1E5B38]/5 text-[#1E5B38]"
                              : "border-black/10 bg-[#FAF9F5] text-[#222222]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={option.id}
                            checked={customer.payment === option.id}
                            onChange={(e) =>
                              setCustomer((prev) => ({ ...prev, payment: e.target.value }))
                            }
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 shrink-0 border-t border-black/8 bg-[#FAF9F5] pb-2 pt-4">
                  {submitError ? (
                    <p className="mb-3 text-sm font-medium text-[#b5502f]">{submitError}</p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={lines.length === 0 || isSubmitting}
                    className="w-full rounded-full bg-[#1E5B38] py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(30,91,56,0.55)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Đang gửi đơn hàng..."
                      : `Xác nhận đặt hàng · ${formatVnd(grandTotal)}`}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="hidden min-h-0 overflow-y-auto border-l border-black/8 bg-[#fffdf9] px-6 py-6 md:block">
            <OrderSummaryPanel
              lines={lines}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              grandTotal={grandTotal}
              mateGiftCount={mateGiftCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, removeLine, subtotal, openCheckout } = useCart();
  const cartTrackedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      cartTrackedRef.current = false;
      return;
    }
    if (cartTrackedRef.current) return;
    trackViewCart(lines, subtotal);
    cartTrackedRef.current = true;
  }, [isOpen, lines, subtotal]);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Đóng giỏ hàng"
          onClick={closeCart}
          className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#FAF9F5] shadow-2xl transition-transform duration-500 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-black/8 px-6 py-5">
            <h2 className="text-lg font-semibold text-[#222222]">Giỏ hàng của bạn</h2>
            <button
              type="button"
              aria-label="Đóng"
              onClick={closeCart}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#222222"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {lines.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <p className="text-sm text-[#222222]/50">Giỏ hàng của bạn đang trống.</p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    scrollToSection("categories");
                  }}
                  className="rounded-full bg-[#1E5B38] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Xem sản phẩm nổi bật
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {lines.map((line) => (
                  <li key={line.product.id} className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F1EFE7]">
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-[#222222]">
                        {line.product.name}
                      </p>
                      <p
                        className={`mt-1 text-sm font-semibold ${line.product.oldPrice ? "text-[#d12f2f]" : "text-[#1E5B38]"}`}
                      >
                        {formatVnd(line.product.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-black/10">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-sm text-[#222222]/60"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-xs font-medium">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-sm text-[#222222]/60"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.product.id)}
                          className="text-xs text-[#222222]/40 underline hover:text-[#222222]/70"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="sticky bottom-0 border-t border-black/8 bg-[#FAF9F5] px-6 py-5">
            <div className="mb-3 rounded-[24px] border border-[#D6B36A]/25 bg-white px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b5502f]">
                Voucher landing page
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-bold tracking-tight text-[#1E5B38]">{VOUCHER_CODE}</p>
                  <p className="text-xs text-[#222222]/55">
                    Có thể nhập trực tiếp trong checkout hoặc lấy nhanh ở popup voucher
                  </p>
                </div>
                <div className="rounded-full bg-[#fff2e8] px-3 py-1.5 text-sm font-bold text-[#b5502f]">
                  -5K
                </div>
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-[#222222]/60">Tạm tính</span>
              <span className="text-lg font-bold text-[#1E5B38]">{formatVnd(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-[#222222]/55">
              Miễn phí vận chuyển cho đơn từ 250.000đ. Thanh toán sẽ mở form checkout chi tiết.
            </p>
            <p className="-mt-2 mb-4 text-xs font-medium text-[#b5502f]">
              Đơn dưới 250.000đ sẽ cộng thêm 30.000đ phí ship.
            </p>
            <button
              type="button"
              onClick={openCheckout}
              disabled={lines.length === 0}
              className="w-full rounded-full bg-[#1E5B38] py-3.5 text-sm font-semibold text-white transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Thanh toán ngay
            </button>
          </div>
        </aside>
      </div>

      <CheckoutModal />
    </>
  );
}

export function SupportBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-4 z-40 md:bottom-8 md:right-5">
      {open ? (
        <div className="mb-3 w-72 rounded-[24px] bg-white p-4 text-sm shadow-xl">
          <p className="font-semibold text-[#222222]">Liên hệ SADU thật nhanh</p>
          <p className="mt-1 text-xs leading-relaxed text-[#222222]/60">
            Gọi trực tiếp hoặc nhắn Zalo để được tư vấn miễn phí và xác nhận đơn nhanh hơn.
          </p>
          <div className="mt-4 grid gap-2">
            <a
              href={`tel:${CONTACT_PHONE}`}
              onClick={() => trackContactClick("phone", "support_bubble")}
              className="flex items-center justify-between rounded-2xl bg-[#1E5B38] px-4 py-3 text-sm font-semibold text-white"
            >
              <span>Gọi {CONTACT_PHONE}</span>
              <span>→</span>
            </a>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContactClick("zalo", "support_bubble")}
              className="flex items-center gap-3 rounded-2xl border border-[#1E5B38]/10 bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-[#1266f1]"
            >
              <img
                src={assetUrl("/assets/icons/zalo.webp")}
                alt="Zalo"
                className="h-6 w-6 rounded-full object-cover"
              />
              Nhắn Zalo {CONTACT_PHONE}
            </a>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        aria-label="Hỗ trợ"
        onClick={() => setOpen((v) => !v)}
        className="flex h-13 w-13 animate-[pulse_3s_ease-in-out_infinite] items-center justify-center rounded-full bg-white shadow-[0_10px_25px_-8px_rgba(0,0,0,0.35)] transition active:scale-90"
      >
        <img
          src={assetUrl("/assets/icons/zalo.webp")}
          alt="Zalo"
          className="h-9 w-9 rounded-full object-cover"
        />
      </button>
    </div>
  );
}

export function MobilePurchaseBar() {
  const { count, subtotal, openCart } = useCart();
  const hasItems = count > 0;
  const [afterHero, setAfterHero] = useState(false);
  const [inProducts, setInProducts] = useState(false);

  useEffect(() => {
    const updateBarState = () => {
      const hero = document.querySelector("main .md\\:hidden section");
      const products = document.getElementById("products");
      const viewportHeight = window.innerHeight;

      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setAfterHero(heroBottom <= 88);
      }

      if (products) {
        const rect = products.getBoundingClientRect();
        setInProducts(rect.top <= viewportHeight * 0.35 && rect.bottom >= 140);
      }
    };

    updateBarState();
    window.addEventListener("scroll", updateBarState, { passive: true });
    window.addEventListener("resize", updateBarState);

    return () => {
      window.removeEventListener("scroll", updateBarState);
      window.removeEventListener("resize", updateBarState);
    };
  }, []);

  if (!afterHero) return null;

  const ctaLabel = hasItems ? "Xem giỏ" : inProducts ? "Mua ngay" : "Xem Trà Mate";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-[#FAF9F5]/95 px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg md:hidden">
      <div className="flex min-h-[64px] items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium text-[#222222]/50">Ưu đãi đang mở</p>
          <p className="text-base font-bold text-[#1E5B38]">
            {`Mã ${VOUCHER_CODE} giảm ${formatVnd(VOUCHER_DISCOUNT)}`}
          </p>
          {hasItems ? (
            <p className="mt-0.5 text-[11px] text-[#222222]/55">
              {count} sản phẩm · {formatVnd(subtotal)}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => {
            if (hasItems) {
              openCart();
              return;
            }

            if (inProducts) {
              const primaryCta = document.querySelector<HTMLButtonElement>(
                "[data-product-primary-cta='true']",
              );
              primaryCta?.click();
              return;
            }

            scrollToSection("mate-collection");
          }}
          className="flex-1 rounded-full bg-[#1E5B38] px-4 py-3.5 text-base font-semibold text-white transition active:scale-[0.97]"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

export function CouponWidget() {
  const [visible, setVisible] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const syncVoucher = () => {
      const dismissed = window.localStorage.getItem("sadu-coupon-dismissed");
      const hasClaimed = window.localStorage.getItem(VOUCHER_STORAGE_KEY) === "1";
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
      setVisible(!dismissed);
      setClaimed(hasClaimed);
    };

    const timer = window.setTimeout(syncVoucher, window.matchMedia("(max-width: 767px)").matches ? 9000 : 0);
    window.addEventListener(VOUCHER_UNLOCK_EVENT, syncVoucher);
    window.addEventListener("storage", syncVoucher);
    window.addEventListener("resize", syncVoucher);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(VOUCHER_UNLOCK_EVENT, syncVoucher);
      window.removeEventListener("storage", syncVoucher);
      window.removeEventListener("resize", syncVoucher);
    };
  }, []);

  if (!visible) return null;

  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-5 z-40 w-[250px] overflow-hidden rounded-[28px] border border-[#D6B36A]/35 bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] md:bottom-8">
      <div className="bg-[radial-gradient(circle_at_top_left,_rgba(214,179,106,0.35),_transparent_48%),linear-gradient(135deg,#1E5B38,#2b7a4a)] px-5 pb-5 pt-4 text-white">
        <button
          type="button"
          aria-label="Đóng voucher"
          onClick={() => {
            window.localStorage.setItem("sadu-coupon-dismissed", "1");
            setVisible(false);
          }}
          className="absolute right-3 top-3 text-xs text-white/70"
        >
          ✕
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D6B36A]">
          Voucher ưu đãi
        </p>
        <p className="mt-2 text-3xl font-bold tracking-tight">{formatVnd(VOUCHER_DISCOUNT)}</p>
        <p className="mt-2 text-sm text-white/80">
          Bấm lấy mã để sao chép nhanh, hoặc nhập trực tiếp trong form thanh toán.
        </p>
      </div>

      <div className="space-y-3 px-5 py-4">
        <div className="rounded-[20px] border border-dashed border-[#D6B36A]/50 bg-[#fffbf2] px-4 py-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#1E5B38]/55">Mã voucher</p>
          <p className="mt-1 text-xl font-extrabold tracking-[0.18em] text-[#1E5B38]">
            {VOUCHER_CODE}
          </p>
        </div>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(VOUCHER_CODE);
            unlockVoucher();
            setClaimed(true);
          }}
          className="w-full rounded-full bg-[#1E5B38] py-3 text-sm font-semibold text-white"
        >
          {claimed ? "Đã lấy mã SONGLANH" : "Lấy mã voucher"}
        </button>
      </div>
    </div>
  );
}
