import React from "react";
import { AlertType } from "../../data/constants";

interface ConfirmBoxProps {
    open: boolean;
    type?: AlertType;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmBox: React.FC<ConfirmBoxProps> = ({
    open,
    type = "info",
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
}) => {
    if (!open) return null;

    const typeStyles: Record<AlertType, string> = {
        info: "bg-blue-100 text-blue-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className={`rounded-lg shadow-lg p-6 w-full max-w-sm ${typeStyles[type]}`}>
                {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            type === "error"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : type === "success"
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : type === "warning"
                                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};