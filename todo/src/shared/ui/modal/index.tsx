import { X } from "lucide-react";
import { useEffect, useRef, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface IModal {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  modalWrapperClassName?: string;
  maskClassName?: string;
  maskClosable?: boolean;
  keyboard?: boolean;
  ariaLabel?: string;
  title: string;
  subtitle?: string;
}

const Modal: FC<IModal> = ({
  open,
  onClose,
  maskClosable = false,
  keyboard = true,
  children,
  modalWrapperClassName = "",
  maskClassName = "",
  ariaLabel = "Modal",
  title,
  subtitle,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !keyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, keyboard, onClose]);

  const modalRoot = document.getElementById("modal-root");

  if (!open || !modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && maskClosable) {
          onClose?.();
        }
      }}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-black/50 backdrop-blur-sm ${maskClassName}`}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`
          relative
          w-full
          max-w-lg
          max-h-[90dvh]
          overflow-y-auto
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
          outline-none
          ${modalWrapperClassName}
        `}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {subtitle && subtitle}
            </p>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close form"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
