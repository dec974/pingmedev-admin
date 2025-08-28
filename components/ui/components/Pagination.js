import styles from "../../../styles/ui/components/Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages === 0) return null;

    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const getPageNumbers = () => {
    const delta = 2;
    const pages = [];

    // Toujours afficher la première page
    pages.push(1);

    let left = Math.max(2, currentPage - delta);
    let right = Math.min(totalPages - 1, currentPage + delta);

    if (left > 2) {
        pages.push('left-ellipsis');
    }

    for (let i = left; i <= right; i++) {
        pages.push(i);
    }

    if (right < totalPages - 1) {
        pages.push('right-ellipsis');
    }

    // Toujours afficher la dernière page si > 1
    if (totalPages > 1) pages.push(totalPages);

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <nav aria-label="Pagination Navigation" role="navigation" className={styles.pagination}>
        <button
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
            aria-label="Première page"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
        >
            «
        </button>

        <button
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
            aria-label="Page précédente"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            ‹
        </button>

        {pages.map((page, index) =>
            typeof page === 'number' ? (
            <button
                key={index}
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
            >
                {page}
            </button>
            ) : (
            <span key={index} className={styles.ellipsis}>
                &hellip;
            </span>
            )
        )}

        <button
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
            aria-label="Page suivante"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            ›
        </button>

        <button
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
            aria-label="Dernière page"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
        >
            »
        </button>
        </nav>
    );
}

export default Pagination;