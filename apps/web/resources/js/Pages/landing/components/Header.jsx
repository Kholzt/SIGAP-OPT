import { Link } from "@inertiajs/react";
import { Calendar, Lock } from "lucide-react";
export default function Header({ activeTab, setActiveTab }) {
    return (
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-30 shrink-0 shadow-xs">
            <div className="flex items-center gap-10">
                <Link
                    href="/"
                    className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1"
                >
                    AgriPredict <span className="text-emerald-700">GIS</span>
                </Link>

                {/* Navigation Tabs */}
                <nav className="hidden md:flex items-center gap-8 h-16">
                    {["Luas Serangan", "Puncak Serangan", "Status Endemis"].map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`h-full text-sm font-semibold flex items-center border-b-2 transition ${
                                    activeTab === tab
                                        ? "border-emerald-700 text-emerald-800 font-bold"
                                        : "border-transparent text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {tab}
                            </button>
                        ),
                    )}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>Mei 2024</span>
                </div>

                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 bg-[#006654] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#005243] transition shadow-xs"
                >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Admin Login</span>
                </Link>
            </div>
        </header>
    );
}
