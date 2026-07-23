import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useSearch } from '@/hooks/useSearch';
import { MapPin, Plus, Check } from 'lucide-react';

import KecamatanTable from './components/KecamatanTable';
import KecamatanForm from './components/KecamatanForm';
import KecamatanDeleteModal from './components/KecamatanDeleteModal';

export default function Index({ kecamatans, search: initialSearch, flash }) {
    const [modalType, setModalType] = useState(null);
    const [selected, setSelected] = useState(null);

    const { searchValue, handleSearch } = useSearch('kecamatan.index', initialSearch);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nama_kecamatan: '',
    });

    // ---- Modal helpers ----
    const openCreate = () => { clearErrors(); reset(); setSelected(null); setModalType('create'); };
    const openEdit   = (kec) => { clearErrors(); setData('nama_kecamatan', kec.nama_kecamatan); setSelected(kec); setModalType('edit'); };
    const openDelete = (kec) => { setSelected(kec); setModalType('delete'); };
    const closeModal = () => { setModalType(null); setSelected(null); clearErrors(); reset(); };

    const handleStore   = (e) => { e.preventDefault(); post(route('kecamatan.store'), { onSuccess: closeModal }); };
    const handleUpdate  = (e) => { e.preventDefault(); put(route('kecamatan.update', selected.id), { onSuccess: closeModal }); };
    const handleDestroy = ()  => { router.delete(route('kecamatan.destroy', selected.id), { onSuccess: closeModal }); };

    return (
        <AdminLayout currentTab="Data Kecamatan">
            <Head title="Master Data Kecamatan" />

            {flash?.success && (
                <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-xl">
                    <Check className="w-4 h-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-emerald-500" />
                        Master Data Kecamatan
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Kelola daftar wilayah kecamatan yang terdaftar dalam sistem.</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm">
                    <Plus className="w-4 h-4" />
                    Tambah Kecamatan
                </button>
            </div>

            <KecamatanTable
                rows={kecamatans.data}
                paginator={kecamatans}
                searchValue={searchValue}
                onSearch={handleSearch}
                onEdit={openEdit}
                onDelete={openDelete}
            />

            <KecamatanForm
                modalType={modalType}
                data={data}
                errors={errors}
                processing={processing}
                onChange={setData}
                onSubmit={modalType === 'create' ? handleStore : handleUpdate}
                onClose={closeModal}
            />

            <KecamatanDeleteModal
                selected={modalType === 'delete' ? selected : null}
                onConfirm={handleDestroy}
                onClose={closeModal}
            />
        </AdminLayout>
    );
}
