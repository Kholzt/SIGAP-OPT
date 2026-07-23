import React from "react";

export default function Alert({ type, message }) {
    return (
        <>
            {message && (
                <div
                    className={`flex items-center gap-2 bg-${type === "success" ? "emerald" : "rose"}-50 border border-${type === "success" ? "emerald" : "rose"}-200 text-${type === "success" ? "emerald" : "rose"}-700 text-sm font-medium px-4 py-3 rounded-xl`}
                >
                    <Check className="w-4 h-4 shrink-0" />
                    {message}
                </div>
            )}
        </>
    );
}
