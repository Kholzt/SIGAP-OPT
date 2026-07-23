import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

const BULAN_OPTIONS = [
    { value: 1,  label: 'Januari'   },
    { value: 2,  label: 'Februari'  },
    { value: 3,  label: 'Maret'     },
    { value: 4,  label: 'April'     },
    { value: 5,  label: 'Mei'       },
    { value: 6,  label: 'Juni'      },
    { value: 7,  label: 'Juli'      },
    { value: 8,  label: 'Agustus'   },
    { value: 9,  label: 'September' },
    { value: 10, label: 'Oktober'   },
    { value: 11, label: 'November'  },
    { value: 12, label: 'Desember'  },
];

const EMPTY_FORM = {
    bulan:           '',
    tahun:           '',
    kecamatan_id:    '',
    opt_id:          '',
    jumlah_serangan: '',
    musim_tanaman:   '',
    luas_puso:       '',
};

export function useDataSerangan(filters = {}) {
    const [modalType, setModalType]   = useState(null); // 'create' | 'edit' | 'delete' | 'import'
    const [selected,  setSelected]    = useState(null);

    // Filter state — initialized from server filters
    const [selectedKecamatan, setSelectedKecamatan] = useState(filters.kecamatanId || '');
    const [selectedOPT,       setSelectedOPT]       = useState(filters.optId       || '');
    const [searchValue,       setSearchValue]       = useState(filters.search      || '');

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(EMPTY_FORM);

    // ---- Modal helpers ----
    const openCreate = () => {
        clearErrors();
        reset();
        setModalType('create');
    };

    const openEdit = (row) => {
        clearErrors();
        setData({
            bulan:           row.bulan,
            tahun:           row.tahun,
            kecamatan_id:    row.kecamatan_id,
            opt_id:          row.opt_id,
            jumlah_serangan: row.jumlah_serangan,
            musim_tanaman:   row.musim_tanaman,
            luas_puso:       row.luas_puso,
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
    const handleStore = (e) => {
        e.preventDefault();
        post(route('data-serangan.store'), { onSuccess: closeModal });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
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
                search:       searchValue     || undefined,
                kecamatan_id: selectedKecamatan || undefined,
                opt_id:       selectedOPT       || undefined,
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
        selectedKecamatan, setSelectedKecamatan,
        selectedOPT, setSelectedOPT,
        searchValue, setSearchValue,
        handleFilter, handleResetFilter,
        // constants
        BULAN_OPTIONS,
    };
}
