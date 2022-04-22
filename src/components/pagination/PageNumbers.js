import React from "react";
import classNames from "classnames";
import Pagination from "./Pagination";

const PageNumbers = ({ pageNumbers, pagination, setPagination }) =>
  pageNumbers.map(n => <span
      key={n}
      className={classNames({ active: n === pagination.currentPage })}
      id={n}
      onClick={(e) =>
        setPagination({
          ...pagination,
          currentPage: Number(e.target.id)
        })
      }
    >
      {n}
    </span>
  );

export default Pagination(PageNumbers);
