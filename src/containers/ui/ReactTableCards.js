import React, { useCallback, useState } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { Separator } from "components/common/CustomBootstrap";
import { useTable, usePagination, useSortBy } from "react-table";
import classnames from "classnames";
import DatatablePagination from "components/DatatablePagination";

function Table({ columns, data, divided = false, defaultPageSize = 4 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ "table-divided": divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`${
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sorted-desc"
                        : "sorted-asc"
                      : ""
                  } text-center`}
                >
                  {column.render("Header")}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            console.log(row.getRowProps());
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

export const ReactTableWithPaginationCard = ({
  title,
  cols,
  data,
  children,
  message,
}) => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <span>{title}</span>
        </CardTitle>
        {children}
        {data.length > 0 ? (
          <Table columns={cols} data={data} rowIsLink />
        ) : (
          <p>{message}</p>
        )}
      </CardBody>
    </Card>
  );
};

export const ReactTableDivided = ({
  cols,
  data,
  title,
  addName,
  searchPlaceHolder,
  searchButtonName,
}) => {
  return (
    <>
      <div className="mb-4 bg-white p-5 w-85">
        <div>
          <div className="d-flex justify-content-between mb-5">
            <CardTitle className="h1">{title}</CardTitle>
            <Button color="primary" size="lg" className="top-right-button mr-1">
              {addName}
            </Button>
          </div>
          <div className="d-flex align-items-center mb-5">
            <div className="search-sm d-inline-block float-md-left mr-3 align-top">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder={searchPlaceHolder}
              />
            </div>
            <Button color="primary" size="sm" className="top-right-button mr-1">
              {searchButtonName}
            </Button>
          </div>
        </div>
        <Separator className="mb-5" />
        <Table columns={cols} data={data} divided />
      </div>
    </>
  );
};
