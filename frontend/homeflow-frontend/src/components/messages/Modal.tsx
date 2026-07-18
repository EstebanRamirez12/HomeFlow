import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({
    isOpen,
    onClose,
    children,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}>
            <div
                className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}>

                {children}

            </div>
        </div>
    );
}