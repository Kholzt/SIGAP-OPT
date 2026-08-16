import React from "react";

export const getStatusColor = (status) => {
    switch (status) {
        case "Aman":
            return "#10B981";
        case "Potensial":
            return "#F59E0B";
        case "Sporadis":
            return "#F87171";
        case "Endemis":
            return "#EF4444";
        default:
            return "#10B981";
    }
};

export default function StatusBadge({ status = "Aman" }) {
    switch (status) {
        case "Aman":
            return (
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#10B981] text-white shadow-2xs">
                    Aman
                </span>
            );
        case "Potensial":
            return (
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#F59E0B] text-white shadow-2xs">
                    Potensial
                </span>
            );
        case "Sporadis":
            return (
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#F87171] text-white shadow-2xs">
                    Sporadis
                </span>
            );
        case "Endemis":
            return (
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#EF4444] text-white shadow-2xs">
                    Endemis
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
                    {status || "Aman"}
                </span>
            );
    }
}
