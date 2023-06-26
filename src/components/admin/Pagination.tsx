import React from "react";

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const maxButtons = 4;
  const ellipsis = "...";

  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(startPage + maxButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageNumbers: (number | string)[] = [];

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push(ellipsis);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push(ellipsis);
    }
    pageNumbers.push(totalPages);
  }

  const handlePageChange = (pageNumber: number | string) => {
    if (typeof pageNumber === "number") {
      onPageChange(pageNumber);
    }
  };

  return (
    <nav>
      <ul className="flex justify-center space-x-2 py-3">
        {pageNumbers.map((pageNumber, index) => (
          <li
            key={index}
            className={`rounded-lg ${
              pageNumber === currentPage
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700"
            }`}
          >
            <button
              className="px-4 py-2 focus:outline-none"
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
