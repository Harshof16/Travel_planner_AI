import React, { useState } from "react";
import { AlertType } from "../../data/constants";

interface AlertProps {
    type?: AlertType;
    message: string;
    duration?: number; // in ms
    onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
    type = "info",
    message,
    duration = 3000,
    onClose,
}) => {
    const [visible, setVisible] = useState(true);

    React.useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setVisible(false);
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!visible) return null;

    const typeStyles: Record<AlertType, string> = {
        info: "bg-blue-100 text-blue-800 border-blue-300",
        success: "bg-green-100 text-green-800 border-green-300",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
        error: "bg-red-100 text-red-800 border-red-300",
    };

    return (
        <div
            className={`flex items-center border-l-4 px-4 py-3 mb-4 rounded ${typeStyles[type]}`}
            role="alert"
        >
            <span className="flex-1">{message}</span>
            <button
                className="ml-4 text-lg font-bold focus:outline-none"
                onClick={() => {
                    setVisible(false);
                    onClose?.();
                }}
                aria-label="Close"
            >
                ×
            </button>
        </div>
    );
};