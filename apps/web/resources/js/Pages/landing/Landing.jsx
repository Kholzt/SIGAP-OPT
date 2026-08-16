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

            <div className="h-screen w-screen flex flex-col overflow-hidden font-sans bg-slate-900 text-slate-800">
                {/* Top Navigation Bar */}
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />
                <StatusEndemisMapLanding
                    allKecamatan={allKecamatan}
                    allOPT={allOPT}
                    musimList={musimList}
                    statusMatrix={statusMatrix}
                />
            </div>
        </>
    );
}
