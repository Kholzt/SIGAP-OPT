import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

const BULAN_OPTIONS = [
    { value: 1, label: 'Januari' },
    { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Mei' },
    { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' },
    { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' },
    { value: 12, label: 'Desember' },
];

const EMPTY_FORM = {
    bulan: '',
    tahun: '',
    kecamatan_id: '',
    opt_id: '',
    jumlah_serangan: '',
    musim_tanaman: '',
    luas_puso: '',
};

export function useDataSerangan(filters = {}) {
    const [modalType, setModalType] = useState(null); // 'create' | 'edit' | 'delete' | 'import'
    const [selected, setSelected] = useState(null);

    // Filter state — initialized from server filters
    const [selectedKecamatan, setSelectedKecamatan] = useState(filters.kecamatanId || '');
    const [selectedOPT, setSelectedOPT] = useState(filters.optId || '');
    const [selectedMusim, setSelectedMusim] = useState(filters.musim || '');
    const [searchValue, setSearchValue] = useState(filters.search || '');

    const { data, setData, post, put, processing, errors, reset, clearErrors, transform } = useForm(EMPTY_FORM);

    // ---- Modal helpers ----
    const openCreate = () => {
        clearErrors();
        reset();
        setModalType('create');
    };

    const openEdit = (row) => {
        clearErrors();

        let musimValue = row.musim_tanaman;
        if (musimValue) {
            if (musimValue.includes('/')) musimValue = 'MP';
            else musimValue = 'MK';
        }

        setData({
            bulan: row.bulan,
            tahun: row.tahun,
            kecamatan_id: row.kecamatan_id,
            opt_id: row.opt_id,
            jumlah_serangan: row.jumlah_serangan,
            musim_tanaman: musimValue,
            luas_puso: row.luas_puso,
        });
        setSelected(row);
        setModalType('edit');
    };

    const openDelete = (row) => {
        setSelected(row);
        setModalType('delete');
    };

    const openImport = () => setModalType('import');

    const closeModal = () => {
        setModalType(null);
        setSelected(null);
        clearErrors();
        reset();
    };

    // ---- CRUD handlers ----
    const formatMusim = (formData) => {
        if (!formData.tahun || !formData.musim_tanaman) return formData.musim_tanaman;

        if (formData.musim_tanaman === 'MP') {
            const year = parseInt(formData.tahun);
            return `${year.toString().slice(-2)}/${(year + 1).toString().slice(-2)}`;
        } else if (formData.musim_tanaman === 'MK') {
            return formData.tahun.toString();
        }
        return formData.musim_tanaman;
    };

    const handleStore = (e) => {
        e.preventDefault();
        transform((d) => ({ ...d, musim_tanaman: formatMusim(d) }));
        post(route('data-serangan.store'), { onSuccess: closeModal });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        transform((d) => ({ ...d, musim_tanaman: formatMusim(d) }));
        put(route('data-serangan.update', selected.id), { onSuccess: closeModal });
    };

    const handleDestroy = () => {
        router.delete(route('data-serangan.destroy', selected.id), { onSuccess: closeModal });
    };

    // ---- Filter handlers ----
    const handleFilter = () => {
        router.get(
            route('data-serangan'),
            {
                search: searchValue || undefined,
                kecamatan_id: selectedKecamatan || undefined,
                opt_id: selectedOPT || undefined,
                musim: selectedMusim || undefined,
            },
            { preserveState: true }
        );
    };

    const handleResetFilter = () => {
        setSelectedKecamatan('');
        setSelectedOPT('');
        setSearchValue('');
        router.get(route('data-serangan'), {}, { preserveState: true });
    };

    return {
        // form
        data, setData, processing, errors,
        // modal
        modalType, selected, closeModal,
        openCreate, openEdit, openDelete, openImport,
        handleStore, handleUpdate, handleDestroy,
        // filter
        selectedMusim, setSelectedMusim,
        selectedKecamatan, setSelectedKecamatan,
        selectedOPT, setSelectedOPT,
        searchValue, setSearchValue,
        handleFilter, handleResetFilter,
        // constants
        BULAN_OPTIONS,
    };
}
