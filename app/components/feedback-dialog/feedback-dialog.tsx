"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "@/components/button";
import { useEffect } from "react";

interface FeedbackDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const FeedbackDialog = ({
  open,
  title,
  description,
  confirmLabel = "Got it",
  onClose,
  autoClose = false,
  autoCloseDelay = 3000,
}: FeedbackDialogProps) => {
  useEffect(() => {
    if (!open || !autoClose) return;
    const timeoutId = setTimeout(() => {
      onClose();
    }, autoCloseDelay);
    return () => clearTimeout(timeoutId);
  }, [open, autoClose, autoCloseDelay, onClose]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed top-4 right-4 p-2">
        <DialogPanel className="w-full max-w-sm rounded-xl border border-border bg-background p-5 shadow-xl">
          <DialogTitle className="text-lg font-semibold text-foreground">
            {title}
          </DialogTitle>
          <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          {!autoClose && (
            <div className="mt-4 flex justify-end">
              <Button onClick={onClose}>{confirmLabel}</Button>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
