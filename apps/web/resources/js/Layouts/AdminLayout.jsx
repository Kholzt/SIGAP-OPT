import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    Bug,
    TrendingUp,
    MapPin,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    UserCircle,
    Bell,
    Database,
    Map,
} from "lucide-react";
import Sidebar from "@/Components/Sidebar";

export default function AdminLayout({ children, currentTab = "Dashboard" }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, groupName: "Overview" },
        { name: "Model Prediksi", href: "/model-prediksi", icon: TrendingUp, groupName: "Analitik" },
        { name: "Status Endemis", href: "/status-endemis", icon: MapPin, groupName: "Analitik" },
        { name: "Data Serangan OPT", href: "/data-serangan", icon: Bug, groupName: "Master Data" },
        { name: "Data OPT", href: "/opt", icon: Database, groupName: "Master Data" },
        { name: "Data Kecamatan", href: "/kecamatan", icon: Map, groupName: "Master Data" },
    ];

    return (
        <div className="h-screen bg-[#F8FAFC] flex text-slate-800 font-sans ">
            <Sidebar
                navItems={navItems}
                currentTab={currentTab}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Header Navbar */}
                <header className="py-4 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition focus:outline-none"
                            aria-label="Toggle Navigation"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 relative rounded-full hover:bg-slate-100">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800 leading-none">
                                    Admin Utama
                                </p>
                                <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
                                    DINAS PERTANIAN
                                </p>
                            </div>
                            <UserCircle className="w-9 h-9 text-slate-700 stroke-[1.5]" />
                        </div>
                    </div>
                </header>

                {/* Main Body */}
                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p>
                        © 2025 AgriPredict GIS - Sistem Informasi Geografis &
                        Prediksi OPT Nasional.
                    </p>
                    <div className="flex gap-4 font-medium text-slate-600">
                        <a href="#" className="hover:underline">
                            Syarat & Ketentuan
                        </a>
                        <a href="#" className="hover:underline">
                            Kebijakan Privasi
                        </a>
                        <a href="#" className="hover:underline">
                            Kontak Teknis
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
