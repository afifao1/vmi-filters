import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  widthClass = "w-[640px] max-w-[92vw]",
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[1px] flex items-start justify-center overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative mt-24 mb-12 bg-white rounded-xl shadow-2xl ${widthClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3.5 top-3.5 grid place-items-center w-9 h-9 rounded-md border border-slate-200
                     text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
        >
          ×
        </button>

        {title && (
          <div className="px-6 pt-6 pb-2">
            <h3
              id="modal-title"
              className="text-[28px] md:text-[32px] leading-tight font-semibold text-slate-900"
            >
              {title}
            </h3>
          </div>
        )}

        <div className="p-6 pt-2">{children}</div>
      </div>
    </div>,
    document.body
  );
}
