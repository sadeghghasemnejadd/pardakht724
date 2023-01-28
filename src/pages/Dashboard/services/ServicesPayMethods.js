import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "components/common/CustomSelectInput";
import Switch from "rc-switch";
import ReactAutoSuggest from "components/common/ReactAutoSuggest";
import "rc-switch/assets/index.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addServicesPayMethods,
  updateServicesPayMethods,
} from "redux-toolkit/ServicesSlice";
import checkUnique from "components/custom/validation/checkUnique";
const ServicesPayMethods = ({
  payMethods,
  fetchPayMethods,
  addModal,
  setModal,
  _payMethods,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [allPayMethods, setAllPayMethods] = useState([]);
  const [payMethodId, setPayMethodId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [payMethodIdValidation, setPayMethodValidation] = useState({
    status: false,
    message: "روش پرداخت اجباری میباشد",
  });
  // آپشن سلکت برای اینپوت سلکت
  const [autoSuggest, setAutoSuggest] = useState("");
  const [addData, setAddData] = useState({
    is_available: false,
    pay_method_id: null,
  });
  const cols = useMemo(
    () => [
      {
        Header: "آیکن",
        accessor: "icon",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <img src={props.value} alt="paymethod-icon" />;
        },
      },
      {
        Header: "نام",
        accessor: "p_name",
        cellClass: "text-muted w-80 text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "وضعیت",
        accessor: "is_available",
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
        Header: "عملیات",
        accessor: "id",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return (
            <div
              className="glyph h5"
              onClick={() => {
                setIsModal(true);
                setPayMethodId(props.value);
                setNameValidation({ status: true, message: "" });
                setMaxCapValidation({ status: true, message: "" });
              }}
              style={{ cursor: "pointer" }}
            >
              <div className={`glyph-icon simple-icon-pencil text-center`} />
            </div>
          );
        },
      },
    ],
    [payMethodId]
  );
  useEffect(() => {
    setAllPayMethods(payMethods);
  }, [payMethods]);
  // اطلاعات اولیه ویرایش دیتا
  useEffect(() => {
    const data = payMethods.find((p) => p.id == payMethodId);
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
  }, [payMethodId]);

  const payMethodIdValidationHandler = (val) => {
    if (_payMethods.some((p) => p.p_name === val)) {
      setPayMethodValidation({
        status: false,
        message: "روش پرداخت انتخاب شده در دیتابیس وجود ندارد",
      });
      return false;
    } else if (checkUnique(payMethods, name, val)) {
      setPayMethodValidation({
        status: false,
        message: "این روش پرداخت از قبل وجود داشت",
      });
      return false;
    } else if (!val) {
      setPayMethodValidation({
        status: false,
        message: "روش پرداخت اجباری میباشد",
      });
      return false;
    } else {
      setPayMethodValidation({ status: true, message: "" });
      return true;
    }
  };
  // تابع هندل کردن ثبت اطلاعات ویرایش دیتا
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(
        updateServicesPayMethods({ id, data: editDataValue, payMethodId })
      );
      if (res.payload.status === "ok") {
        console.log(res);
        setAllPayMethods((prev) =>
          prev.map((p) =>
            p.id === res.payload.pay_method.id
              ? {
                  ...res.payload.pay_method,
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
  const addPayMethodsHandler = async () => {
    try {
      const res = await dispatch(
        addServicesPayMethods({
          id,
          addData,
        })
      );
      if (res.payload) {
        toast.success("روش پرداخت با موفقیت اضافه شد");
        setModal(false);
        await fetchPayMethods();
      } else {
        throw new Error("مقادیر یک یا چند ستون نادرست وارد شده است.");
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };
  return (
    <Card className="p-5">
      {/* مدال اضافه کردن دیتا */}
      <Modal isOpen={addModal} size="lg" toggle={() => setModal(!addModal)}>
        <ModalHeader>ایجاد روش پرداخت جدید</ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <InputGroup size="sm" className="mr-3">
              <InputGroupAddon addonType="prepend" className="w-30">
                <span className="input-group-text w-100">
                  روش پرداخت مورد نظر
                </span>
              </InputGroupAddon>
              <div className="w-70 pos-rel">
                <ReactAutoSuggest
                  AutoSuggest
                  value={autoSuggest}
                  onChange={(val) => {
                    payMethodIdValidationHandler(val);
                    if (_payMethods.some((p) => p.p_name === val)) {
                      console.log("hi");
                      setAddData((prev) => ({
                        ...prev,
                        pay_method_id: _payMethods.find((p) => p.p_name === val)
                          .id,
                      }));
                    }
                    setAutoSuggest(val);
                  }}
                  data={_payMethods.map((payMethod) => ({
                    name: payMethod?.p_name,
                  }))}
                />
                {payMethodIdValidation.status || (
                  <div className="invalid-feedback d-block">
                    {payMethodIdValidation.message}
                  </div>
                )}
              </div>
            </InputGroup>
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 mr-3">وضعیت</p>
            <Switch
              className="custom-switch custom-switch-secondary custom-switch-small"
              onChange={(e) => {
                setAddData((prev) => ({
                  ...prev,
                  is_available: e,
                }));
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter className="d-flex flex-row-reverse justify-content-start">
          <Button
            color="primary"
            size="lg"
            className="mb-2"
            onClick={() => {
              addPayMethodsHandler();
            }}
          >
            ایجاد
          </Button>
          <Button
            color="secondary"
            size="lg"
            className="mb-2"
            onClick={() => setModal(false)}
          >
            لغو
          </Button>
        </ModalFooter>
      </Modal>
      {/* مدال ویرایش کردن دیتا */}
      {/* <Modal isOpen={isModal} size="lg" toggle={() => setIsModal(!isModal)}>
        <ModalHeader>ویرایش</ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <InputGroup size="sm" className="mr-3">
              <InputGroupAddon addonType="prepend" className="w-30">
                <span className="input-group-text w-100">بانک مورد نظر</span>
              </InputGroupAddon>
              <div className="w-70 pos-rel">
                <ReactAutoSuggest
                  AutoSuggest
                  value={autoSuggest}
                  onChange={(val) => {
                    if (!bankIdValidationHandler(val)) return;
                    setAutoSuggest(val);
                  }}
                  data={[...new Set(payMethods.map((pay) => pay.bank?.name))]
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
                <span className="input-group-text w-100">صاحب حساب</span>
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
                    if (!maxCapValidationHandler(e.target.value)) return;
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
                    if (!merchantIdValidationHandler(e.target.value)) return;
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
                    if (!descriptionValidationHandler(e.target.value)) return;
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
                !merchantIdValidation.status ||
                !maxCapValidation.status ||
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
            onClick={() => setIsModal(false)}
          >
            لغو
          </Button>
        </ModalFooter>
      </Modal> */}
      <Table cols={cols} data={allPayMethods} />
    </Card>
  );
};
export default ServicesPayMethods;
