import React from 'react';
import styles from './styles.module.scss';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
    console.log(currentPage, lastPage)
    const pageWindowSize = 5;
    let startPage = Math.max(currentPage - Math.floor(pageWindowSize / 2), 1);
    let endPage = Math.min(startPage + pageWindowSize - 1, lastPage);

    if (endPage - startPage < pageWindowSize - 1) {
        startPage = Math.max(endPage - pageWindowSize + 1, 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div className={styles.alignPagination}>
            <div className={styles.pagination}>
                {pages.map(page => (
                    <span
                        key={page}
                        className={`${styles.page} ${currentPage === page ? styles.active : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
