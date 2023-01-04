import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Layout from "layout/AppLayout";
import Switch from "rc-switch";
import Select from "react-select";
import CustomSelectInput from "components/common/CustomSelectInput";
import {
  Card,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import "rc-switch/assets/index.css";
import ReactAutoSuggest from "components/common/ReactAutoSuggest";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPayMethods,
  searchPayMethods,
  updatePayMethod,
} from "redux-toolkit/payMethodSlice";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLayout from "containers/ui/headerLayout";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
const PayMethods = () => {
  const dispatch = useDispatch();
  const { loading, payMethods } = useSelector((store) => store.payMethod);
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState([]);
  const [filterTypeList, setFilterTypeList] = useState({
    name: "type",
    value: [],
  });
  const [filterStatusList, setFilterStatusList] = useState({
    name: "status",
    value: [],
  });
  const [filterPayTypeList, setFilterPayTypeList] = useState({
    name: "payType",
    value: [],
  });
  const [filterPayMethodList, setFilterPayMethodList] = useState({
    name: "payMethod",
    value: [],
  });
  const [autoSuggest, setAutoSuggest] = useState("");
  const [addData, setAddData] = useState({
    name: "",
    p_name: "",
    description: "",
    merchant_id: "",
    is_iranian: 1,
    call_back_url: "",
    call_back_url2: "",
    is_active: 1,
    direction_type: 1,
    execution_type: 1,
    access_type: "",
    account_identifier: 0,
    owner_name: "",
    bank_id: 0,
    max_capability: 0,
  });
  const [id, setId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [collapseData, setCollapseData] = useState([
    { type: "threeLine", value: [] },
  ]);
  const history = useHistory();
  const match = [
    {
      path: "/",
      text: "مالی",
    },
    {
      path: history.location.pathname,
      text: "مدیریت روش های پرداخت",
    },
  ];
  const cols = useMemo(
    () => [
      {
        Header: "نام",
        accessor: "bank",
        cellClass: "text-muted text-center w-10",
        Cell: (props) => {
          return (
            <div className="d-flex align-items-center">
              {props.value?.icon && (
                <img
                  src={props.value.icon}
                  alt={props.value.name}
                  className="bank_image"
                />
              )}
              {props.value?.name && <p>{props.value.name}</p>}
            </div>
          );
        },
      },

      {
        Header: "برچسب",
        accessor: "name",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "صاحب حساب",
        accessor: "owner_name",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "نوع حساب",
        accessor: "is_iranian",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return (
            <>
              <>{props.value ? "ایرانی" : "خارجی"}</>
            </>
          );
        },
      },
      {
        Header: "نوع پرداخت",
        accessor: "direction_type",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>{props.value === 1 ? "مستقیم" : "غیر مستقیم"}</>;
        },
      },
      {
        Header: "روش پرداخت",
        accessor: "execution_type",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return (
            <>
              {props.value === 1
                ? "درگاه بانکی"
                : props.value === -1
                ? "کارت به کارت"
                : props.value === -2
                ? "شماره حساب"
                : "شماره شبا"}
            </>
          );
        },
      },
      {
        Header: "وضعیت",
        accessor: "is_active",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return (
            <Switch
              className="custom-switch custom-switch-secondary custom-switch-small"
              disabled
              checked={props.value}
            />
          );
        },
      },
      {
        Header: "عملیات",
        accessor: "collapseData",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return (
            <div className="d-flex align-items-center">
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
                    prev.map((p) => ({
                      type: "threeLine",
                      value: p.value.some((v) => v.id == props.row.id)
                        ? p.value
                        : [
                            ...p.value,
                            { id: props.row.id, value: props.value },
                          ],
                    }))
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
              <div
                className="glyph h5"
                onClick={() => {
                  setId(props.value.id);
                  setIsModal2(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className={`glyph-icon simple-icon-pencil text-center`} />
              </div>
            </div>
          );
        },
      },
    ],
    [collapse, id]
  );
  useEffect(() => {
    fetchPayMethods();
  }, [fetchPayMethods]);
  useEffect(() => {
    const data = payMethods.find((p) => p.id == id);
    if (!data) return;
    setEditData({
      name: data?.name === null ? "" : data.name,
      is_iranian: data?.is_iranian === null ? "" : data.is_iranian,
      max_capability: data?.max_capability === null ? "" : data.max_capability,
      p_name: data?.p_name === null ? "" : data.p_name,
      description: data?.description === null ? "" : data.description,
      merchant_id: data?.merchant_id === null ? "" : data.merchant_id,
      call_back_url: data?.call_back_url === null ? "" : data.call_back_url,
      call_back_url2: data?.call_back_url2 === null ? "" : data.call_back_url2,
      is_active: data?.is_active === null ? "" : data.is_active,
      direction_type: data?.direction_type === null ? "" : data.direction_type,
      execution_type: data?.execution_type === null ? "" : data.execution_type,
      account_identifier:
        data?.account_identifier === null ? "" : data.account_identifier,
      access_type: data?.access_type === null ? "" : data.access_type,
      owner_name: data?.owner_name === null ? "" : data.owner_name,
      owner_id: data?.owner_id === null ? "" : data.owner_id,
      bank_id: data?.bank_id === null ? "" : data.bank_id,
    });
  }, [id]);

  const fetchPayMethods = async () => {
    try {
      await dispatch(getAllPayMethods());
    } catch (err) {
      throw err;
    }
  };
  const searchHandler = async (e, searchId) => {
    e.preventDefault();
    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=${
        searchId === 0 ? "p_name" : searchId === 1 ? "owner_name" : "name"
      }:${searchInput}`;
      await dispatch(searchPayMethods(searchQuery));
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
      case "payType":
        if (e) {
          setFilterPayTypeList((prev) => ({
            name: "payType",
            value: [...prev.value, id],
          }));
        } else {
          setFilterPayTypeList((prev) => ({
            name: "payType",
            value: prev.value.filter((p) => p !== id),
          }));
        }
        break;
      case "payMethod":
        if (e) {
          setFilterPayMethodList((prev) => ({
            name: "payMethod",
            value: [...prev.value, id],
          }));
        } else {
          setFilterPayMethodList((prev) => ({
            name: "payMethod",
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
          ? `is_iranian=${filterTypeList.value.join(",")}`
          : "";
      filterQuery +=
        filterPayTypeList.value.length !== 0 && filterQuery.length > 1
          ? `&direction_type=${filterPayTypeList.value.join(",")}`
          : filterPayTypeList.value.length !== 0
          ? `direction_type=${filterPayTypeList.value.join(",")}`
          : "";
      filterQuery +=
        filterPayMethodList.value.length !== 0 && filterQuery.length > 1
          ? `&execution_type=${filterPayMethodList.value.join(",")}`
          : filterPayMethodList.value.length !== 0
          ? `execution_type=${filterPayMethodList.value.join(",")}`
          : "";
      filterQuery +=
        filterStatusList.value.length !== 0 && filterQuery.length > 1
          ? `&is_active=${filterStatusList.value.join(",")}`
          : filterStatusList.value.length !== 0
          ? `is_active=${filterStatusList.value.join(",")}`
          : "";
      await dispatch(searchPayMethods(filterQuery));
    } catch (err) {
      throw err;
    }
  };
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(updatePayMethod({ id, data: editDataValue }));
      if (res.payload.status === "ok") {
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal(false);
        setEditDataValue({});
        await fetchTasks();
      }
    } catch (err) {
      toast.error("ویرایش روش پرداخت با خطا روبرو شد");
      throw err;
    }
  };
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <>
          <Colxx lg="12" xl="9">
            <Card className="mb-4 p-5">
              <HeaderLayout
                title="مدیریت روش های پرداخت"
                addName="افزودن روش پرداخت جدید"
                onSearch={searchHandler}
                hasSearch={true}
                searchInputRef={searchInputRef}
                onAdd={() => setIsModal(true)}
                searchOptions={[
                  {
                    id: 0,
                    name: "نام",
                  },
                  {
                    id: 1,
                    name: "صاحب حساب",
                  },
                  {
                    id: 2,
                    name: "برچسب",
                  },
                ]}
                match={match}
              />
              <Table
                cols={cols}
                data={payMethods}
                isCollapse={collapse}
                collapseData={collapseData}
              />
              <Modal
                isOpen={isModal}
                size="lg"
                toggle={() => setIsModal(!isModal)}
              >
                <ModalHeader>ایجاد روش پرداخت جدید</ModalHeader>
                <ModalBody>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className="mr-3">
                      <InputGroupAddon addonType="prepend" className="w-30">
                        <span className="input-group-text w-100">
                          بانک مورد نظر
                        </span>
                      </InputGroupAddon>
                      <div className="w-70">
                        <ReactAutoSuggest
                          AutoSuggest
                          value={autoSuggest}
                          onChange={(val) => {
                            setAutoSuggest(val);
                          }}
                          data={[
                            ...new Set(payMethods.map((pay) => pay.bank?.name)),
                          ]
                            .filter((n) => n)
                            .map((n) => ({ name: n }))}
                        />
                      </div>
                    </InputGroup>
                    <InputGroup size="sm" className="d-flex">
                      <InputGroupAddon addonType="prepend" className="w-30">
                        <span className="input-group-text w-100">
                          صاحب حساب
                        </span>
                      </InputGroupAddon>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select w-70"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={selectedOption}
                        onChange={setSelectedOption}
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "100%",
                            minHeight: "100%",
                          }),
                        }}
                        options={{}}
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className=" mr-3">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">نام</span>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            p_name: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">برچسب</span>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className="mr-3">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">شناسه حساب</span>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            account_identifier: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">
                          حداکثر مبلغ قابل پرداخت
                        </span>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            max_capability: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className="mr-3">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">کد مرچنت</span>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            merchant_id: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="w-50">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">نوع دسترسی</span>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            access_type: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">آدرس بازگشت1</span>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            call_back_url: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">آدرس بازگشت2</span>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            call_back_url2: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3 justify-content-between w-100">
                    <div className="d-flex align-items-center">
                      <p className="mr-2 mb-0">نوع حساب :</p>
                      <Input
                        bsSize="sm"
                        className="w-50 min-h-15"
                        type="select"
                        style={{ borderRadius: 20 }}
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            is_iranian: e.target.value,
                          }))
                        }
                      >
                        <option value={1}>ایرانی</option>
                        <option value={0}>خارجی</option>
                      </Input>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="mr-2 mb-0">نوع پرداخت :</p>
                      <Input
                        bsSize="sm"
                        className="w-50 min-h-15"
                        type="select"
                        style={{ borderRadius: 20 }}
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            direction_type: e.target.value,
                          }))
                        }
                      >
                        <option value={1}>مستقیم</option>
                        <option value={0}>غیر مستقیم</option>
                      </Input>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="mr-2 mb-0">روش پرداخت :</p>
                      <Input
                        bsSize="sm"
                        className="w-50 min-h-15"
                        type="select"
                        style={{ borderRadius: 20 }}
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            execution_type: e.target.value,
                          }))
                        }
                      >
                        <option value={-1}>کارت به کارت</option>
                        <option value={-2}>شماره حساب</option>
                        <option value={1}>درگاه بانکی</option>
                        <option value={-3}>شماره شبا</option>
                      </Input>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 mr-3">وضعیت</p>
                      <Switch
                        className="custom-switch custom-switch-secondary custom-switch-small"
                        checked
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            is_active: e ? 1 : 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">توضیحات</span>
                      </InputGroupAddon>
                      <Input
                        type="textarea"
                        rows="5"
                        onChange={(e) =>
                          setAddData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </InputGroup>
                  </div>
                </ModalBody>
                <ModalFooter className="d-flex flex-row-reverse justify-content-start">
                  <Button
                    color="primary"
                    size="lg"
                    className="mb-2"
                    onClick={() => {}}
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
                      <InputGroupAddon addonType="prepend" className="w-30">
                        <span className="input-group-text w-100">
                          بانک مورد نظر
                        </span>
                      </InputGroupAddon>
                      <div className="w-70">
                        <ReactAutoSuggest
                          AutoSuggest
                          value={autoSuggest}
                          onChange={(val) => {
                            setAutoSuggest(val);
                          }}
                          data={[
                            ...new Set(payMethods.map((pay) => pay.bank?.name)),
                          ]
                            .filter((n) => n)
                            .map((n) => ({ name: n }))}
                        />
                      </div>
                    </InputGroup>
                    <InputGroup size="sm" className="d-flex">
                      <InputGroupAddon addonType="prepend" className="w-30">
                        <span className="input-group-text w-100">
                          صاحب حساب
                        </span>
                      </InputGroupAddon>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select w-70"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={selectedOption}
                        onChange={setSelectedOption}
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "100%",
                            minHeight: "100%",
                          }),
                        }}
                        options={{}}
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className=" mr-3">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">نام</span>
                      </InputGroupAddon>
                      <Input
                        value={editData.p_name}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            p_name: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            p_name: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">برچسب</span>
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
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className="mr-3">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">شناسه حساب</span>
                      </InputGroupAddon>
                      <Input
                        value={editData.account_identifier}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            account_identifier: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            account_identifier: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">
                          حداکثر مبلغ قابل پرداخت
                        </span>
                      </InputGroupAddon>
                      <Input
                        value={editData.max_capability}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            max_capability: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            max_capability: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className="mr-3">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">کد مرچنت</span>
                      </InputGroupAddon>
                      <Input
                        value={editData.merchant_id}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            merchant_id: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            merchant_id: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="w-50">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">نوع دسترسی</span>
                      </InputGroupAddon>
                      <Input
                        value={editData.access_type}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            access_type: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            access_type: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">آدرس بازگشت1</span>
                      </InputGroupAddon>
                      <Input
                        value={editData.call_back_url}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            call_back_url: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            call_back_url: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">آدرس بازگشت2</span>
                      </InputGroupAddon>
                      <Input
                        value={editData.call_back_url2}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            call_back_url2: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            call_back_url2: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3 justify-content-between w-100">
                    <div className="d-flex align-items-center">
                      <p className="mr-2 mb-0">نوع حساب :</p>
                      <Input
                        bsSize="sm"
                        className="w-50 min-h-15"
                        type="select"
                        style={{ borderRadius: 20 }}
                        value={editData.is_iranian}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            is_iranian: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            is_iranian: e.target.value,
                          }));
                        }}
                      >
                        <option value={1}>ایرانی</option>
                        <option value={0}>خارجی</option>
                      </Input>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="mr-2 mb-0">نوع پرداخت :</p>
                      <Input
                        bsSize="sm"
                        className="w-50 min-h-15"
                        type="select"
                        style={{ borderRadius: 20 }}
                        value={editData.direction_type}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            direction_type: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            direction_type: e.target.value,
                          }));
                        }}
                      >
                        <option value={1}>مستقیم</option>
                        <option value={0}>غیر مستقیم</option>
                      </Input>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="mr-2 mb-0">روش پرداخت :</p>
                      <Input
                        bsSize="sm"
                        className="w-50 min-h-15"
                        type="select"
                        style={{ borderRadius: 20 }}
                        value={editData.execution_type}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            execution_type: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            execution_type: e.target.value,
                          }));
                        }}
                      >
                        <option value={-1}>کارت به کارت</option>
                        <option value={-2}>شماره حساب</option>
                        <option value={1}>درگاه بانکی</option>
                        <option value={-3}>شماره شبا</option>
                      </Input>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 mr-3">وضعیت</p>
                      <Switch
                        className="custom-switch custom-switch-secondary custom-switch-small"
                        checked={editData.is_active}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            is_active: e ? 1 : 0,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            is_active: e ? 1 : 0,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">توضیحات</span>
                      </InputGroupAddon>
                      <Input
                        type="textarea"
                        rows="5"
                        value={editData.description}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                          setEditDataValue((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
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
            </Card>
          </Colxx>
          <Colxx xxs="2">
            <SurveyApplicationMenu
              filters={[
                {
                  id: "type",
                  title: "نوع حساب",
                  switches: [
                    { id: 1, name: "ایرانی" },
                    { id: 0, name: "خارجی" },
                  ],
                },
                {
                  id: "payType",
                  title: "نوع پرداخت",
                  switches: [
                    { id: 1, name: "مستقیم" },
                    { id: 0, name: "غیر مستقیم" },
                  ],
                },
                {
                  id: "payMethod",
                  title: "روش پرداخت",
                  switches: [
                    { id: -1, name: "کارت به کارت" },
                    { id: -2, name: "شماره حساب" },
                    { id: 1, name: "درگاه بانکی" },
                    { id: -3, name: "شماره شبا" },
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
              data={[
                filterTypeList,
                filterPayMethodList,
                filterPayTypeList,
                filterStatusList,
              ]}
            />
          </Colxx>
        </>
      )}
    </Layout>
  );
};
export default PayMethods;
