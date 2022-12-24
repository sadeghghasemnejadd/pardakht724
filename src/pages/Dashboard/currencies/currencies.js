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
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  ButtonGroup,
  Button,
  CustomInput,
} from "reactstrap";

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
  const [selectedButton, setSelectedButton] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isActiveAdd, setIsActiveAdd] = useState(1);
  const [isUpdateAdd, setIsUpdateAdd] = useState(1);
  const iconRef = useRef();
  const [addIcon, setAddIcon] = useState();
  const [addData, setAddData] = useState({
    name: "",
    Symbol: "",
    type: 0,
    icon: "",
    base_currency: "",
    buy_price: 0,
    sell_price: 0,
    absolute_volume: 0,
    auto_update: 1,
    is_active: 1,
  });
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
      let filterQuery = "?";
      filterQuery +=
        filterTypeList.length !== 0 ? `type=${filterTypeList.join(",")}` : "";
      filterQuery +=
        filterStatusList.length !== 0 && filterTypeList.length !== 0
          ? `&is_active=${filterStatusList.join(",")}`
          : filterStatusList.length !== 0
          ? `is_active=${filterStatusList.join(",")}`
          : "";
      await dispatch(searchCurrency(filterQuery));
      setFilterTypeList([]);
      setFilterStatusList([]);
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
  const uploadIcon = (e) => {
    if (iconRef.current) {
      const file = e.target.files;
      setAddIcon(file[0]);
    }
  };
  const addCurrenciesHandler = async () => {
    try {
      if (addData.name.length > 127) {
        throw new Error("نام ارز حداکثر باید 127 کارکتر باشد");
      }
      if (addData.symbol.length > 127) {
        throw new Error("نماد ارز حداکثر باید 127 کارکتر باشد");
      }
      if (addData.base_currency.length > 127) {
        throw new Error("ارز پایه حداکثر باید 127 کارکتر باشد");
      }
      if (Number.isNaN(Number(addData.absolute_volume))) {
        throw new Error("موجودی حتما باید عدد باشد");
      }
      if (addIcon.size > 128000) {
        throw new Error("سایز عکس باید کمتر از 128 کیلوبایت باشد");
      }
      if (!addIcon.name.includes(".png")) {
        throw new Error("فرمت عکس حنما باید png باشد");
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
              onAdd={() => {
                setIsModal(true);
              }}
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
          <Modal isOpen={isModal} size="lg" toggle={() => setIsModal(!isModal)}>
            <ModalHeader>ایجاد ارز جدید</ModalHeader>
            <ModalBody>
              <div className="d-flex mb-3">
                <InputGroup size="sm" className="mr-3">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">نام ارز</span>
                  </InputGroupAddon>
                  <Input
                    onChange={(e) =>
                      setAddData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </InputGroup>
                <InputGroup size="sm" className="">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">نماد</span>
                  </InputGroupAddon>
                  <Input
                    onChange={(e) =>
                      setAddData((prev) => ({
                        ...prev,
                        symbol: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </div>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    آپلود آیکون
                  </InputGroupAddon>
                  <CustomInput
                    type="file"
                    id="icon"
                    innerRef={iconRef}
                    name="icon"
                    onChange={uploadIcon}
                  />
                </InputGroup>
              </div>
              <div className="d-flex mb-3">
                <InputGroup size="sm" className="mr-3">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">موجودی حساب</span>
                  </InputGroupAddon>
                  <Input
                    onChange={(e) =>
                      setAddData((prev) => ({
                        ...prev,
                        absolute_volume: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
                <InputGroup size="sm" className="">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">ارز پایه</span>
                  </InputGroupAddon>
                  <Input
                    onChange={(e) =>
                      setAddData((prev) => ({
                        ...prev,
                        base_currency: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex w-50 justify-content-between align-items-center mr-4">
                  <p className="mb-0">نوع ارز</p>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      onClick={() => setSelectedButton(0)}
                      active={selectedButton === 0}
                    >
                      فیات
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setSelectedButton(1)}
                      active={selectedButton === 1}
                    >
                      الکترونیک
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setSelectedButton(2)}
                      active={selectedButton === 2}
                    >
                      دیجیتال
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="d-flex align-items-center w-25  mr-3">
                  <p className="mb-0 mr-3">وضعیت</p>
                  <Switch
                    className="custom-switch custom-switch-secondary custom-switch-small"
                    checked={isActiveAdd}
                    onChange={() =>
                      setIsActiveAdd((prev) => (prev === 0 ? 1 : 0))
                    }
                  />
                </div>
                <div className="d-flex align-items-center w-25 justify-content-end">
                  <p className="mb-0 mr-3">بروزرسانی خودکار</p>
                  <Switch
                    className="custom-switch custom-switch-secondary custom-switch-small"
                    checked={isUpdateAdd}
                    onChange={() =>
                      setIsUpdateAdd((prev) => (prev === 0 ? 1 : 0))
                    }
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="d-flex flex-row-reverse justify-content-start">
              <Button
                color="primary"
                size="lg"
                className="mb-2"
                onClick={addCurrenciesHandler}
              >
                ایجاد
              </Button>
              <Button
                color="secondary"
                size="lg"
                className="mb-2"
                onClick={() => setIsModal(false)}
              >
                لغو
              </Button>
            </ModalFooter>
          </Modal>
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
                    { id: 1, name: "فعال" },
                    { id: 0, name: "غیر فعال" },
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
