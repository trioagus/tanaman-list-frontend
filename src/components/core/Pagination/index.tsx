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

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className={`${styles.button} ${styles.prevButton}`}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`${styles.button} ${index + 1 === page ? styles.active : ""}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className={`${styles.button} ${styles.nextButton}`}
      >
        Next
      </button>
    </div>
  );
}