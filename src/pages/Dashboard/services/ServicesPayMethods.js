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
      is_available: data?.is_available,
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
      <Modal isOpen={isModal} size="lg" toggle={() => setIsModal(!isModal)}>
        <ModalHeader>ویراش روش پرداخت</ModalHeader>
        <ModalBody>
          <div className="d-flex align-items-center">
            <p className="mb-0 mr-3">وضعیت</p>
            <Switch
              className="custom-switch custom-switch-secondary custom-switch-small"
              checked={editData?.is_available}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  is_available: e,
                }));
                setEditDataValue((prev) => ({
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
              saveChangeHandler();
            }}
          >
            ویرایش
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
      <Table cols={cols} data={allPayMethods} />
    </Card>
  );
};
export default ServicesPayMethods;
