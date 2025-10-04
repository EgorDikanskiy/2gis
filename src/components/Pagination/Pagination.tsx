import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 3;
    
    // Логика для отображения страниц
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Кнопка "Предыдущая" - всегда видна
    pages.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${styles.paginationButton} ${currentPage <= 1 ? styles.disabled : ''}`}
      >
        ←
      </button>
    );
    
    // Кнопка "Первая страница"
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={styles.paginationButton}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className={styles.ellipsis}>...</span>);
      }
    }
    
    // Страницы
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.paginationButton} ${i === currentPage ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }
    
    // Кнопка "Последняя страница"
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className={styles.ellipsis}>...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={styles.paginationButton}
        >
          {totalPages}
        </button>
      );
    }
    
    // Кнопка "Следующая" - всегда видна
    pages.push(
      <button
        key="next"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${styles.paginationButton} ${currentPage >= totalPages ? styles.disabled : ''}`}
      >
        →
      </button>
    );
    
    return pages;
  };

  return (
    <div className={styles.pagination}>
      {renderPagination()}
    </div>
  );
};

export default Pagination;
