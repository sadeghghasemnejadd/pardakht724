import React, { useState } from "react";
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
} from "reactstrap";
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
  collapseAddOnText,
  isEdit,
  collapseText,
  onChangeData,
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
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr
                  {...row.getRowProps()}
                  style={{ height: "auto", position: "relative" }}
                >
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
                {collapse?.state && collapse?.id == row.id && (
                  <tr>
                    <td colSpan={4}>
                      <InputGroup className="w-100">
                        <InputGroupAddon addonType="prepend">
                          {collapseAddOnText}
                        </InputGroupAddon>
                        <Input
                          type="textarea"
                          name="text"
                          rows="5"
                          value={collapseText}
                          disabled={!isEdit?.state}
                          onChange={(e) =>
                            onChangeData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </InputGroup>
                    </td>
                  </tr>
                )}
              </>
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
  title,
  addName,
  search,
  searchRef,
  onSearch,
  onAdd,
  pageSize = 4,
  isCollapse,
  collapseAddOnText,
  isEdit,
  collapseText,
  onChangeData,
}) => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  return (
    <>
      <div className="mb-4 bg-white p-5 ">
        <div>
          <div className="d-flex justify-content-between mb-5">
            <CardTitle className="h1">{title}</CardTitle>
            <Button
              color="primary"
              size="lg"
              className="top-right-button mr-1"
              onClick={onAdd.bind(null)}
            >
              {addName}
            </Button>
          </div>
          <div className="d-flex align-items-center mb-5">
            <form
              onSubmit={(e) => onSearch(e, selectedRadio)}
              className="d-flex align-items-center"
            >
              <div className="search-sm d-inline-block float-md-left mr-3 align-top">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="سرچ"
                  ref={searchRef}
                />
              </div>
              <ButtonGroup>
                {search.map((s) => (
                  <Button
                    key={s.id}
                    color="primary"
                    onClick={() => setSelectedRadio(s.id)}
                    active={selectedRadio === s.id}
                  >
                    {s.name}
                  </Button>
                ))}
              </ButtonGroup>
            </form>
          </div>
        </div>
        <Separator className="mb-5" />

        <Table
          columns={cols}
          data={data}
          divided
          defaultPageSize={pageSize}
          collapse={isCollapse}
          collapseAddOnText={collapseAddOnText}
          isEdit={isEdit}
          collapseText={collapseText}
          onChangeData={onChangeData}
        />
      </div>
    </>
  );
};
