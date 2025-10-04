import React, { useState } from "react";
import type { CardProps } from "../Card/types";
import Card from "../Card";
import Pagination from "../Pagination";
import styles from "./CatalogBlock.module.scss";

interface CatalogBlockProps {
  cards: CardProps[];
  maxColumnCount: number;
  itemsPerPage?: number;
}

const CatalogBlock: React.FC<CatalogBlockProps> = ({
  cards,
  itemsPerPage = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.catalogBlock}>
      <div className={styles.grid}>
        {currentCards.map((card, index) => (
          <Card key={startIndex + index} {...card} />
        ))}
      </div>
      <p>avaegaeggeeg</p>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxVisiblePages={3}
      />
    </div>
  );
};

export default CatalogBlock;
