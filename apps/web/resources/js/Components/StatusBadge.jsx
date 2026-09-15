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
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Aman
                </span>
            );
        case "Potensial":
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    Potensial
                </span>
            );
        case "Sporadis":
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                    Sporadis
                </span>
            );
        case "Endemis":
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                    Endemis
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    {status || "Aman"}
                </span>
            );
    }
}
