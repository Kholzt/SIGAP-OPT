import React from "react";
import { Bug } from "lucide-react";

export default function LegendaStatusCard({
    selectedOPTName = "Wereng Batang Coklat",
}) {
    return (
        <div className="absolute bottom-5 left-5 z-[1000] w-72 sm:w-80 bg-white/90 backdrop-blur-md p-4.5 rounded-2xl shadow-xl border border-white/50 text-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-2.5">
                Legenda Status
            </h4>

            <div className="space-y-2 font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#10B981] shadow-2xs"></span>
                    <span>0 = Aman</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-2xs"></span>
                    <span>1 = Potensial</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#F87171] shadow-2xs"></span>
                    <span>2 = Sporadis</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444] shadow-2xs"></span>
                    <span>3 = Endemis</span>
                </div>
            </div>

            <div className="border-t border-slate-200/80 my-3 pt-2.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    OBJEK PENGAMATAN
                </p>
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <Bug className="w-4 h-4 text-emerald-600" />
                    <span>{selectedOPTName}</span>
                </div>
            </div>
        </div>
    );
}
