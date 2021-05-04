import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';

type PropTypes = {
  currentPage: number;
  totalItemsCount: number;
  pageSize: number;
  onPageChanged: (page: number) => void;
  portionSize?: number;
};

let Paginator: React.FC<PropTypes> = ({ currentPage, totalItemsCount, pageSize, onPageChanged, portionSize = 10 }) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  return (
    <div className={styles.pagination_buttons}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter((page) => {
          return page >= leftPortionPageNumber && page <= rightPortionPageNumber;
        })
        .map((page, index) => (
          <span
            className={cn(
              {
                [styles.selected_page]: currentPage === page,
              },
              styles.page_number
            )}
            key={index}
            onClick={() => {
              onPageChanged(page);
            }}
          >
            {page}
          </span>
        ))}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
