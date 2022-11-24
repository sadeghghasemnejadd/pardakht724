import useState from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useTable, usePagination, useSortBy } from "react-table";
import classnames from "classnames";
import DatatablePagination from "components/DatatablePagination";
import products from "data/products";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSortData } from "redux/users/actions";
import { client } from "services/client";
import { toast } from "react-toastify";

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
    headers,
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

  const handleShowDetail = (id) => {
    history.push(`/users/${id}`);
  };

  const handleSetEmployee = (e, id) => {
    client
      .post(
        "/users/set-employee",
        { user_id: id, set_employee: true },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status_code === 200) {
          toast.success("success");
        }
      })
      .catch((error) => {
        toast.error("error");
      });
  };
  return (
    <>
      <table {...getTableProps()} className={`table`}>
        <thead>
          <tr>
            {headers.map((col) => (
              <th scope="col" key={col.id}>
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
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
      <CardTitle>Divided Table</CardTitle>
      <Table columns={cols} data={products} divided />
    </div>
  );
};

// function TH({ headerProps, classes, column, children }) {
//   const dispatch = useDispatch();
//   const [sort, setSort] = useState(false);
//   const { id, isSort } = column;

//   const handleSort = () => {
//     if (!isSort) return;
//     setSort(!sort);
//     dispatch(updateSortData({ [id]: !sort ? 1 : 0 }));
//   };

//   return (
//     <th {...headerProps} onClick={handleSort} className={classes}>
//       {children}
//       {isSort && (
//         <span
//           className={`pl-3 ${
//             sort ? "simple-icon-arrow-up" : "simple-icon-arrow-down"
//           }`}
//         />
//       )}
//     </th>
//   );
// }

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
