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
import checkCountCharacters from "components/custom/validation/checkCountCharacters";
import checkPersian from "components/custom/validation/checkPersian";
import checkNumber from "components/custom/validation/checkNumber";
import checkUrl from "components/custom/validation/checkUrl";
const PayMethods = () => {
  const dispatch = useDispatch();
  const { loading, payMethods } = useSelector((store) => store.payMethod);
  const [allPayMethods, setAllPayMethods] = useState([]);
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
  const [pNameValidation, setPNameValidation] = useState({
    status: false,
    message: "نام نباید خالی باشد",
  });
  const [nameValidation, setNameValidation] = useState({
    status: true,
    message: "",
  });
  const [bankIdValidation, setBankIdValidation] = useState({
    status: true,
    message: "",
  });
  const [maxCapValidation, setMaxCapValidation] = useState({
    status: false,
    message: "حداکثر مبلغ نباید خالی باشد",
  });
  const [merchantIdValidation, setMerchantIdValidation] = useState({
    status: true,
    message: "",
  });
  const [url1Validation, setUrl1Validation] = useState({
    status: true,
    message: "",
  });
  const [url2Validation, setUrl2Validation] = useState({
    status: true,
    message: "",
  });
  const [descriptionValidation, setDescriptionValidation] = useState({
    status: true,
    message: "",
  });
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
                  setPNameValidation({ status: true, message: "" });
                  setMaxCapValidation({ status: true, message: "" });
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
    setAllPayMethods(payMethods);
  }, [payMethods]);
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
        setAllPayMethods((prev) =>
          prev.map((p) =>
            p.id === res.payload.pay_method.id
              ? {
                  ...res.payload.pay_method,
                  collapseData: {
                    id: res.payload.pay_method.id,
                    account_identifier:
                      res.payload.pay_method.account_identifier,
                    merchant_id: res.payload.pay_method.merchant_id,
                    access_type: res.payload.pay_method.access_type,
                    call_back_url: res.payload.pay_method.call_back_url,
                    call_back_url2: res.payload.pay_method.call_back_url2,
                    max_capability: res.payload.pay_method.max_capability,
                    description: res.payload.pay_method.description,
                  },
                }
              : p
          )
        );
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal(false);
        setEditDataValue({});
      }
    } catch (err) {
      toast.error("ویرایش روش پرداخت با خطا روبرو شد");
      throw err;
    }
  };
  const pNameValidationHandler = (val) => {
    if (!val) {
      setPNameValidation({ status: false, message: "نام نباید خالی باشد" });
      return false;
    } else if (checkCountCharacters(val, 127)) {
      setPNameValidation({
        status: false,
        message: "نام نباید بیشتر از 127 کاراکتر باشد",
      });
      return false;
    } else if (!checkPersian(val)) {
      setPNameValidation({ status: false, message: "نام باید فارسی باشد" });
      return false;
    } else {
      setPNameValidation({ status: true, message: "" });
      return true;
    }
  };
  const nameValidationHandler = (val) => {
    if (checkCountCharacters(val, 127)) {
      setNameValidation({
        status: false,
        message: "برچسب نباید بیشتر از 127 کاراکتر داشته باشد",
      });
      return false;
    } else {
      setNameValidation({ status: true, message: "" });
      return true;
    }
  };
  const bankIdValidationHandler = (val) => {
    if (!payMethods.some((p) => p.bank.name === val)) {
      setBankIdValidation({ status: false, message: "نام بانک اشتباه میباشد" });
      return false;
    } else if (!val && addData.account_identifier) {
      setBankIdValidation({
        status: false,
        message: "نام بانک نباید خالی باشد",
      });
      return false;
    } else {
      setBankIdValidation({ status: true, message: "" });
      return true;
    }
  };
  const maxCapValidationHandler = (val) => {
    if (!checkNumber(val)) {
      setMaxCapValidation({
        status: false,
        message: "حداکثر مبلغ باید عدد باشد",
      });
      return false;
    } else if (+val > 18446744073709551614) {
      setMaxCapValidation({
        status: false,
        message: "عدد نباید بیشتر از 18446744073709551614 باشد",
      });
      return false;
    } else if (!val) {
      setMaxCapValidation({
        status: false,
        message: "حداکثر مبلغ نباید خالی باشد.",
      });
      return false;
    } else {
      setMaxCapValidation({ status: true, message: "" });
      return true;
    }
  };
  const merchantIdValidationHandler = (val) => {
    if (checkCountCharacters(val, 127)) {
      setMerchantIdValidation({
        status: false,
        message: "کد مرچنت نباید بیشتر از 127 کاراکتر باشد",
      });
      return false;
    } else {
      setMerchantIdValidation({ status: true, message: "" });
      return true;
    }
  };
  const url1ValidationHandler = (val) => {
    if (!checkUrl(val)) {
      setUrl1Validation({
        status: false,
        message: "آدرس انتخابی اشتباه میباشد(باید از جنس url باشد)",
      });
      return false;
    } else if (checkCountCharacters(val, 511)) {
      setUrl1Validation({
        status: false,
        message: "ادرس انتخابی نباید بیشتر از 511 کاراکتر باشد",
      });
      return false;
    } else {
      setUrl1Validation({ status: true, message: "" });
      return true;
    }
  };
  const url2ValidationHandler = (val) => {
    if (!checkUrl(val)) {
      setUrl2Validation({
        status: false,
        message: "آدرس انتخابی اشتباه میباشد(باید از جنس url باشد)",
      });
      return false;
    } else if (checkCountCharacters(val, 511)) {
      setUrl2Validation({
        status: false,
        message: "ادرس انتخابی نباید بیشتر از 511 کاراکتر باشد",
      });
      return false;
    } else {
      setUrl2Validation({ status: true, message: "" });
      return true;
    }
  };
  const descriptionValidationHandler = (val) => {
    if (!checkPersian(val)) {
      setDescriptionValidation({
        status: false,
        message: "توضیحات باید فارسی باشد",
      });
      return false;
    } else if (checkCountCharacters(val, 255)) {
      setDescriptionValidation({
        status: false,
        message: "توضیحات نباید بیشتر از 255 کاراکتر باشد",
      });
      return false;
    } else {
      setDescriptionValidation({ status: true, message: "" });
      return true;
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
                data={allPayMethods}
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
                      <div className="w-70 pos-rel">
                        <ReactAutoSuggest
                          AutoSuggest
                          value={autoSuggest}
                          onChange={(val) => {
                            if (!bankIdValidationHandler(val)) return;
                            setAutoSuggest(val);
                          }}
                          data={[
                            ...new Set(payMethods.map((pay) => pay.bank?.name)),
                          ]
                            .filter((n) => n)
                            .map((n) => ({ name: n }))}
                        />
                        {bankIdValidation.status || (
                          <div className="invalid-feedback d-block">
                            {bankIdValidation.message}
                          </div>
                        )}
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
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          onChange={(e) => {
                            if (!pNameValidationHandler(e.target.value)) return;
                            setAddData((prev) => ({
                              ...prev,
                              p_name: e.target.value,
                            }));
                          }}
                        />
                        {pNameValidation.status || (
                          <div className="invalid-feedback d-block">
                            {pNameValidation.message}
                          </div>
                        )}
                      </div>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">برچسب</span>
                      </InputGroupAddon>
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          onChange={(e) => {
                            if (!nameValidationHandler(e.target.value)) return;
                            setAddData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                          }}
                        />
                        {nameValidation.status || (
                          <div className="invalid-feedback d-block">
                            {nameValidation.message}
                          </div>
                        )}
                      </div>
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
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          onChange={(e) => {
                            if (!maxCapValidationHandler(e.target.value))
                              return;
                            setAddData((prev) => ({
                              ...prev,
                              max_capability: e.target.value,
                            }));
                          }}
                        />
                        {maxCapValidation.status || (
                          <div className="invalid-feedback d-block">
                            {maxCapValidation.message}
                          </div>
                        )}
                      </div>
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className="mr-3">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">کد مرچنت</span>
                      </InputGroupAddon>
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          onChange={(e) => {
                            if (!merchantIdValidationHandler(e.target.value))
                              return;
                            setAddData((prev) => ({
                              ...prev,
                              merchant_id: e.target.value,
                            }));
                          }}
                        />
                        {merchantIdValidation.status || (
                          <div className="invalid-feedback d-block">
                            {merchantIdValidation.message}
                          </div>
                        )}
                      </div>
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
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          onChange={(e) => {
                            if (!url1ValidationHandler(e.target.value)) return;
                            setAddData((prev) => ({
                              ...prev,
                              call_back_url: e.target.value,
                            }));
                          }}
                        />
                        {url1Validation.status || (
                          <div className="invalid-feedback d-block">
                            {url1Validation.message}
                          </div>
                        )}
                      </div>
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">آدرس بازگشت2</span>
                      </InputGroupAddon>
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          onChange={(e) => {
                            if (!url2ValidationHandler(e.target.value)) return;
                            setAddData((prev) => ({
                              ...prev,
                              call_back_url2: e.target.value,
                            }));
                          }}
                        />
                        {url2Validation.status || (
                          <div className="invalid-feedback d-block">
                            {url2Validation.message}
                          </div>
                        )}
                      </div>
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
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          type="textarea"
                          rows="5"
                          onChange={(e) => {
                            if (!descriptionValidationHandler(e.target.value))
                              return;
                            setAddData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }));
                          }}
                        />
                        {descriptionValidation.status || (
                          <div className="invalid-feedback d-block">
                            {descriptionValidation.message}
                          </div>
                        )}
                      </div>
                    </InputGroup>
                  </div>
                </ModalBody>
                <ModalFooter className="d-flex flex-row-reverse justify-content-start">
                  <Button
                    color="primary"
                    size="lg"
                    className="mb-2"
                    onClick={() => {
                      if (
                        !descriptionValidation.status ||
                        !url2Validation.status ||
                        !url1Validation.status ||
                        !merchantIdValidation.value ||
                        !maxCapValidation.value ||
                        !bankIdValidation.status ||
                        !nameValidation.status ||
                        !pNameValidation.status
                      )
                        return;
                    }}
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
                      <div className="w-70 pos-rel">
                        <ReactAutoSuggest
                          AutoSuggest
                          value={autoSuggest}
                          onChange={(val) => {
                            if (!bankIdValidationHandler(val)) return;
                            setAutoSuggest(val);
                          }}
                          data={[
                            ...new Set(payMethods.map((pay) => pay.bank?.name)),
                          ]
                            .filter((n) => n)
                            .map((n) => ({ name: n }))}
                        />
                        {bankIdValidation.status || (
                          <div className="invalid-feedback d-block">
                            {bankIdValidation.message}
                          </div>
                        )}
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
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          value={editData.p_name}
                          onChange={(e) => {
                            setEditData((prev) => ({
                              ...prev,
                              p_name: e.target.value,
                            }));
                            if (!pNameValidationHandler(e.target.value)) return;
                            setEditDataValue((prev) => ({
                              ...prev,
                              p_name: e.target.value,
                            }));
                          }}
                        />
                        {pNameValidation.status || (
                          <div className="invalid-feedback d-block">
                            {pNameValidation.message}
                          </div>
                        )}
                      </div>
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">برچسب</span>
                      </InputGroupAddon>
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          value={editData.name}
                          onChange={(e) => {
                            setEditData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                            if (!nameValidationHandler(e.target.value)) return;
                            setEditDataValue((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                          }}
                        />
                        {nameValidation.status || (
                          <div className="invalid-feedback d-block">
                            {nameValidation.message}
                          </div>
                        )}
                      </div>
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
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          value={editData.max_capability}
                          onChange={(e) => {
                            setEditData((prev) => ({
                              ...prev,
                              max_capability: e.target.value,
                            }));
                            if (!maxCapValidationHandler(e.target.value))
                              return;
                            setEditDataValue((prev) => ({
                              ...prev,
                              max_capability: e.target.value,
                            }));
                          }}
                        />
                        {maxCapValidation.status || (
                          <div className="invalid-feedback d-block">
                            {maxCapValidation.message}
                          </div>
                        )}
                      </div>
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm" className="mr-3">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">کد مرچنت</span>
                      </InputGroupAddon>
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          value={editData.merchant_id}
                          onChange={(e) => {
                            setEditData((prev) => ({
                              ...prev,
                              merchant_id: e.target.value,
                            }));
                            if (!merchantIdValidationHandler(e.target.value))
                              return;
                            setEditDataValue((prev) => ({
                              ...prev,
                              merchant_id: e.target.value,
                            }));
                          }}
                        />
                        {merchantIdValidation.status || (
                          <div className="invalid-feedback d-block">
                            {merchantIdValidation.message}
                          </div>
                        )}
                      </div>
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
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          value={editData.call_back_url}
                          onChange={(e) => {
                            setEditData((prev) => ({
                              ...prev,
                              call_back_url: e.target.value,
                            }));
                            if (!url1ValidationHandler(e.target.value)) return;
                            setEditDataValue((prev) => ({
                              ...prev,
                              call_back_url: e.target.value,
                            }));
                          }}
                        />
                        {url1Validation.status || (
                          <div className="invalid-feedback d-block">
                            {url1Validation.message}
                          </div>
                        )}
                      </div>
                    </InputGroup>
                  </div>
                  <div className="d-flex mb-3">
                    <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend">
                        <span className="input-group-text">آدرس بازگشت2</span>
                      </InputGroupAddon>
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          value={editData.call_back_url2}
                          onChange={(e) => {
                            setEditData((prev) => ({
                              ...prev,
                              call_back_url2: e.target.value,
                            }));
                            if (!url2ValidationHandler(e.target.value)) return;
                            setEditDataValue((prev) => ({
                              ...prev,
                              call_back_url2: e.target.value,
                            }));
                          }}
                        />
                        {url2Validation.status || (
                          <div className="invalid-feedback d-block">
                            {url2Validation.message}
                          </div>
                        )}
                      </div>
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
                      <div className="flex-grow-1 pos-rel">
                        <Input
                          type="textarea"
                          rows="5"
                          value={editData.description}
                          onChange={(e) => {
                            setEditData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }));
                            if (!descriptionValidationHandler(e.target.value))
                              return;
                            setEditDataValue((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }));
                          }}
                        />
                        {descriptionValidation.status || (
                          <div className="invalid-feedback d-block">
                            {descriptionValidation.message}
                          </div>
                        )}
                      </div>
                    </InputGroup>
                  </div>
                </ModalBody>
                <ModalFooter className="d-flex flex-row-reverse justify-content-start">
                  <Button
                    color="primary"
                    size="lg"
                    className="mb-2"
                    onClick={() => {
                      if (
                        !descriptionValidation.status ||
                        !url2Validation.status ||
                        !url1Validation.status ||
                        !merchantIdValidation.value ||
                        !maxCapValidation.value ||
                        !bankIdValidation.status ||
                        !nameValidation.status ||
                        !pNameValidation.status
                      )
                        return;
                      saveChangeHandler();
                    }}
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
