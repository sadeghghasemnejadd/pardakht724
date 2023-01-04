import React, { useState, Fragment } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  ButtonGroup,
  Table as StrapTable,
  InputGroup,
  InputGroupAddon,
  Input,
  Badge,
} from "reactstrap";
import Switch from "rc-switch";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { useTable, usePagination, useSortBy } from "react-table";
import classnames from "classnames";
import DatatablePagination from "components/DatatablePagination";
import InfiniteScroll from "react-infinite-scroll-component";

function Table({
  columns,
  data,
  divided = false,
  defaultPageSize = 4,
  collapse = false,
  collapseData,
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
  return (
    <>
      <StrapTable
        {...getTableProps()}
        className={`r-table table ${classnames({
          "table-divided": divided,
        })}`}
        responsive
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
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.id}>
                <tr
                  {...row.getRowProps()}
                  style={{
                    boxShadow:
                      collapse && collapse.some((c) => c === row.id) && "none",
                  }}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`td_${cellIndex}`}
                      {...cell.getCellProps({
                        className: cell.column.cellClass,
                      })}
                      style={{
                        borderBottom:
                          collapse &&
                          collapse.some((c) => c === row.id) &&
                          "none",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
                {collapse && collapse.some((c) => c === row.id) && (
                  <tr style={{ boxShadow: "none" }}>
                    {collapseData.map((col, index) => (
                      <td
                        colSpan={
                          col.type === "textarea"
                            ? 4
                            : col.type === "badge"
                            ? 2
                            : col.type === "threeLine" || col.type === "twoLine"
                            ? 7
                            : 1
                        }
                        key={index}
                      >
                        {col.type === "textarea" && (
                          <div className="">
                            <p className="mb-5 h-25">توضیحات:</p>
                            <p>
                              {col.value.find((v) => v.id === row.id).value}
                            </p>
                          </div>
                        )}
                        {col.type === "badge" && (
                          <div className="">
                            <h6 className="mb-5 h-25">مدل های مورد نیاز</h6>
                            <div className="d-flex">
                              {col.value
                                .find((v) => v.id == row.id)
                                .value.map((bad) => (
                                  <Badge
                                    key={bad.id}
                                    color="primary"
                                    pill
                                    className="mb-1 ml-2"
                                  >
                                    {bad.name}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        )}
                        {col.type === "type" && (
                          <div className="d-flex flex-column align-items-center text-center">
                            <p className="mb-5 h-25">نوع ارز</p>
                            <div className="text-center">
                              ارز{" "}
                              {col.value === 0
                                ? "فیات"
                                : col.value === 1
                                ? "الکترونیک"
                                : "دیجیتال"}
                            </div>
                          </div>
                        )}
                        {col.type === "absoluteVolume" && (
                          <div className="d-flex flex-column align-items-center text-center">
                            <p className="mb-5 h-25">موجودی حساب</p>
                            <div className="text-center">
                              {col.value.find((v) => v.id == row.id).value}
                            </div>
                          </div>
                        )}
                        {col.type === "realVolume" && (
                          <div className="d-flex flex-column align-items-center text-center">
                            <p className="mb-5 h-25">موجودی واقعی</p>
                            <div className="text-center">
                              {col.value.find((v) => v.id == row.id).value}
                            </div>
                          </div>
                        )}
                        {col.type === "availableVolume" && (
                          <div className="d-flex flex-column align-items-center text-center">
                            <p className="mb-5 h-25">موجودی در دسترس</p>
                            <div className="text-center">
                              {col.value.find((v) => v.id == row.id).value}
                            </div>
                          </div>
                        )}
                        {col.type === "baseCurrency" && (
                          <div className="d-flex flex-column align-items-center text-center">
                            <p style={{ height: "4.4rem" }}>ارز پایه</p>
                            <p className="text-center">
                              {col.value.find((v) => v.id == row.id).value}
                            </p>
                          </div>
                        )}
                        {col.type === "autoUpdate" && (
                          <div className="d-flex flex-column align-items-center text-center">
                            <p className="mb-5">بروزرسانی خودکار</p>
                            <div className="d-flex justify-content-center">
                              <Switch
                                className="custom-switch custom-switch-secondary custom-switch-small "
                                disabled
                                checked={
                                  col.value.find((v) => v.id == row.id) === 0
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </div>
                        )}
                        {col.type === "threeLine" && (
                          <>
                            <div className="d-flex justify-content-between mb-5">
                              <section className="d-flex flex-column  text-center">
                                <div className="mb-5 text-center min-h-60">
                                  <p className="mb-3">شناسه حساب</p>
                                  <p>
                                    {
                                      col.value.find((v) => v.id == row.id)
                                        .value.account_identifier
                                    }
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="mb-3">آدرس بازگشت1</p>
                                  <p>
                                    {
                                      col.value.find((v) => v.id == row.id)
                                        .value.call_back_url
                                    }
                                  </p>
                                </div>
                              </section>
                              <section className="d-flex flex-column text-center ">
                                <div className="text-center mb-5 min-h-60">
                                  <p className="mb-3">کد مرچنت</p>
                                  <p>
                                    {
                                      col.value.find((v) => v.id == row.id)
                                        .value.merchant_id
                                    }
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="mb-3">آدرس بازگشت2</p>
                                  <p>
                                    {
                                      col.value.find((v) => v.id == row.id)
                                        .value.call_back_url2
                                    }
                                  </p>
                                </div>
                              </section>
                              <section className="d-flex flex-column text-center">
                                <div className="text-center mb-5 min-h-60">
                                  <p className="mb-3">نوع دسترسی</p>
                                  <p>
                                    {
                                      col.value.find((v) => v.id == row.id)
                                        .value.access_type
                                    }
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="mb-3">
                                    حداکثر مبلغ قابل پرداخت بااین روش
                                  </p>
                                  <p>
                                    {
                                      col.value.find((v) => v.id == row.id)
                                        .value.max_capability
                                    }
                                  </p>
                                </div>
                              </section>
                            </div>
                            <div>
                              <p className="mb-3">توضیحات:</p>
                              <p>
                                {
                                  col.value.find((v) => v.id == row.id).value
                                    .description
                                }
                              </p>
                            </div>
                          </>
                        )}
                        {col.type === "twoLine" && (
                          <>
                            <div className="d-flex justify-content-center mb-5">
                              <section className="d-flex flex-column text-center w-50">
                                <div className="mb-5 text-center min-h-60">
                                  <p className="mb-3">اسم کلاس</p>
                                  <p>
                                    {
                                      col.value.find((v) => v.id == row.id)
                                        .value.class_name
                                    }
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="mb-3">مسیر</p>
                                  <p>
                                    {
                                      col.value.find((v) => v.id == row.id)
                                        .value.route_name
                                    }
                                  </p>
                                </div>
                              </section>
                              <div
                                className="d-flex flex-column text-center text-muted"
                                style={{ marginTop: "-2.5rem" }}
                              >
                                <div className="text-center mb-5 min-h-60">
                                  {col.value
                                    .find((v) => v.id == row.id)
                                    .value.currencies?.slice(1)
                                    .map((c) => (
                                      <p key={c.id}>{c.name}</p>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </StrapTable>

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
  pageSize = 4,
  isCollapse,
  collapseData,
}) => {
  return (
    <Table
      columns={cols}
      data={data}
      divided
      defaultPageSize={pageSize}
      collapse={isCollapse}
      collapseData={collapseData}
    />
  );
};
