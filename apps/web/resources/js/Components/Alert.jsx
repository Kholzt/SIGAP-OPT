import { Check } from "lucide-react";
import React from "react";

export default function Alert({ type, message }) {
    return (
        <>
            {message && (
                <div
                    className={`flex items-center gap-2 bg-${type === "success" ? "primary" : "red"}-100 border border-${type === "success" ? "primary" : "rose"}-200 text-${type === "success" ? "primary" : "rose"}-700 text-sm font-medium px-4 py-3 rounded-xl`}
                >
                    <Check className="w-4 h-4 shrink-0" />
                    {message}
                </div>
            )}
        </>
    );
}
