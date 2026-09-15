import {
    Crosshair,
    Info,
    Layers,
    Minus,
    Plus,
    SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import Header from "./components/Header";
import StatusEndemis from "../status-endemis/StatusEndemis";
import StatusEndemisMapLanding from "./components/StatusEndemisMapLanding";
import { Head } from "@inertiajs/react";

export default function Landing({
    allKecamatan = [],
    allOPT = [],
    musimList = [],
    statusMatrix = {},
}) {
    const [activeTab, setActiveTab] = useState("Luas Serangan");
    const [desa, setDesa] = useState("Semua Desa");
    const [opt, setOpt] = useState("Wereng Batang Coklat (WBC)");
    const [periode, setPeriode] = useState("2024/2025");

    return (
        <>
            <Head title="Selamat datang" />

        <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
            {/* Top Navigation Bar */}
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="pt-28 pb-16 px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-bold shadow-sm border border-primary-100">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                        </span>
                        Platform Deteksi Dini Aktif
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Peta Status Endemis & Prediksi <span className="text-primary-600 block sm:inline">Serangan OPT</span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                        Pantau status endemis secara real-time dan lindungi lahan pertanian dari penyebaran organisme pengganggu tumbuhan melalui pengambilan keputusan berbasis data geografis.
                    </p>
                </div>

                <StatusEndemisMapLanding
                    allKecamatan={allKecamatan}
                    allOPT={allOPT}
                    musimList={musimList}
                    statusMatrix={statusMatrix}
                />
            </main>
        </div>
        </>
    );
}
