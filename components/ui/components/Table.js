import styles from "../../../styles/ui/components/Table.module.css";
import { useState, useMemo } from "react";

function Table({
    columns = [],
    data = [],
    pagination = false,
    pageSizeOptions = [5, 10, 25],
    defaultPageSize = 5,
    filterable = false,
    globalFilterable = false,
    striped = false,
}) {
    const [filters, setFilters] = useState(() => {
        if (!filterable) return {};
        const initFilters = {};
        columns.forEach((col) => {
        const key = typeof col === 'object' && col.key ? col.key : col;
        initFilters[key] = '';
        });
        return initFilters;
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    // Filtrage des données selon inputs et recherche globale
    const filteredData = useMemo(() => {
        let filtered = data;

        if (filterable) {
            filtered = filtered.filter((row) =>
                columns.every((col) => {
                const key = typeof col === 'object' && col.key ? col.key : col;
                const filterValue = filters[key]?.toLowerCase() || '';
                if (!filterValue) return true;
                const cell = String(row[key] || '').toLowerCase();
                return cell.includes(filterValue);
                })
            );
        }

        if (globalFilterable && globalFilter.trim() !== '') {
        const gf = globalFilter.toLowerCase();
        filtered = filtered.filter((row) =>
            columns.some((col) => {
            const key = typeof col === 'object' && col.key ? col.key : col;
            const cell = String(row[key] || '').toLowerCase();
            return cell.includes(gf);
            })
        );
        }

        return filtered;
    }, [data, filters, columns, filterable, globalFilter, globalFilterable]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const currentPageData = pagination
        ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : filteredData;

    // Gestion des filtres
    const onFilterChange = (key, value) => {
        setFilters((prev) => ({
        ...prev,
        [key]: value,
        }));
        setCurrentPage(1);
    };

    return (
        <div className={styles.tableWrapper}>
            {globalFilterable && (
                <div className={styles.globalFilterWrapper}>
                <input
                    type="text"
                    placeholder="Recherche globale..."
                    value={globalFilter}
                    onChange={(e) => {
                    setGlobalFilter(e.target.value);
                    setCurrentPage(1);
                    }}
                    className={styles.globalFilterInput}
                />
                </div>
            )}

            <table className={styles.table}>
                <thead className={styles.thead}>
                <tr>
                    {columns.map((col) => (
                    <th key={col.key || col}>
                        {col.header || col}
                        {filterable && (
                        <input
                            className={styles.filterInput}
                            type="text"
                            placeholder={`Filtrer...`}
                            value={
                            filters[col.key || col] === undefined ? '' : filters[col.key || col]
                            }
                            onChange={(e) => onFilterChange(col.key || col, e.target.value)}
                        />
                        )}
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody className={styles.tbody}>
                {currentPageData.length === 0 ? (
                    <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '1rem' }}>
                        Aucun résultat trouvé.
                    </td>
                    </tr>
                ) : (
                    currentPageData.map((row, i) => (
                    <tr key={i}>
                        {columns.map((col) => {
                        const key = typeof col === 'object' && col.key ? col.key : col;
                        return <td key={key}>{row[key]}</td>;
                        })}
                    </tr>
                    ))
                )}
                </tbody>
            </table>

            {pagination && totalPages > 0 && (
                <div className={styles.pagination}>
                <button
                    className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                >
                    « First
                </button>
                <button
                    className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    ‹ Prev
                </button>

                <span className={styles.pageInfo}>
                    Page {currentPage} sur {totalPages}
                </span>

                <button
                    className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next ›
                </button>
                <button
                    className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Last »
                </button>

                <select
                    value={pageSize}
                    onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                    }}
                >
                    {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                        {size} / page
                    </option>
                    ))}
                </select>
                </div>
            )}
        </div>
    );
}

export default Table;