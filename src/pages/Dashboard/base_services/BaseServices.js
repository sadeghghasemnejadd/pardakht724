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
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import "rc-switch/assets/index.css";
import Switch from "rc-switch";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBaseServices,
  searchBaseServices,
} from "redux-toolkit/BaseServiceSlice";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLayout from "containers/ui/headerLayout";
const BaseServices = () => {
  const dispatch = useDispatch();
  const { loading, allBaseServices } = useSelector(
    (store) => store.baseServices
  );
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState();
  const [id, setId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [addData, setAddData] = useState({
    name: "",
    class_name: "",
    execution_type: 0,
    service_type: 1,
    factor_creation_type: 0,
    route: 0,
    is_active: 1,
  });
  const [collapseData, setCollapseData] = useState([
    { type: "twoLine", value: {} },
  ]);
  const history = useHistory();
  const match = [
    {
      path: "/",
      text: "خدمات",
    },
    {
      path: history.location.pathname,
      text: "محصولات پایه",
    },
  ];
  const cols = useMemo(
    () => [
      {
        Header: "نام",
        accessor: "name",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },

      {
        Header: "نوع سرویس",
        accessor: "services_type",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => {
          return (
            <>
              {props.value == 1
                ? "خرید"
                : props.value == 2
                ? "فروش"
                : props.value == 3
                ? "شارژ حساب"
                : "افتتاح حساب"}
            </>
          );
        },
      },
      {
        Header: "نوع پردازش",
        accessor: "execution_type",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>{props.value == 0 ? "دستی" : "خودکار"}</>;
        },
      },
      {
        Header: "نوع صدور فاکتور",
        accessor: "factor_creation_type",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <>{props.value == 0 ? "دستی" : "خودکار"}</>;
        },
      },
      {
        Header: "ارزها",
        accessor: "currencies",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>{props.value[0]?.name}</>;
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
      },

      {
        Header: "بیشتر",
        accessor: "collapseData",
        cellClass: "text-muted text-center ",
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
                  setCollapseData([{ type: "twoLine", value: props.value }]);
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
      },
      {
        Header: "عملیات",
        accessor: "id",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return (
            <div
              className="glyph h5"
              // onClick={() => {
              //   setId(props.value);
              //   setIsModal(true);
              // }}
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
    fetchBaseServices();
  }, [fetchBaseServices]);
  // useEffect(() => {
  //   const data = allTasks.find((p) => p.id == id);
  //   if (!data) return;
  //   setEditData({
  //     type: data?.type === null ? "" : data.type,
  //     name: data?.name === null ? "" : data.name,
  //     description: data?.description === null ? "" : data.description,
  //     refer_to: data?.refer_to === null ? "" : data.refer_to,
  //     max_due_date: data?.max_due_date === null ? "" : data.max_due_date,
  //     priority: data?.priority === null ? "" : data.priority,
  //   });
  // }, [id]);

  const fetchBaseServices = async () => {
    try {
      await dispatch(getAllBaseServices());
    } catch (err) {
      throw err;
    }
  };
  const searchHandler = async (e) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=name:${searchInput}`;
      await dispatch(searchBaseServices(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(updateTasks({ id, data: editDataValue }));
      if (res.payload.status === "ok") {
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal(false);
        setEditDataValue({});
        await fetchTasks();
      }
    } catch (err) {
      toast.error("ویرایش دسترسی با خطا روبرو شد");
      throw err;
    }
  };
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <Colxx lg="12" xl="12">
          <Card className="mb-4 p-5">
            <HeaderLayout
              title="لیست سرویس های پایه"
              addName="افزودن سرویس جدید"
              onSearch={searchHandler}
              hasSearch={true}
              searchInputRef={searchInputRef}
              onAdd={() => {
                setIsModal(true);
              }}
              searchOptions={[
                {
                  id: 0,
                  name: "سرچ در نام",
                },
              ]}
              match={match}
            />
            <Table
              cols={cols}
              data={allBaseServices}
              isCollapse={collapse}
              collapseData={collapseData}
            />
            <Modal
              isOpen={isModal}
              size="lg"
              toggle={() => setIsModal(!isModal)}
            >
              <ModalHeader>ایجاد سرویس پایه جدید</ModalHeader>
              <ModalBody>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">نام</span>
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
                <div className="d-flex mb-3 justify-content-between ">
                  <div className="d-flex align-items-center">
                    <p className="mr-2 mb-0">نوع سرویس :</p>
                    <Input
                      bsSize="sm"
                      className="w-50 min-h-15"
                      type="select"
                      style={{ borderRadius: 20 }}
                      onChange={(e) =>
                        setAddData((prev) => ({
                          ...prev,
                          service_type: e.target.value,
                        }))
                      }
                    >
                      <option value={1}>خرید</option>
                      <option value={2}>فروش</option>
                      <option value={3}>شارژ حساب</option>
                      <option value={4}>افتتاح حساب</option>
                    </Input>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="mr-2 mb-0">نوع پردازش :</p>
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
                      <option value={0}>دستی</option>
                      <option value={1}>خودکار</option>
                    </Input>
                  </div>
                  <div className="d-flex align-items-center w-30">
                    <p className="mr-2 mb-0">نوع صدور فاکتور :</p>
                    <Input
                      bsSize="sm"
                      className="w-40 min-h-15"
                      type="select"
                      style={{ borderRadius: 20 }}
                      onChange={(e) =>
                        setAddData((prev) => ({
                          ...prev,
                          factor_creation_type: e.target.value,
                        }))
                      }
                    >
                      <option value={0}>دستی</option>
                      <option value={1}>خودکار</option>
                    </Input>
                  </div>
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
                      <span className="input-group-text">ارجاع</span>
                    </InputGroupAddon>
                    <Input
                      value={editData.refer_to}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          refer_to: e.target.value,
                        }));
                        setEditDataValue((prev) => ({
                          ...prev,
                          refer_to: e.target.value,
                        }));
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm" className="mr-3">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اولویت</span>
                    </InputGroupAddon>
                    <Input
                      value={editData.priority}
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
                  <InputGroup size="sm" className="">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">
                        حداکثر زمان انجام
                      </span>
                    </InputGroupAddon>
                    <Input
                      value={editData.max_due_date}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          max_due_date: e.target.value,
                        }));
                        setEditDataValue((prev) => ({
                          ...prev,
                          max_due_date: e.target.value,
                        }));
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">نوع</span>
                    </InputGroupAddon>
                    <Input
                      value={editData.type}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }));
                        setEditDataValue((prev) => ({
                          ...prev,
                          type: e.target.value,
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
                  onClick={() => {
                    setIsModal(false);
                  }}
                >
                  لغو
                </Button>{" "}
              </ModalFooter>
            </Modal> */}
          </Card>
        </Colxx>
      )}
    </Layout>
  );
};
export default BaseServices;
