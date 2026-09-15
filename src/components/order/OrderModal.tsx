"use client";

import { useEffect, useRef } from "react";
import { useOrderModal } from "@/context/OrderModalContext";
import { OrderForm } from "./OrderForm";
import { designs } from "@/data/designs";

export function OrderModal() {
  const { isOpen, designSlug, close } = useOrderModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => close();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [close]);

  const design = designSlug ? designs.find((d) => d.slug === designSlug) : undefined;

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="fixed inset-0 m-auto max-h-[90vh] w-[92vw] max-w-lg border-0 bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-[2px]"
      aria-labelledby="order-modal-title"
    >
      <div className="relative max-h-[90vh] overflow-y-auto bg-[var(--color-surface)] p-6 shadow-2xl sm:p-9">
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть форму заказа"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-xl leading-none text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
        >
          ×
        </button>

        <p className="mb-2 text-xs tracking-caps-lg uppercase text-[var(--color-fg-muted)]">
          (Заказ)
        </p>
        <h2 id="order-modal-title" className="font-display mb-6 text-3xl sm:text-4xl">
          Оформить приглашение
        </h2>

        {isOpen && (
          <OrderForm
            key={`${designSlug ?? "blank"}-${isOpen}`}
            initialDesignSlug={design?.slug}
            onDone={close}
          />
        )}
      </div>
    </dialog>
  );
}
