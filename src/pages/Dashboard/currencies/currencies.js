import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "layout/AppLayout";
import Switch from "rc-switch";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCurrencies,
  searchCurrency,
} from "redux-toolkit/currenciesSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Colxx } from "components/common/CustomBootstrap";
export default function Currencies() {
  const [filterTypeList, setFilterTypeList] = useState([]);
  const [filterStatusList, setFilterStatusList] = useState([]);
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState();
  const [collapseData, setCollapseData] = useState([
    { type: "type", value: "" },
    { type: "absoluteVolume", value: "" },
    { type: "realVolume", value: "" },
    { type: "availableVolume", value: "" },
    { type: "baseCurrency", value: "" },
    { type: "autoUpdate", value: 0 },
  ]);
  const [isEdit, setIsEdit] = useState();
  const dispatch = useDispatch();
  const { loading, currencies } = useSelector((store) => store.currencies);
  const cols = useMemo(
    () => [
      {
        Header: "نام ارز",
        accessor: "name_with_symbol",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return (
            <>
              <p>{props.value[0]}</p>
              <p>{props.value[1]}</p>
            </>
          );
        },
        isSort: false,
      },
      {
        Header: "قیمت خرید از مشتری",
        accessor: "buy_price",
        cellClass: "text-muted text-center",
        Cell: (props) => <>{props.value}</>,
        isSort: false,
      },
      {
        Header: "قیمت فروش به مشتری",
        accessor: "sell_price",
        cellClass: "text-muted text-center",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },
      {
        Header: "میانگین نرخ خرید",
        accessor: "mean_our_buy_price",
        cellClass: "text-muted text-center",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },
      {
        Header: "میانگین نرخ فروش",
        accessor: "mean_our_sell_price",
        cellClass: "text-muted text-center",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },
      {
        Header: "وضعیت",
        accessor: "is_active",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return (
            <Switch
              className="custom-switch custom-switch-secondary custom-switch-small"
              disabled
              checked={props.value}
            />
          );
        },
        isSort: true,
      },
      {
        Header: " ",
        accessor: "collapse_data",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return (
            <>
              <div
                className="glyph h4 d-flex justify-content-center align-items-center"
                style={{ color: "#9d9d4c" }}
                onClick={() => {
                  setCollapse((prev) => ({
                    id: props.row.id,
                    state: !prev?.state,
                  }));
                  setCollapseData((prev) =>
                    prev.map((p) =>
                      p.type === "type"
                        ? { type: "type", value: props.value[0] }
                        : p.type === "absoluteVolume"
                        ? { type: "absoluteVolume", value: props.value[1] }
                        : p.type === "realVolume"
                        ? { type: "realVolume", value: props.value[2] }
                        : p.type === "availableVolume"
                        ? { type: "availableVolume", value: props.value[3] }
                        : p.type === "baseCurrency"
                        ? { type: "baseCurrency", value: props.value[4] }
                        : { type: "autoUpdate", value: props.value[5] }
                    )
                  );
                }}
              >
                <div
                  className={`glyph-icon iconsminds-arrow-${
                    collapse?.state && collapse?.id == props.row.id
                      ? "up"
                      : "down"
                  }-in-circle`}
                />
              </div>
            </>
          );
        },
        isSort: true,
      },

      {
        Header: "عملیات",
        accessor: "",
        cellClass: "text-muted text-center",
        Cell: ({ value }) => {
          return (
            <div className="d-flex">
              <div className="glyph">
                <div
                  className={`glyph-icon simple-icon-pencil
                h5`}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="glyph">
                <div
                  className={`glyph-icon iconsminds-synchronize-2

                h5`}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="glyph">
                <div
                  className={`glyph-icon iconsminds-line-chart-1

                h5`}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
  console.log(currencies);
  ////////////////////////
  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  const searchCurrencyHandler = async (e, searchId) => {
    e.preventDefault();
    try {
      const searchIdQuery = searchId === 0 ? "name" : "symbol";
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=${searchIdQuery}:${searchInput}`;
      await dispatch(searchCurrency(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  const switchFilterHandler = (e, id, parentId) => {
    switch (parentId) {
      case "type":
        if (e) {
          setFilterTypeList((prev) => [...prev, id]);
        } else {
          setFilterTypeList((prev) => prev.filter((p) => p !== id));
        }
        break;
      case "status":
        if (e) {
          setFilterStatusList((prev) => [...prev, id]);
        } else {
          setFilterStatusList((prev) => prev.filter((p) => p !== id));
        }
        break;
    }
  };
  const filterHandler = async () => {
    try {
      let filterQuery =
        filterTypeList.length !== 0 ? `?type=${filterTypeList.join(",")}` : "";
      filterQuery +=
        filterStatusList.length !== 0
          ? `,is_active=${filterStatusList
              .map((f) => (f === 0 ? true : false))
              .join(",")}`
          : ``;
      await dispatch(searchCurrency(filterQuery));
      setFilterTypeList([]);
    } catch (err) {
      throw err;
    }
  };
  const fetchCurrencies = async () => {
    try {
      const res = await dispatch(getAllCurrencies());
      if (res.payload.status === "ok") {
        setFilterTypeList([]);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div className="d-flex">
          <Colxx lg="12" xl="9">
            <Table
              cols={cols}
              title="مدیریت ارز ها"
              data={currencies}
              isCollapse={collapse}
              collapseData={collapseData}
              addName="افزودن ارز جدید"
              onAdd={() => {}}
              search={[
                {
                  id: 0,
                  name: "نام ارز",
                },
                {
                  id: 1,
                  name: "نماد",
                },
              ]}
              searchRef={searchInputRef}
              onSearch={searchCurrencyHandler}
            />
          </Colxx>
          <Colxx xxs="2">
            <SurveyApplicationMenu
              filters={[
                {
                  id: "type",
                  title: "نوع ارز",
                  switches: [
                    { id: 0, name: "فیات" },
                    { id: 1, name: "ارز الکترونیک" },
                    { id: 2, name: "ارز دیجیتال" },
                  ],
                },
                {
                  id: "status",
                  title: "وضعیت",
                  switches: [
                    { id: 0, name: "فعال" },
                    { id: 1, name: "غیر فعال" },
                  ],
                },
              ]}
              onSwitch={switchFilterHandler}
              onFilter={filterHandler}
            />
          </Colxx>
        </div>
      )}
    </Layout>
  );
}
