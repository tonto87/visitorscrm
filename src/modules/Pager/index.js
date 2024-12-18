import React, { useCallback, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSearchParams } from "react-router-dom";

const Pager = ({ currentPage, hasNext, totalPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPageNumber = parseInt(currentPage, 10);
  const totalPages = parseInt(totalPage, 10);

  useEffect(() => {
    if (currentPage) {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("page", currentPage.toString());
      setSearchParams(updatedParams);
    }
  }, [currentPage, setSearchParams, searchParams]);

  const handlePageChange = useCallback(
    (page) => {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("page", page.toString());
      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    const page = queryParams.get("page");

    if (page) {
      const pageNumber = parseInt(page, 10);
      if (pageNumber !== currentPageNumber) {
        handlePageChange(pageNumber);
      }
    }
  }, [searchParams, currentPageNumber, handlePageChange]);

  const handleNext = () => {
    if (hasNext) {
      handlePageChange(currentPageNumber + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPageNumber > 1) {
      handlePageChange(currentPageNumber - 1);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    if (currentPageNumber > 3) {
      items.push(
        <Pagination.Item
          key={1}
          active={currentPageNumber === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>,
      );

      if (currentPageNumber > 4) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    const startPage = Math.max(1, currentPageNumber - 2);
    const endPage = Math.min(totalPages, currentPageNumber + 2);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPageNumber}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>,
      );
    }

    if (currentPageNumber < totalPages - 3) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    if (currentPageNumber < totalPages - 2) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPageNumber === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>,
      );
    }

    return items;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={handlePrevious}
        disabled={currentPageNumber <= 1}
      />
      {renderPaginationItems()}
      <Pagination.Next onClick={handleNext} disabled={!hasNext} />
    </Pagination>
  );
};

export default Pager;
