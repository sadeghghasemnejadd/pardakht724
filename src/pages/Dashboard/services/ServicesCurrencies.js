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
import Switch from "rc-switch";
import ReactAutoSuggest from "components/common/ReactAutoSuggest";
import "rc-switch/assets/index.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addServicesCurrencies,
  updateServicesCurrencies,
} from "redux-toolkit/ServicesSlice";
const ServicesCurrencies = ({
  currencies,
  fetchCurrencies,
  currenciesData,
  addModal,
  setModal,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState("");
  const [addData, setAddData] = useState({
    is_available: false,
    currency_id: null,
    priority: null,
    should_pass_on_low_amount: false,
  });
  const cols = useMemo(
    () => [
      {
        Header: "آیکن",
        accessor: "icon",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <img src={props.value} alt="currency-icon" />;
        },
      },
      {
        Header: "ارز",
        accessor: "name",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "اولویت",
        accessor: "priority",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "استفاده از ارز واسط",
        accessor: "should_pass_on_low_amount",
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
        Header: "عملیات",
        accessor: "id",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return (
            <div
              className="glyph h5"
              onClick={() => {
                setIsModal(true);
                setCurrencyId(props.value);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className={`glyph-icon simple-icon-pencil text-center`} />
            </div>
          );
        },
      },
    ],
    [currencyId]
  );
  useEffect(() => {
    setAllCurrencies(currencies);
  }, [currencies]);
  useEffect(() => {
    const data = currencies?.find((p) => p.id == currencyId);
    if (!data) return;
    setEditData({
      category_id: data?.category_id,
      priority: data?.priority === null ? "" : data.priority,
      is_available: data?.is_available,
      should_pass_on_low_amount: data?.should_pass_on_low_amount,
    });
  }, [currencyId]);
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(
        updateServicesCurrencies({ id, data: { ...editDataValue }, currencyId })
      );
      if (res.payload.status === "ok") {
        setAllCurrencies((prev) =>
          prev.map((p) =>
            p.id === res.payload.currency.id ? res.payload.currency : p
          )
        );
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal(false);
        setEditDataValue({});
      }
    } catch (err) {
      toast.error("ویرایش ارز با خطا روبرو شد");
      throw err;
    }
  };
  const addCurrencyHandler = async () => {
    try {
      const res = await dispatch(
        addServicesCurrencies({
          id,
          addData: {
            ...addData,
            currency_id: currenciesData.find((c) => c.name == autoSuggest).id,
          },
        })
      );
      if (res.payload) {
        toast.success("ارز با موفقیت اضافه شد");
        setModal(false);
        await fetchCurrencies();
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
      <Modal
        isOpen={addModal}
        size="lg"
        toggle={() => {
          setModal(!addModal);
        }}
      >
        <ModalHeader>ایجاد ارز جدید</ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend" className="w-10">
                <span className="input-group-text w-100">انتخاب ارز</span>
              </InputGroupAddon>
              <div className="w-90">
                <ReactAutoSuggest
                  AutoSuggest
                  value={autoSuggest}
                  onChange={(val) => {
                    setAutoSuggest(val);
                  }}
                  data={[...new Set(currenciesData.map((c) => c.name))]
                    .filter((n) => n)
                    .map((n) => ({ name: n }))}
                />
              </div>
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">اولویت</span>
              </InputGroupAddon>
              <Input
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-center">
              <p className="mr-3">استفاده از ارز واسط</p>
              <Switch
                className="custom-switch custom-switch-secondary custom-switch-small"
                onChange={(e) =>
                  setAddData((prev) => ({
                    ...prev,
                    should_pass_on_low_amount: e,
                  }))
                }
              />
            </div>
            <div className="d-flex justify-content-center">
              <p className="mr-3">وضعیت</p>
              <Switch
                className="custom-switch custom-switch-secondary custom-switch-small"
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, is_available: e }))
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
            onClick={() => {
              addCurrencyHandler();
            }}
          >
            ذخیره
          </Button>
          <Button
            color="secondary"
            size="lg"
            className="mb-2"
            onClick={() => {
              setModal(false);
            }}
          >
            لغو
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={isModal}
        size="lg"
        toggle={() => {
          setIsModal(!isModal);
        }}
      >
        <ModalHeader>ویرایش</ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend" className="w-10">
                <span className="input-group-text w-100">انتخاب ارز</span>
              </InputGroupAddon>
              <div className="w-90">
                <ReactAutoSuggest
                  AutoSuggest
                  value={autoSuggest}
                  onChange={(val) => {
                    setAutoSuggest(val);
                    if (currenciesData.some((c) => c.name === val)) {
                      setEditDataValue((prev) => ({
                        ...prev,
                        currency_id: currenciesData.find((c) => c.name === val)
                          .id,
                      }));
                    }
                  }}
                  data={[...new Set(currenciesData.map((c) => c.name))]
                    .filter((n) => n)
                    .map((n) => ({ name: n }))}
                />
              </div>
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">اولویت</span>
              </InputGroupAddon>
              <Input
                value={editData?.priority}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-center">
              <p className="mr-3">استفاده از ارز واسط</p>
              <Switch
                className="custom-switch custom-switch-secondary custom-switch-small"
                value={editData?.should_pass_on_low_amount}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    should_pass_on_low_amount: e,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    should_pass_on_low_amount: e,
                  }));
                }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <p className="mr-3">وضعیت</p>
              <Switch
                className="custom-switch custom-switch-secondary custom-switch-small"
                value={editData?.is_available}
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
            onClick={() => {
              setIsModal(false);
            }}
          >
            لغو
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Table cols={cols} data={allCurrencies} />
    </Card>
  );
};
export default ServicesCurrencies;
