import { useState } from "react";

export default function UseStatusEndemis(filters) {
    const [selectedKecamatan, setSelectedKecamatan] = useState(filters?.selectedKecamatan ?? null);
    const [selectedOpt, setSelectedOpt] = useState(filters?.selectedOpt ?? null);
    const [selectedMusimTanaman, setSelectedMusimTanaman] = useState(filters?.selectedMusimTanaman ?? null);

    const handleFilter = () => {
        router.get(route('status-endemis'), {
            selectedKecamatan: selectedKecamatan,
            selectedOpt: selectedOpt,
            selectedMusimTanaman: selectedMusimTanaman
        }, { preserveState: true });
    }

    const handleResetFilter = () => {
        router.get(route('status-endemis'), {}, { preserveState: true });
    }
    return {
        selectedKecamatan,
        setSelectedKecamatan,
        selectedOpt,
        setSelectedOpt,
        selectedMusimTanaman,
        setSelectedMusimTanaman,
        handleFilter
    };
}