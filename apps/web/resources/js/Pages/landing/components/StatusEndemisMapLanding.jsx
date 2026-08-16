import FilterWilayahCard from "@/Pages/status-endemis/components/FilterWilayahCard";
import LegendaStatusCard from "@/Pages/status-endemis/components/LegendaStatusCard";
import { useState } from "react";
import StatusEndemisMap from "@/components/StatusEndemisMap";
export default function StatusEndemisMapLanding({
    allKecamatan = [],
    allOPT = [],
    musimList = [],
    statusMatrix = {},
}) {
    const [selectedKecamatan, setSelectedKecamatan] = useState("");
    const [selectedOPTId, setSelectedOPTId] = useState(
        allOPT.length > 0 ? allOPT[0].id : "",
    );
    const [selectedMusim, setSelectedMusim] = useState(
        musimList.length > 0 ? musimList[0] : "2024/2025",
    );

    const selectedOPT =
        allOPT.find((o) => String(o.id) === String(selectedOPTId)) || allOPT[0];

    return (
        <div className="relative h-[540px] md:h-[580px] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-900 z-10">
            <StatusEndemisMap
                allKecamatan={allKecamatan}
                selectedKecamatanId={selectedKecamatan}
                selectedOPTId={selectedOPTId}
                statusMatrix={statusMatrix}
            />

            <FilterWilayahCard
                allKecamatan={allKecamatan}
                allOPT={allOPT}
                musimList={musimList}
                selectedKecamatan={selectedKecamatan}
                setSelectedKecamatan={setSelectedKecamatan}
                selectedOPTId={selectedOPTId}
                setSelectedOPTId={setSelectedOPTId}
                selectedMusim={selectedMusim}
                setSelectedMusim={setSelectedMusim}
            />

            <LegendaStatusCard
                selectedOPTName={
                    selectedOPT ? selectedOPT.nama_opt : "Wereng Batang Coklat"
                }
            />
        </div>
    );
}
