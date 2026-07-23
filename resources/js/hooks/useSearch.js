import { useCallback, useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * Custom hook untuk search dengan debounce dan navigasi server-side.
 *
 * @param {string} routeName  - Nama route Inertia (misal: 'kecamatan.index')
 * @param {string} initialSearch - Nilai awal dari search (dari props)
 * @returns {{ searchValue, handleSearch }}
 */
export function useSearch(routeName, initialSearch = '') {
    const [searchValue, setSearchValue] = useState(initialSearch);
    const [timer, setTimer] = useState(null);

    const handleSearch = useCallback(
        (value) => {
            setSearchValue(value);
            if (timer) clearTimeout(timer);

            const newTimer = setTimeout(() => {
                router.get(
                    route(routeName),
                    { search: value },
                    { preserveState: true, preserveScroll: true, replace: true },
                );
            }, 400);

            setTimer(newTimer);
        },
        [timer, routeName],
    );

    return { searchValue, handleSearch };
}
