import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Layout from "layout/AppLayout";
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
import { Colxx } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllPermissions,
//   updatePermissions,
//   searchPermissions,
//   addPermissions,
// } from "redux-toolkit/permissionsSlice";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const ServicesPlans = ({ plans, fetchPlans }) => {
  const dispatch = useDispatch();
  const [allPlans, setAllPlans] = useState([]);
  const [collapse, setCollapse] = useState([]);
  const [id, setId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
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
  const history = useHistory();
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
                setId(props.value);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className={`glyph-icon simple-icon-pencil text-center`} />
            </div>
          );
        },
      },
    ],
    [collapse, id]
  );
  useEffect(() => {
    setAllPlans(plans);
  }, [plans]);
  useEffect(() => {
    const data = plans.find((p) => p.id == id);
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
  }, [id]);
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(updatePlans({ id, data: editDataValue }));
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
      const res = await dispatch(addPlans(addData));
      if (res.payload) {
        toast.success("پلن با موفقیت اضافه شد");
        setIsModal2(false);
        await fetchPlans();
      } else {
        throw new Error("مقادیر یک یا چند ستون نادرست وارد شده است.");
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };
  {
    /* <Modal
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
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        value={editData.p_name}
                        onChange={(e) => {
                          if (!e.target.value) {
                            setPNameValidation({
                              status: true,
                              message: "",
                            });
                          } else {
                            setPNameValidation({
                              status: checkPersian(e.target.value),
                              message: "نام باید فارسی باشد",
                            });
                          }
                          if (checkCountCharacters(e.target.value, 125)) {
                            setPNameValidation({
                              status: false,
                              message: "نام نباید بیتشر از 125 کاراکتر باشد",
                            });
                            return;
                          }
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
                      {pNameValidation.status || (
                        <div className="invalid-feedback d-block">
                          {pNameValidation.message}
                        </div>
                      )}
                    </div>
                  </InputGroup>
                  <InputGroup size="sm" className="">
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
                          if (checkCountCharacters(e.target.value, 500)) {
                            setDescriptionVAlidation({
                              status: false,
                              message:
                                "تعداد کاراکتر توضیحات نباید بیشتر از 500 کاراکتر باشد.",
                            });
                            return;
                          } else {
                            setDescriptionVAlidation({
                              status: true,
                              message: "",
                            });
                          }
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
                      !pNameValidation.status ||
                      !descriptionValidation.status
                    ) {
                      return;
                    }
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
            <Modal
              isOpen={isModal2}
              size="lg"
              toggle={() => {
                setIsModal2(!isModal2);
              }}
            >
              <ModalHeader>ایجاد دسترسی جدید</ModalHeader>
              <ModalBody>
                <div className="d-flex mb-3">
                  <InputGroup size="sm" className="mr-3">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">نام</span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        onChange={(e) => {
                          if (!e.target.value) {
                            setPNameValidation({
                              status: true,
                              message: "",
                            });
                          } else {
                            setPNameValidation({
                              status: checkPersian(e.target.value),
                              message: "نام باید فارسی باشد",
                            });
                          }
                          if (checkCountCharacters(e.target.value, 125)) {
                            setPNameValidation({
                              status: false,
                              message: "نام نباید بیتشر از 125 کاراکتر باشد",
                            });
                            return;
                          }
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
                  <InputGroup size="sm" className="">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">برچسب</span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        onChange={(e) => {
                          if (!e.target.value) {
                            setNameValidation({
                              status: false,
                              message: "برچسب نباید خالی باشد",
                            });
                            return;
                          } else if (
                            checkUnique(permissions, "name", e.target.value)
                          ) {
                            setNameValidation({
                              status: false,
                              message: " برچسب باید یکتا باشد",
                            });
                            return;
                          } else {
                            setNameValidation({
                              status: true,
                              message: "",
                            });
                          }
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
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">توضیحات</span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        type="textarea"
                        rows="5"
                        onChange={(e) => {
                          if (checkCountCharacters(e.target.value, 500)) {
                            setDescriptionVAlidation({
                              status: false,
                              message:
                                "تعداد کاراکتر توضیحات نباید بیشتر از 500 کاراکتر باشد.",
                            });
                            return;
                          } else {
                            setDescriptionVAlidation({
                              status: true,
                              message: "",
                            });
                          }
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
                      !pNameValidation.status ||
                      !descriptionValidation.status ||
                      !nameValidation.status
                    ) {
                      return;
                    }
                    addPermissionHandler();
                  }}
                >
                  ذخیره
                </Button>
                <Button
                  color="secondary"
                  size="lg"
                  className="mb-2"
                  onClick={() => {
                    setIsModal2(false);
                  }}
                >
                  لغو
                </Button>{" "}
              </ModalFooter>
            </Modal> */
  }

  return (
    <Card className="p-5">
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
