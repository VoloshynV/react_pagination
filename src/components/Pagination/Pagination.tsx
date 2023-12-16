import { MouseEvent } from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage = 1, onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const handlePageClick = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    id: number,
  ) => {
    e.preventDefault();

    onPageChange(id);
  };

  const handleNextPage = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,

  ) => {
    e.preventDefault();

    if (isLastPage) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  const handlePrevPage = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();

    if (isFirstPage) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {new Array(totalPages).fill(null).map((_, idx) => {
        const id = idx + 1;

        return (
          <li
            key={id}
            className={cn('page-item', { active: id === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${id}`}
              onClick={(e) => handlePageClick(e, id)}
            >
              {id}

            </a>
          </li>
        );
      })}
      <li className={cn('page-item', {
        disabled: isLastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
