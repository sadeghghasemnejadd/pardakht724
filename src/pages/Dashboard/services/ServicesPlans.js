import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  addServicesPlans,
  updateServicesPlans,
} from "redux-toolkit/ServicesSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ServicesPlans = ({
  plans,
  fetchPlans,
  addModal,
  setModal,
  currencies,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [allPlans, setAllPlans] = useState([]);
  const [collapse, setCollapse] = useState([]);
  const [planId, setPlanId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState("");
  const [addData, setAddData] = useState({
    name: "",
    en_name: "",
    description: "",
    amount: null,
    currency_id: null,
    min_amount: null,
    max_amount: null,
    is_fee_percentage: 0,
    order_fee: null,
    is_active: false,
  });
  const [collapseData, setCollapseData] = useState([
    { type: "textarea", value: [] },
  ]);
  const cols = useMemo(
    () => [
      {
        Header: "اسم",
        accessor: "name",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "Name En",
        accessor: "en_name",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "مقدار ارز",
        accessor: "amount",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "حداقل مقدار",
        accessor: "min_amount",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "حداکثر مقدار",
        accessor: "max_amount",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "ارز پایه",
        accessor: "currency",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return <>{props.value.name}</>;
        },
      },
      {
        Header: "نوع فی",
        accessor: "is_fee_percentage",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return <>{props.value == 0 ? "درصدی" : "عددی"}</>;
        },
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
        Header: "بیشتر",
        accessor: "description",
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
                      p.type === "textarea"
                        ? {
                            type: "textarea",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value },
                                ],
                          }
                        : p
                    )
                  );
                }}
              >
                <div
                  className={`glyph-icon iconsminds-arrow-${
                    collapse.some((c) => c === props.row.id) ? "up" : "down"
                  }-in-circle`}
                />
              </div>
            </>
          );
        },
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
                setPlanId(props.value);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className={`glyph-icon simple-icon-pencil text-center`} />
            </div>
          );
        },
      },
    ],
    [collapse, planId]
  );
  useEffect(() => {
    setAllPlans(plans);
  }, [plans]);
  useEffect(() => {
    const data = plans.find((p) => p.id == planId);
    if (!data) return;
    setEditData({
      en_name: data?.en_name === null ? "" : data.en_name,
      name: data?.name === null ? "" : data.name,
      description: data?.description === null ? "" : data.description,
      amount: data?.amount === null ? "" : data.amount,
      currency_id: data?.currency_id === null ? "" : data.currency_id,
      min_amount: data?.min_amount === null ? "" : data.min_amount,
      max_amount: data?.max_amount === null ? "" : data.max_amount,
      order_fee: data?.order_fee === null ? "" : data.order_fee,
      is_fee_percentage: data?.is_fee_percentage,
      is_active: data?.is_active,
    });
  }, [planId]);
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(
        updateServicesPlans({ id, data: editDataValue, planId })
      );
      if (res.payload.status === "ok") {
        setAllPlans((prev) =>
          prev.map((p) => (p.id === res.payload.plan.id ? res.payload.plan : p))
        );
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal(false);
        setEditDataValue({});
      }
    } catch (err) {
      toast.error("ویرایش پلن با خطا روبرو شد");
      throw err;
    }
  };
  const addPlansHandler = async () => {
    try {
      const res = await dispatch(
        addServicesPlans({
          id,
          addData: {
            ...addData,
            currency_id: currencies.find((c) => c.name == autoSuggest).id,
          },
        })
      );
      if (res.payload) {
        toast.success("پلن با موفقیت اضافه شد");
        setModal(false);
        await fetchPlans();
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
        <ModalHeader>ایجاد پلن جدید</ModalHeader>
        <ModalBody>
          <div className="d-flex mb-3">
            <InputGroup size="sm" className="mr-3">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">نام</span>
              </InputGroupAddon>
              <Input
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </InputGroup>
            <InputGroup size="sm" className="">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">نام انگلیسی</span>
              </InputGroupAddon>
              <Input
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    en_name: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">توضیحات</span>
              </InputGroupAddon>
              <Input
                type="textarea"
                rows="5"
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <InputGroup size="sm" className="mr-3">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">مقدار</span>
              </InputGroupAddon>
              <Input
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }));
                }}
              />
            </InputGroup>
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend" className="w-30">
                <span className="input-group-text w-100">
                  انتخاب ارز مربوط به پلن
                </span>
              </InputGroupAddon>
              <div className="w-70">
                <ReactAutoSuggest
                  AutoSuggest
                  value={autoSuggest}
                  onChange={(val) => {
                    setAutoSuggest(val);
                  }}
                  data={[...new Set(currencies.map((c) => c.name))]
                    .filter((n) => n)
                    .map((n) => ({ name: n }))}
                />
              </div>
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <InputGroup size="sm" className="mr-3">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">حداقل مقدار</span>
              </InputGroupAddon>
              <Input
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    min_amount: e.target.value,
                  }));
                }}
              />
            </InputGroup>
            <InputGroup size="sm" className="">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">حداکثر مقدار</span>
              </InputGroupAddon>
              <Input
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    max_amount: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <div className="d-flex align-items-center w-50 mr-3">
              <p className="mr-2 mb-0">نوع کارمزد :</p>
              <Input
                bsSize="sm"
                className="w-50 min-h-15"
                type="select"
                style={{ borderRadius: 20 }}
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    is_fee_percentage: e.target.value,
                  }));
                }}
              >
                <option value={1}>درصدی</option>
                <option value={0}>عددی</option>
              </Input>
            </div>
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">مقدار کارمزد</span>
              </InputGroupAddon>
              <Input
                onChange={(e) => {
                  setAddData((prev) => ({
                    ...prev,
                    order_fee: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-center">
              <p className="mr-3">وضعیت</p>
              <Switch
                className="custom-switch custom-switch-secondary custom-switch-small"
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, is_active: e }))
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
              addPlansHandler();
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
            <InputGroup size="sm" className="mr-3">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">نام</span>
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
                <span className="input-group-text">نام انگلیسی</span>
              </InputGroupAddon>
              <Input
                value={editData.en_name}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    en_name: e.target.value,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    en_name: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
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
          <div className="d-flex mb-3">
            <InputGroup size="sm" className="mr-3">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">مقدار</span>
              </InputGroupAddon>
              <Input
                value={editData.amount}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }));
                }}
              />
            </InputGroup>
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend" className="w-30">
                <span className="input-group-text w-100">
                  انتخاب ارز مربوط به پلن
                </span>
              </InputGroupAddon>
              <div className="w-70">
                <ReactAutoSuggest
                  AutoSuggest
                  value={autoSuggest}
                  onChange={(val) => {
                    setAutoSuggest(val);
                  }}
                  data={[...new Set(currencies.map((c) => c.name))]
                    .filter((n) => n)
                    .map((n) => ({ name: n }))}
                />
              </div>
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <InputGroup size="sm" className="mr-3">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">حداقل مقدار</span>
              </InputGroupAddon>
              <Input
                value={editData.min_amount}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    min_amount: e.target.value,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    min_amount: e.target.value,
                  }));
                }}
              />
            </InputGroup>
            <InputGroup size="sm" className="">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">حداکثر مقدار</span>
              </InputGroupAddon>
              <Input
                value={editData.max_amount}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    max_amount: e.target.value,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    max_amount: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex mb-3">
            <div className="d-flex align-items-center w-50 mr-3">
              <p className="mr-2 mb-0">نوع کارمزد :</p>
              <Input
                bsSize="sm"
                className="w-50 min-h-15"
                type="select"
                style={{ borderRadius: 20 }}
                value={editData.is_fee_percentage}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    is_fee_percentage: e.target.value,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    is_fee_percentage: e.target.value,
                  }));
                }}
              >
                <option value={1}>درصدی</option>
                <option value={0}>عددی</option>
              </Input>
            </div>
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">
                <span className="input-group-text">مقدار کارمزد</span>
              </InputGroupAddon>
              <Input
                value={editData.order_fee}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    order_fee: e.target.value,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    order_fee: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-center">
              <p className="mr-3">وضعیت</p>
              <Switch
                className="custom-switch custom-switch-secondary custom-switch-small"
                checked={editData.is_active}
                onChange={(e) => {
                  setEditData((prev) => ({
                    ...prev,
                    is_active: e,
                  }));
                  setEditDataValue((prev) => ({
                    ...prev,
                    is_active: e,
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
      <Table
        cols={cols}
        data={allPlans}
        isCollapse={collapse}
        collapseData={collapseData}
      />
    </Card>
  );
};
export default ServicesPlans;
