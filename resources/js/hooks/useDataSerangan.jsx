import { useState } from "react";

export function useDataSerangan() {
    const [selectedWilayah, setSelectedWilayah] = useState("Semua Wilayah");
    const [selectedOPT, setSelectedOPT] = useState("Semua Jenis");
    const [isOpen, setIsOpen] = useState(false);
    const data = [
        {
            id: 1,
            bulan: "Maret",
            tahun: 2024,
            desa: "Bataan",
            luasSerangan: "12.5",
            luasPuso: "0",
            luasPenanganan: "10.2",
            jenisOPT: "Wereng Batang Coklat",
        },
        {
            id: 2,
            bulan: "Maret",
            tahun: 2024,
            desa: "Dawuhan",
            luasSerangan: "4.2",
            luasPuso: "0",
            luasPenanganan: "4.2",
            jenisOPT: "Tikus Sawah",
        },
        {
            id: 3,
            bulan: "Februari",
            tahun: 2024,
            desa: "Kademangan",
            luasSerangan: "8.7",
            luasPuso: "0",
            luasPenanganan: "5.0",
            jenisOPT: "Blast",
        },
        {
            id: 4,
            bulan: "Februari",
            tahun: 2024,
            desa: "Jurang sapi",
            luasSerangan: "15.0",
            luasPuso: "1.2",
            luasPenanganan: "12.0",
            jenisOPT: "Penggerek Batang",
        },
        {
            id: 5,
            bulan: "Januari",
            tahun: 2024,
            desa: "Wonosari",
            luasSerangan: "6.4",
            luasPuso: "0",
            luasPenanganan: "6.4",
            jenisOPT: "Tungro",
        },
    ];
    return {
        selectedWilayah,
        setSelectedWilayah,
        selectedOPT,
        setSelectedOPT,
        isOpen,
        setIsOpen,
        data,
    };
}
