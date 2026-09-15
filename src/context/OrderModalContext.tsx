"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { OrderModal } from "@/components/order/OrderModal";

interface OrderModalContextValue {
  isOpen: boolean;
  designSlug?: string;
  open: (designSlug?: string) => void;
  close: () => void;
}

const OrderModalContext = createContext<OrderModalContextValue | null>(null);

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [designSlug, setDesignSlug] = useState<string | undefined>(undefined);

  const open = useCallback((slug?: string) => {
    setDesignSlug(slug);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, designSlug, open, close }),
    [isOpen, designSlug, open, close],
  );

  return (
    <OrderModalContext.Provider value={value}>
      {children}
      <OrderModal />
    </OrderModalContext.Provider>
  );
}

export function useOrderModal(): OrderModalContextValue {
  const ctx = useContext(OrderModalContext);
  if (!ctx) {
    throw new Error("useOrderModal must be used within OrderModalProvider");
  }
  return ctx;
}
