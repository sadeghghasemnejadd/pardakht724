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
// import {
//   addServicesPlans,
//   updateServicesPlans,
// } from "redux-toolkit/ServicesSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { removeServicesCategory } from "redux-toolkit/ServicesSlice";
const ServicesCategories = ({
  categories,
  fetchCategories,
  addModal,
  setModal,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState("");
  const [addData, setAddData] = useState({
    category_id: null,
    is_active: false,
  });

  const cols = useMemo(
    () => [
      {
        Header: "نام دسته بندی",
        accessor: "name",
        cellClass: "text-muted w-80 text-center",
        Cell: (props) => {
          return <>{props.value}</>;
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
        Header: "عملیات",
        accessor: "id",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return (
            <div className="d-flex justify-content-center">
              <div
                className="glyph h5 mr-3"
                onClick={() => {
                  removeCategoryHandler(props.value);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className={`glyph-icon simple-icon-trash text-center`} />
              </div>
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
            </div>
          );
        },
      },
    ],
    [categoryId]
  );
  useEffect(() => {
    setAllCategories(categories);
  }, [categories]);
  useEffect(() => {
    const data = categories.find((p) => p.id == categoryId);
    if (!data) return;
    setEditData({
      categoryId: data?.categoryId === null ? "" : data.categoryId,
      is_active: data?.is_active,
    });
  }, [categoryId]);
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
  const removeCategoryHandler = async () => {
    try {
      const res = await dispatch(
        removeServicesCategory({ id, catId: categoryId })
      );
      if (res.payload) {
        toast.success("دسته بندی با موفقیت حذف شد");
      }
    } catch (err) {
      toast.error("حذف دسته بندی با خطا مواجه شد");
      throw err;
    }
  };
  return (
    <Card className="p-5">
      {/* <Modal
        isOpen={addModal}
        size="lg"
        toggle={() => {
          setModal(!addModal);
        }}
      >
        <ModalHeader>ایجاد دسته بندی جدید</ModalHeader>
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
          </div>
          <div className="d-flex mb-3">
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend" className="w-30">
                <span className="input-group-text w-100">انتخاب خدمت</span>
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
      </Modal> */}
      {/* <Modal
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
      </Modal>  */}
      <Table cols={cols} data={allCategories} />
    </Card>
  );
};
export default ServicesCategories;
