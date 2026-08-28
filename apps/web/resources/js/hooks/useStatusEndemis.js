import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";

export default function UseStatusEndemis(filters) {
    const [selectedKecamatan, setSelectedKecamatan] = useState(filters?.selectedKecamatan ?? null);
    const [selectedOpt, setSelectedOpt] = useState(filters?.selectedOpt ?? null);
    const [selectedMusimTanaman, setSelectedMusimTanaman] = useState(filters?.selectedMusimTanaman ?? null);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        
        router.get(route('status-endemis'), {
            kecamatan_id: selectedKecamatan || undefined,
            opt_id: selectedOpt || undefined,
            musim: selectedMusimTanaman || undefined
        }, { preserveState: true, replace: true });
        
    }, [selectedKecamatan, selectedOpt, selectedMusimTanaman]);

    return {
        selectedKecamatan,
        setSelectedKecamatan,
        selectedOpt,
        setSelectedOpt,
        selectedMusimTanaman,
        setSelectedMusimTanaman
    };
}