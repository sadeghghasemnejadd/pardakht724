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
import ReactAutoSuggest from "components/common/ReactAutoSuggest";
import { Colxx } from "components/common/CustomBootstrap";
import "rc-switch/assets/index.css";
import Switch from "rc-switch";
import { useSelector, useDispatch } from "react-redux";
import {
  addBaseService,
  getAllBaseServices,
  getAllCurrencies,
  searchBaseServices,
  updateBaseService,
} from "redux-toolkit/BaseServiceSlice";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLayout from "containers/ui/headerLayout";
const BaseServices = () => {
  const dispatch = useDispatch();
  const { loading, allBaseServices, allCurrencies } = useSelector(
    (store) => store.baseServices
  );
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState();
  const [id, setId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState("");
  const [addData, setAddData] = useState({
    name: "",
    class_name: "",
    route_name: "",
    execution_type: 0,
    service_type: 1,
    factor_creation_type: 0,
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
          if (!props.value) return <></>;
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
              onClick={() => {
                setId(props.value);
                setIsModal2(true);
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
    fetchBaseServices();
    fetchCurrencies();
  }, [fetchBaseServices]);
  useEffect(() => {
    const data = allBaseServices.find((p) => p.id == id);
    if (!data) return;
    setCurrencies(data.currencies);
    setEditData({
      name: data?.name === null ? "" : data.name,
      class_name: data?.class_name === null ? "" : data.class_name,
      is_active: data?.is_active === null ? 0 : data.is_active,
      service_type: data?.service_type === null ? 0 : data.service_type,
      execution_type: data?.execution_type === null ? 0 : data.execution_type,
      factor_creation_type:
        data?.factor_creation_type === null ? 0 : data.factor_creation_type,
      route_name: data?.route_name === null ? "" : data.route_name,
    });
  }, [id]);

  const fetchBaseServices = async () => {
    try {
      await dispatch(getAllBaseServices());
    } catch (err) {
      throw err;
    }
  };
  const fetchCurrencies = async () => {
    try {
      await dispatch(getAllCurrencies());
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
  const addBaseServicesandler = async () => {
    try {
      if (addData.name.length > 127) {
        throw new Error("نام حداکثر باید 127 کارکتر باشد");
      }
      if (addData.class_name.length > 255) {
        throw new Error(" کلاس حداکثر باید 255 کارکتر باشد");
      }
      if (addData.route_name.length > 255) {
        throw new Error(" مسیر حداکثر باید 255 کارکتر باشد");
      }
      const res = await dispatch(addBaseService({ ...addData, currencies }));
      if (res.payload.status === "ok") {
        toast.success("خدمت با موفقیت اضافه شد");
        await fetchBaseServices();
        isModal(false);
        setCurrencies([]);
      }
    } catch (err) {
      toast.error(err);
      throw err;
    }
  };
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(
        updateBaseService({ id, data: editDataValue })
      );
      if (res.payload.status === "ok") {
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal2(false);
        setEditDataValue({});
        setCurrencies([]);
        await fetchBaseServices();
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
                <div className="d-flex mb-5 justify-content-between ">
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
                <div className="mb-3 d-flex">
                  <div className="mr-3 w-80 d-flex">
                    <p className="mr-2">ارز ها:</p>
                    <div className="w-60 mr-2 custom_flex">
                      {currencies.map((c) => (
                        <div key={c.id} className="d-flex">
                          <p className="mr-2">{c.name}</p>
                          <div
                            className="glyph h5"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setCurrencies((prev) =>
                                prev.filter((p) => p.id !== c.id)
                              );
                            }}
                          >
                            <div
                              className={`glyph-icon simple-icon-close text-center`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      color="primary"
                      size="xs"
                      className="align-self-start"
                      onClick={() => {
                        setIsModal3(true);
                      }}
                    >
                      افزودن ارز جدید
                    </Button>
                  </div>
                  <div className="d-flex">
                    <p className="mr-2">وضعیت</p>
                    <Switch
                      className="custom-switch custom-switch-secondary custom-switch-small"
                      onChange={(e) => {
                        setAddData((prev) => ({ ...prev, is_active: e }));
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اسم کلاس</span>
                    </InputGroupAddon>
                    <Input
                      onChange={(e) =>
                        setAddData((prev) => ({
                          ...prev,
                          class_name: e.target.value,
                        }))
                      }
                    />
                  </InputGroup>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اسم مسیر</span>
                    </InputGroupAddon>
                    <Input
                      onChange={(e) =>
                        setAddData((prev) => ({
                          ...prev,
                          route_name: e.target.value,
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
                  onClick={addBaseServicesandler}
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
              isOpen={isModal3}
              size="sm"
              toggle={() => setIsModal3(!isModal3)}
            >
              <ModalHeader>افزودن ارز جدید</ModalHeader>
              <ModalBody>
                <ReactAutoSuggest
                  AutoSuggest
                  value={autoSuggest}
                  onChange={(val) => {
                    setAutoSuggest(val);
                  }}
                  data={allCurrencies.map((c) => ({ name: c.name }))}
                />
              </ModalBody>
              <ModalFooter className="d-flex flex-row-reverse justify-content-start">
                <Button
                  color="primary"
                  size="lg"
                  className="mb-2"
                  onClick={() => {
                    setCurrencies((prev) => {
                      if (currencies.some((c) => c.name === autoSuggest)) {
                        return prev;
                      }
                      return [
                        ...prev,
                        allCurrencies.find((c) => c.name === autoSuggest),
                      ];
                    });
                    setIsModal3(false);
                    setAutoSuggest("");
                  }}
                >
                  افزودن
                </Button>
                <Button
                  color="secondary"
                  size="lg"
                  className="mb-2"
                  onClick={() => setIsModal3(false)}
                >
                  لغو
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              isOpen={isModal2}
              size="lg"
              toggle={() => {
                setIsModal2(!isModal2);
              }}
            >
              <ModalHeader>ویرایش</ModalHeader>
              <ModalBody>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
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
                </div>
                <div className="d-flex mb-5 justify-content-between ">
                  <div className="d-flex align-items-center">
                    <p className="mr-2 mb-0">نوع سرویس :</p>
                    <Input
                      bsSize="sm"
                      className="w-50 min-h-15"
                      type="select"
                      style={{ borderRadius: 20 }}
                      value={editData.service_type}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          service_type: e.target.value,
                        }));
                        setEditDataValue((prev) => ({
                          ...prev,
                          service_type: e.target.value,
                        }));
                      }}
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
                      value={editData.factor_creation_type}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          factor_creation_type: e.target.value,
                        }));
                        setEditDataValue((prev) => ({
                          ...prev,
                          factor_creation_type: e.target.value,
                        }));
                      }}
                    >
                      <option value={0}>دستی</option>
                      <option value={1}>خودکار</option>
                    </Input>
                  </div>
                </div>
                <div className="mb-3 d-flex">
                  <div className="mr-3 w-80 d-flex">
                    <p className="mr-2">ارز ها:</p>
                    <div className="w-60 mr-2 custom_flex">
                      {currencies.map((c) => (
                        <div key={c.id} className="d-flex">
                          <p className="mr-2">{c.name}</p>
                          <div
                            className="glyph h5"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setCurrencies((prev) =>
                                prev.filter((p) => p.id !== c.id)
                              );
                            }}
                          >
                            <div
                              className={`glyph-icon simple-icon-close text-center`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      color="primary"
                      size="xs"
                      className="align-self-start"
                      onClick={() => {
                        setIsModal3(true);
                      }}
                    >
                      افزودن ارز جدید
                    </Button>
                  </div>
                  <div className="d-flex">
                    <p className="mr-2">وضعیت</p>
                    <Switch
                      className="custom-switch custom-switch-secondary custom-switch-small"
                      onChange={(e) => {
                        setAddData((prev) => ({ ...prev, is_active: e }));
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اسم کلاس</span>
                    </InputGroupAddon>
                    <Input
                      value={editData.class_name}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          class_name: e.target.value,
                        }));
                        setEditDataValue((prev) => ({
                          ...prev,
                          class_name: e.target.value,
                        }));
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اسم مسیر</span>
                    </InputGroupAddon>
                    <Input
                      value={editData.route_name}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          route_name: e.target.value,
                        }));
                        setEditDataValue((prev) => ({
                          ...prev,
                          route_name: e.target.value,
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
                    setIsModal2(false);
                  }}
                >
                  لغو
                </Button>{" "}
              </ModalFooter>
            </Modal>
          </Card>
        </Colxx>
      )}
    </Layout>
  );
};
export default BaseServices;
