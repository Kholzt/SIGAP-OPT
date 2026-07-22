import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
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
    Bell
} from 'lucide-react';

export default function AdminLayout({ children, currentTab = 'Dashboard' }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Data Serangan OPT', href: '/data-serangan', icon: Bug },
        { name: 'Model Prediksi', href: '/model-prediksi', icon: TrendingUp },
        { name: 'Status Endemis', href: '/model-prediksi', icon: MapPin },
        { name: 'Puncak Serangan', href: '/puncak-serangan', icon: BarChart3 },
        { name: 'Pengaturan', href: '#', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                <div>
                    {/* Brand Header */}
                    <div className="p-6 border-b border-slate-100">
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                            AgriPredict <span className="text-emerald-600">GIS</span>
                        </h1>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Admin Panel • Dinas Pertanian
                        </p>
                    </div>

                    {/* Navigation Items */}
                    <nav className="p-4 space-y-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentTab === item.name;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                        isActive
                                            ? 'bg-[#6EE7B7] text-slate-900 shadow-xs'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Navigation */}
                <div className="p-4 border-t border-slate-200/80 space-y-1">
                    <Link
                        href="#"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition"
                    >
                        <HelpCircle className="w-5 h-5 text-slate-500" />
                        <span>Bantuan</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    >
                        <LogOut className="w-5 h-5 text-rose-500" />
                        <span>Keluar</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header Navbar */}
                <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
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
                                <p className="text-sm font-bold text-slate-800 leading-none">Admin Utama</p>
                                <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
                                    DINAS PERTANIAN
                                </p>
                            </div>
                            <UserCircle className="w-9 h-9 text-slate-700 stroke-[1.5]" />
                        </div>
                    </div>
                </header>

                {/* Main Body */}
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p>© 2025 AgriPredict GIS - Sistem Informasi Geografis & Prediksi OPT Nasional.</p>
                    <div className="flex gap-4 font-medium text-slate-600">
                        <a href="#" className="hover:underline">Syarat & Ketentuan</a>
                        <a href="#" className="hover:underline">Kebijakan Privasi</a>
                        <a href="#" className="hover:underline">Kontak Teknis</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
