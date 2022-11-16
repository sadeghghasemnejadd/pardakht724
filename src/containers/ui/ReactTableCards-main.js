/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useTable, usePagination, useSortBy } from "react-table";
import classnames from "classnames";

import IntlMessages from "helpers/IntlMessages";
import DatatablePagination from "components/DatatablePagination";

import products from "data/products";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSortData } from "redux/users/actions";

function Table({
  columns,
  data,
  divided = false,
  defaultPageSize = 10,
  rowIsLink,
}) {
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

  const history = useHistory();
  const handleClick = (row) => {
    if (rowIsLink && row.original.id) {
      history.push(`/users/${row.original.id}`);
    }
  };

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ "table-divided": divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => {
                return (
                  <>
                    {/* <th
                      key={`th_${columnIndex}`}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      onClick={handleSort}
                      className={` text-right
                  ${
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sorted-desc"
                        : "sorted-asc"
                      : ""
                  }
                  `}
                    >
                      {column.render("Header")}
                      <span />
                      <span
                        className={`pl-3 simple-icon-arrow-up custom-transition ${
                          sort ? "custom-rotate-180" : ""
                        }`}
                      />
                    </th> */}
                    <TH
                      key={`th_${columnIndex}`}
                      column={column}
                      headerProps={column.getHeaderProps(
                        column.getSortByToggleProps()
                      )}
                      classes={` text-right
                  ${
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sorted-desc"
                        : "sorted-asc"
                      : ""
                  }
                  `}
                    >
                      {column.render("Header")}
                      <span />
                    </TH>
                  </>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr onClick={() => handleClick(row)} {...row.getRowProps()}>
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
  rowIsLink,
  children,
  message,
}) => {
  // const cols = React.useMemo(
  //   () => [
  //     {
  //       Header: "Name",
  //       accessor: "title",
  //       cellClass: "list-item-heading w-15",
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //     {
  //       Header: "Sales",
  //       accessor: "sales",
  //       cellClass: "text-muted w-10",
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //     {
  //       Header: "Stock",
  //       accessor: "stock",
  //       cellClass: "text-muted w-10",
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //     {
  //       Header: "Category",
  //       accessor: "category",
  //       cellClass: "text-muted w-10",
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //     {
  //       Header: "Test",
  //       accessor: "test",
  //       cellClass: "text-muted w-20",
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //     {
  //       Header: "Description",
  //       accessor: "description",
  //       cellClass: "text-muted w-30",
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //   ],
  //   []
  // );

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          {/* <IntlMessages id={title} /> */}
          <span>{title}</span>
        </CardTitle>
        {/* <Table columns={cols} data={products} /> */}
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

export const ReactTableDivided = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
        cellClass: "list-item-heading w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Sales",
        accessor: "sales",
        cellClass: "text-muted  w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Stock",
        accessor: "stock",
        cellClass: "text-muted  w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Category",
        accessor: "category",
        cellClass: "text-muted  w-40",
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <CardTitle>
        <IntlMessages id="table.divided" />
      </CardTitle>
      <Table columns={cols} data={products} divided />
    </div>
  );
};

function TH({ headerProps, classes, column, children }) {
  const dispatch = useDispatch();
  const [sort, setSort] = useState(false);
  const { id, isSort } = column;
  
  const handleSort = () => {
    if (!isSort) return;
    setSort(!sort);
    dispatch(updateSortData({ [id]: !sort ? 1 : 0 }));
  };

  return (
    <th {...headerProps} onClick={handleSort} className={classes}>
      {children}
      {isSort && (
        <span
          className={`pl-3 ${
            sort ? "simple-icon-arrow-up" : "simple-icon-arrow-down"
          }`}
        />
      )}
    </th>
  );
}
