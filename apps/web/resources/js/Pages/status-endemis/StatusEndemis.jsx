import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";
import StatusEndemisMap from "../../components/StatusEndemisMap";
import FilterWilayahCard from "./components/FilterWilayahCard";
import LegendaStatusCard from "./components/LegendaStatusCard";
import StatusEndemisTable from "./components/StatusEndemisTable";
import UseStatusEndemis from "@/hooks/useStatusEndemis";

export default function StatusEndemis({
    allKecamatan = [],
    allOPT = [],
    musimList = [],
    statusMatrix = {},
    filters
}) {
    const defaultOpt = filters?.selectedOpt ?? (allOPT.length > 0 ? allOPT[0].id : null);
    const se = UseStatusEndemis({ ...(filters || {}), selectedOpt: defaultOpt });
    return (
        <AdminLayout currentTab="Status Endemis">
            <Head title="Status Endemis" />

            <div className="space-y-8">
                {/* GIS Interactive Satellite Map Container */}
                <div className="relative h-[540px] md:h-[580px] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-900 z-10">
                    <StatusEndemisMap
                        allKecamatan={allKecamatan}
                        selectedKecamatanId={se.selectedKecamatan}
                        selectedOPTId={se.selectedOpt}
                        statusMatrix={statusMatrix}
                    />

                    <FilterWilayahCard
                        allKecamatan={allKecamatan}
                        allOPT={allOPT}
                        musimList={musimList}
                        selectedKecamatan={se.selectedKecamatan}
                        setSelectedKecamatan={se.setSelectedKecamatan}
                        selectedOPTId={se.selectedOpt}
                        setSelectedOPTId={se.setSelectedOpt}
                        selectedMusim={se.selectedMusimTanaman}
                        setSelectedMusim={se.setSelectedMusimTanaman}
                    />

                    <LegendaStatusCard
                        selectedOPTName={
                            allOPT.find(o => String(o.id) === String(se.selectedOpt))?.nama_opt || "Data OPT"
                        }
                    />
                </div>

                {/* Bottom Section - Klasifikasi Status Desa Table */}
                <StatusEndemisTable
                    allKecamatan={allKecamatan}
                    allOPT={allOPT}
                    selectedKecamatan={se.selectedKecamatan}
                    selectedMusim={se.selectedMusimTanaman}
                    statusMatrix={statusMatrix}
                />
            </div>
        </AdminLayout>
    );
}
