import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Bug, TrendingUp, MapPin, AlertTriangle } from "lucide-react";

export default function Dashboard() {
    return (
        <AdminLayout currentTab="Dashboard">
            <Head title="Dashboard" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Dashboard Utama
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Ringkasan pemantauan dan data serangan Organisme
                        Pengganggu Tumbuhan (OPT).
                    </p>
                </div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Total Laporan Serangan
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <Bug className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 mt-3">
                            1,248
                        </p>
                        <span className="text-xs font-semibold text-emerald-600 mt-1 inline-block">
                            +12% dibanding bulan lalu
                        </span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Luas Terkena Serangan
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 mt-3">
                            452 Ha
                        </p>
                        <span className="text-xs font-semibold text-amber-600 mt-1 inline-block">
                            Status Waspada
                        </span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Wilayah Endemis
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                <MapPin className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 mt-3">
                            18 Desa
                        </p>
                        <span className="text-xs font-semibold text-rose-600 mt-1 inline-block">
                            Risiko Tinggi: 4 Desa
                        </span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Akurasi Prediksi
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 mt-3">
                            94.2%
                        </p>
                        <span className="text-xs font-semibold text-blue-600 mt-1 inline-block">
                            Model ML V2.1
                        </span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
