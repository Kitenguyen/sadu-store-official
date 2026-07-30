import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  favorites: Set<string>;
  cartFxTick: number;
  addToCart: (productId: string, quantity?: number) => void;
  checkoutNow: (productId: string, quantity?: number) => void;
  notifyCartFx: () => void;
  removeLine: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cartFxTick, setCartFxTick] = useState(0);

  const notifyCartFx = useCallback(() => {
    setCartFxTick((prev) => prev + 1);
  }, []);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    let shouldOpenCart = false;

    setLines((prev) => {
      shouldOpenCart = prev.length === 0;
      const existing = prev.find((line) => line.product.id === productId);
      if (existing) {
        return prev.map((line) =>
          line.product.id === productId
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [...prev, { product, quantity }];
    });

    if (shouldOpenCart) {
      setIsOpen(true);
    } else {
      setCartFxTick((prev) => prev + 1);
    }
  }, []);

  const checkoutNow = useCallback((productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setLines((prev) => {
      const existing = prev.find((line) => line.product.id === productId);
      if (existing) {
        return prev.map((line) =>
          line.product.id === productId
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((line) => line.product.id !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.product.id !== productId)
        : prev.map((line) =>
            line.product.id === productId ? { ...line, quantity } : line,
          ),
    );
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
    [lines],
  );

  const openCheckout = useCallback(() => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setIsOpen(false);
    setIsCheckoutOpen(false);
  }, []);

  const value: CartContextValue = {
    lines,
    isOpen,
    isCheckoutOpen,
    favorites,
    cartFxTick,
    addToCart,
    checkoutNow,
    notifyCartFx,
    removeLine,
    setQuantity,
    toggleFavorite,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    openCheckout,
    closeCheckout,
    clearCart,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
