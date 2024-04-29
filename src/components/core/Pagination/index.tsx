import React from "react";
import { usePaginationStore } from "../../../store/paginationStore";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const { page, setPage } = usePaginationStore();

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(renderPageButton(i));
      }
    } else {
      if (page <= 5) {
        for (let i = 1; i <= 10; i++) {
          pageButtons.push(renderPageButton(i));
        }
        pageButtons.push(renderDots());
      } else if (page >= totalPages - 4) {
        pageButtons.push(renderDots());
        for (let i = totalPages - 9; i <= totalPages; i++) {
          pageButtons.push(renderPageButton(i));
        }
      } else {
        pageButtons.push(renderDots());
        for (let i = page - 4; i <= page + 5; i++) {
          pageButtons.push(renderPageButton(i));
        }
        pageButtons.push(renderDots());
      }
    }

    return pageButtons;
  };

  const renderPageButton = (pageNumber: number) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`${styles.button} ${
          pageNumber === page ? styles.active : ""
        }`}>
        {pageNumber}
      </button>
    );
  };

  const renderDots = () => {
    return <span key="dots">...</span>;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className={`${styles.button} ${styles.prevButton}`}>
        Previous
      </button>
      {renderPageButtons()}
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className={`${styles.button} ${styles.nextButton}`}>
        Next
      </button>
    </div>
  );
};
