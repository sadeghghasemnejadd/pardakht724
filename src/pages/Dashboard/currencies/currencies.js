import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "layout/AppLayout";
import Switch from "rc-switch";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCurrencies,
  searchCurrency,
  addCurrency,
  updateCurrency,
} from "redux-toolkit/currenciesSlice";
import { Link, useHistory } from "react-router-dom";
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
  Card,
} from "reactstrap";
import HeaderLayout from "containers/ui/headerLayout";
export default function Currencies() {
  const [filterTypeList, setFilterTypeList] = useState({
    name: "type",
    value: [],
  });
  const [filterStatusList, setFilterStatusList] = useState({
    name: "status",
    value: [],
  });
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState([]);
  const [collapseData, setCollapseData] = useState([
    { type: "type", value: [] },
    { type: "absoluteVolume", value: [] },
    { type: "realVolume", value: [] },
    { type: "availableVolume", value: [] },
    { type: "baseCurrency", value: [] },
    { type: "autoUpdate", value: [] },
  ]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [id, setId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({ auto_update: 1 });
  const [isActiveAdd, setIsActiveAdd] = useState(1);
  const [isUpdateAdd, setIsUpdateAdd] = useState(1);
  const iconRef = useRef();
  const editIconRef = useRef();
  const [addIcon, setAddIcon] = useState();
  const [editIcon, setEditIcon] = useState();
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
  const dispatch = useDispatch();
  const { loading, currencies } = useSelector((store) => store.currencies);
  const [allCurrencies, setAllCurrencies] = useState([]);
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
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                className="custom-switch custom-switch-secondary custom-switch-small"
                disabled
                checked={props.value}
              />
            </div>
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
                  setCollapse((prev) =>
                    prev.some((p) => p === props.row.id)
                      ? prev.filter((p) => p !== props.row.id)
                      : [...prev, props.row.id]
                  );
                  setCollapseData((prev) =>
                    prev.map((p) =>
                      p.type === "type"
                        ? {
                            type: "type",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value[0] },
                                ],
                          }
                        : p.type === "absoluteVolume"
                        ? {
                            type: "absoluteVolume",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value[1] },
                                ],
                          }
                        : p.type === "realVolume"
                        ? {
                            type: "realVolume",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value[2] },
                                ],
                          }
                        : p.type === "availableVolume"
                        ? {
                            type: "availableVolume",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value[3] },
                                ],
                          }
                        : p.type === "baseCurrency"
                        ? {
                            type: "baseCurrency",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value[4] },
                                ],
                          }
                        : {
                            type: "autoUpdate",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value[5] },
                                ],
                          }
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
        accessor: "id",
        cellClass: "text-muted text-center",
        Cell: ({ value }) => {
          return (
            <div className="d-flex">
              <div
                className="glyph"
                onClick={() => {
                  setIsModal2(true);
                  setId(value);
                }}
              >
                <div
                  className={`glyph-icon simple-icon-pencil
                h5`}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="glyph">
                <Link
                  className={`glyph-icon iconsminds-synchronize-2

                h5`}
                  to={`/currencies/${value}/exchange-rates`}
                />
              </div>
              <div className="glyph">
                <Link
                  className={`glyph-icon iconsminds-line-chart-1

                h5`}
                  style={{ cursor: "pointer" }}
                  to={`/currencies/${value}/histories`}
                />
              </div>
            </div>
          );
        },
      },
    ],
    [id]
  );
  ////////////////////////
  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);
  useEffect(() => {
    setAllCurrencies(currencies);
  }, [currencies]);
  useEffect(() => {
    const data = currencies.find((p) => p.id == id);
    if (!data) return;
    setEditData({
      name: data?.name === null ? "" : data.name,
      symbol: data?.symbol === null ? "" : data.symbol,
      type: data?.type === null ? "" : data.type,
      base_currency: data?.base_currency === null ? "" : data.base_currency,
      buy_price: data?.buy_price === null ? "" : data.buy_price,
      sell_price: data?.sell_price === null ? "" : data.sell_price,
      auto_update: data?.auto_update === null ? "" : data.auto_update,
    });
  }, [id]);
  console.log(currencies);
  const searchCurrencyHandler = async (e, searchId) => {
    e.preventDefault();
    try {
      const searchInput = searchInputRef.current?.value;
      const searchIdQuery = searchId
        .map((s) => (s === 0 ? "name" : "symbol"))
        .map((s) => `${s}:${searchInput}`);

      const searchQuery = `?search_in=${
        searchIdQuery.length === 1 ? searchIdQuery[0] : searchIdQuery.join(",")
      }`;
      await dispatch(searchCurrency(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  const switchFilterHandler = (e, id, parentId) => {
    switch (parentId) {
      case "type":
        if (e) {
          setFilterTypeList((prev) => ({
            name: "type",
            value: [...prev.value, id],
          }));
        } else {
          setFilterTypeList((prev) => ({
            name: "type",
            value: prev.value.filter((p) => p !== id),
          }));
        }
        break;
      case "status":
        if (e) {
          setFilterStatusList((prev) => ({
            name: "status",
            value: [...prev.value, id],
          }));
        } else {
          setFilterStatusList((prev) => ({
            name: "status",
            value: prev.value.filter((p) => p !== id),
          }));
        }
        break;
    }
  };
  const filterHandler = async () => {
    try {
      let filterQuery = "?";
      filterQuery +=
        filterTypeList.value.length !== 0
          ? `type=${filterTypeList.value.join(",")}`
          : "";
      filterQuery +=
        filterStatusList.value.length !== 0 && filterTypeList.value.length !== 0
          ? `&is_active=${filterStatusList.value.join(",")}`
          : filterStatusList.value.length !== 0
          ? `is_active=${filterStatusList.value.join(",")}`
          : "";
      await dispatch(searchCurrency(filterQuery));
    } catch (err) {
      throw err;
    }
  };
  const fetchCurrencies = async () => {
    try {
      const res = await dispatch(getAllCurrencies());
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
  const uploadEditIcon = (e) => {
    if (iconRef.current) {
      const file = e.target.files;
      setEditIcon(file[0]);
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
      const res = await dispatch(addCurrency({ ...addData, addIcon }));
      if (res.payload.status === "ok") {
        toast.success("ارز با موفقیت اضافه شد");
        await fetchCurrencies();
        isModal(false);
      }
    } catch (err) {
      toast.error(err);
      throw err;
    }
  };
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(
        updateCurrency({ id, data: { ...editDataValue, ...editIcon } })
      );
      if (res.payload.status === "ok") {
        setAllCurrencies((prev) =>
          prev.map((p) =>
            p.id === res.payload.currency.id
              ? {
                  ...res.payload.currency,
                  name_with_symbol: [
                    res.payload.currency.name,
                    res.payload.currency.symbol,
                  ],
                  collapse_data: [
                    res.payload.currency.type,
                    res.payload.currency.absolute_volume,
                    res.payload.currency.real_volume,
                    res.payload.currency.available_volume,
                    res.payload.currency.base_currency,
                    res.payload.currency.auto_update,
                  ],
                }
              : p
          )
        );
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal2(false);
        setEditDataValue({});
      }
    } catch (err) {
      toast.error("ویرایش ارز با خطا روبرو شد");
      throw err;
    }
  };
  const history = useHistory();
  const match = [
    {
      path: "/",
      text: "مالی",
    },
    {
      path: history.location.pathname,
      text: "مدیریت ارز ها",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div className="d-flex">
          <Colxx lg="12" xl="9">
            <Card className="mb-4 p-5">
              <HeaderLayout
                title="مدیریت ارز ها"
                addName="افزودن ارز جدید"
                onSearch={searchCurrencyHandler}
                hasSearch={true}
                searchInputRef={searchInputRef}
                searchOptions={[
                  {
                    id: 0,
                    name: "نام ارز",
                  },
                  {
                    id: 1,
                    name: "نماد",
                  },
                ]}
                onAdd={() => {
                  setIsModal(true);
                }}
                match={match}
              />
              <Table
                cols={cols}
                data={allCurrencies}
                isCollapse={collapse}
                collapseData={collapseData}
              />
            </Card>
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
          <Modal
            isOpen={isModal2}
            size="lg"
            toggle={() => setIsModal2(!isModal2)}
          >
            <ModalHeader>ویرایش</ModalHeader>
            <ModalBody>
              <div className="d-flex mb-3">
                <InputGroup size="sm" className="mr-3">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">نام ارز</span>
                  </InputGroupAddon>
                  <Input
                    value={editData.name}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                  />
                </InputGroup>
                <InputGroup size="sm" className="">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">نماد</span>
                  </InputGroupAddon>
                  <Input
                    value={editData.symbol}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        symbol: e.target.value,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        symbol: e.target.value,
                      }));
                    }}
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
                    innerRef={editIconRef}
                    name="icon"
                    onChange={uploadEditIcon}
                  />
                </InputGroup>
              </div>
              <div className="d-flex mb-3">
                <InputGroup size="sm" className="mr-3">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">قیمت خرید از مشتری</span>
                  </InputGroupAddon>
                  <Input
                    value={editData.buy_price}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        buy_price: e.target.value,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        buy_price: e.target.value,
                      }));
                    }}
                  />
                </InputGroup>
                <InputGroup size="sm" className="">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">قیمت فروش به مشتری</span>
                  </InputGroupAddon>
                  <Input
                    value={editData.sell_price}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        sell_price: e.target.value,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        sell_price: e.target.value,
                      }));
                    }}
                  />
                </InputGroup>
              </div>
              <div className="d-flex mb-3">
                <InputGroup size="sm">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">ارز پایه</span>
                  </InputGroupAddon>
                  <Input
                    value={editData.base_currency}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        base_currency: e.target.value,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        base_currency: e.target.value,
                      }));
                    }}
                  />
                </InputGroup>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex w-50 justify-content-between align-items-center mr-4">
                  <p className="mb-0">نوع ارز</p>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      onClick={() => {
                        setEditData((prev) => ({ ...prev, type: 0 }));
                        setEditDataValue((prev) => ({ ...prev, type: 0 }));
                      }}
                      active={editData.type === 0}
                    >
                      فیات
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        setEditData((prev) => ({ ...prev, type: 1 }));
                        setEditDataValue((prev) => ({ ...prev, type: 1 }));
                      }}
                      active={editData.type === 1}
                    >
                      الکترونیک
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        setEditData((prev) => ({ ...prev, type: 2 }));
                        setEditDataValue((prev) => ({ ...prev, type: 2 }));
                      }}
                      active={editData.type === 2}
                    >
                      دیجیتال
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="d-flex align-items-center w-25 justify-content-end">
                  <p className="mb-0 mr-3">بروزرسانی خودکار</p>
                  <Switch
                    className="custom-switch custom-switch-secondary custom-switch-small"
                    checked={editData.auto_update === 0 ? true : false}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        auto_update: e ? 0 : 1,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        auto_update: e ? 0 : 1,
                      }));
                    }}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="d-flex flex-row-reverse justify-content-start">
              <Button
                color="primary"
                size="lg"
                className="mb-2"
                onClick={saveChangeHandler}
              >
                ویرایش
              </Button>
              <Button
                color="secondary"
                size="lg"
                className="mb-2"
                onClick={() => setIsModal2(false)}
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
              data={[filterTypeList, filterStatusList]}
            />
          </Colxx>
        </div>
      )}
    </Layout>
  );
}
