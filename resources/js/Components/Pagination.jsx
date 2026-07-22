import React from 'react';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ meta, links, onPageChange }) {

    if (!meta || meta.last_page <= 1) return null;

    const { current_page, last_page, from, to, total } = meta;

    // Build smart page range (max 5 pages shown)
    let start = Math.max(1, current_page - 2);
    let end = Math.min(last_page, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    const goToPageUrl = (url) => {
        if (!url) return;
        if (onPageChange) {
            onPageChange(url);
        } else {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    const goToPageNum = (page) => {
        // Construct basic inertia URL. Usually better handled by parent if there are complex query params.
        if (onPageChange) {
            onPageChange(page, true);
        }
    };



    return (
        <div className="p-4 bg-slate-50/60 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
            <span>
                {total > 0 ? `Menampilkan ${from}-${to} dari ${total} data` : 'Tidak ada data'}
            </span>
            <div className="flex items-center gap-1.5">
                {/* Prev */}
                <button
                    onClick={() => goToPageUrl(meta.prev_page_url)}
                    disabled={!meta.prev_page_url}
                    className="p-2 border border-slate-200 rounded-lg bg-white text-slate-400 hover:text-slate-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {/* First page shortcut */}
                {pages[0] > 1 && (
                    <>
                        <button
                            onClick={() => goToPageNum(1)}
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center font-bold transition"
                        >1</button>
                        {pages[0] > 2 && <span className="px-1 text-slate-400">...</span>}
                    </>
                )}

                {/* Page numbers */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPageNum(page)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition ${page === current_page
                            ? 'bg-[#006654] text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Last page shortcut */}
                {pages[pages.length - 1] < last_page && (
                    <>
                        {pages[pages.length - 1] < last_page - 1 && <span className="px-1 text-slate-400">...</span>}
                        <button
                            onClick={() => goToPageNum(last_page)}
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center font-bold transition"
                        >{last_page}</button>
                    </>
                )}

                {/* Next */}
                <button
                    onClick={() => goToPageUrl(meta.next_page_url)}
                    disabled={!meta.next_page_url}
                    className="p-2 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
