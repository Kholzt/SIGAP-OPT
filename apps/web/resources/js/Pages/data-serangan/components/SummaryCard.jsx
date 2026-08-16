import { AlertTriangle, Bug, Clock } from "lucide-react";
export default function SummaryCard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
                    <Bug className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        Total Laporan Bulan Ini
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                        1,248
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 w-16 h-16 bg-teal-50 rounded-tl-full opacity-50 -z-0"></div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-rose-100/70 text-rose-700 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        Status Waspada Tinggi
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                        12 Wilayah
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 w-16 h-16 bg-rose-50 rounded-tl-full opacity-50 -z-0"></div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        Update Terakhir
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                        2 Menit Lalu
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 w-16 h-16 bg-blue-50 rounded-tl-full opacity-50 -z-0"></div>
            </div>
        </div>
    );
}
