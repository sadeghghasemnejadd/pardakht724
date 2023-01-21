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
import Validation from "containers/ui/validation";
import checkPersian from "components/custom/validation/checkPersian";
import checkEnglish from "components/custom/validation/checkEnglish";
const BaseServices = () => {
  const dispatch = useDispatch();
  // دیتا هایی که از سمت ریداکس تولکیت دریافت میشود
  const { loading, allBaseServices, allCurrencies } = useSelector(
    (store) => store.baseServices
  );
  const history = useHistory();
  // ref برای اینپوت سرچ
  const searchInputRef = useRef();
  const [baseServices, setBaseServices] = useState([]);
  // وقتی روی کالپس کلیک شد اون آیدی ستونی که باید کالپس شود را در استیت زیر دخیره میکند
  const [collapse, setCollapse] = useState([]);
  // گرفتن ایدی ستونی که باید ویرایش شود
  const [id, setId] = useState();
  // دیتا های اولیه برای ویرایش دیتا که در اینپوت ها نمایش داده میشود
  const [editData, setEditData] = useState({});
  // دیتا های اصلی ویرایش در این استیت دخیره میشود
  const [editDataValue, setEditDataValue] = useState({});
  // گرفتن ارز ها یرای سرچ در مدال ارز ها
  const [currencies, setCurrencies] = useState([]);
  // نمایش دادن مدال ها
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  // برای اینپوت سرج ارز ها
  const [autoSuggest, setAutoSuggest] = useState("");
  // استیت های ولیدیشن فرم برای کنترل ولیدیشن ها
  const [nameValidation, setNameValidation] = useState({
    status: false,
    message: "نام نباید خالی باشد",
  });
  const [classNameValidation, setClassNameValidation] = useState({
    status: true,
    message: "",
  });
  const [routeNameValidation, setRouteNameValidation] = useState({
    status: true,
    message: "",
  });
  // داده های اولیه برای افزودن یک base service
  const [addData, setAddData] = useState({
    name: "",
    class_name: "",
    route_name: "",
    execution_type: 0,
    service_type: 1,
    factor_creation_type: 0,
    is_active: false,
  });
  // داده هایی که بعد از کاللپس کردن تیبل در هر سطر باید نشان دهد
  const [collapseData, setCollapseData] = useState([
    {
      type: "twoLine",
      value: [],
    },
  ]);
  // بردکرامب های صفحه
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
  // عنوان ستون های جدول و داده های هر ستون در جدول
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
                  setCollapse((prev) =>
                    prev.some((p) => p === props.row.id)
                      ? prev.filter((p) => p !== props.row.id)
                      : [...prev, props.row.id]
                  );
                  setCollapseData((prev) =>
                    prev.map((p) => ({
                      type: "twoLine",
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
                setId(props.value);
                setIsModal2(true);
                setNameValidation({ status: true, message: "" });
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

  // گرفتن اطلاعات اولیه برای جدول
  useEffect(() => {
    fetchBaseServices();
    fetchCurrencies();
  }, [fetchBaseServices]);

  // به محظی که اطلاعات را دریافت کرد ان دیتا ها را در جای دیگر دخیره میکند. برای رفع مشکل از اول رندر شدن صحفه در هنگام آپدیت کردن دیتا
  useEffect(() => {
    setBaseServices(allBaseServices);
  }, [allBaseServices]);

  // گرفتن اطلاعات اولیه اینپوت ها هنگام ویرایش یک ستون
  useEffect(() => {
    const data = allBaseServices.find((p) => p.id == id);
    if (!data) return;
    setCurrencies(data.currencies ? data.currencies : []);
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

  // تابع گرفتن دیتا از api
  const fetchBaseServices = async () => {
    try {
      await dispatch(getAllBaseServices());
    } catch (err) {
      throw err;
    }
  };
  // تابع گرفتن دیتا از api
  const fetchCurrencies = async () => {
    try {
      await dispatch(getAllCurrencies());
    } catch (err) {
      throw err;
    }
  };

  // تابع برای انجام عملیات سرج
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

  // تابع هندل کردن اضافه کردن دیتا به جدول
  const addBaseServicesandler = async () => {
    try {
      const res = await dispatch(addBaseService({ ...addData, currencies }));
      if (res.payload.status === "ok") {
        toast.success("خدمت با موفقیت اضافه شد");
        setIsModal(false);
        setCurrencies([]);
        await fetchBaseServices();
      } else {
        throw res.payload;
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  // تابع هندل کردن ویرایش یک دیتا
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(
        updateBaseService({ id, data: editDataValue })
      );
      if (res.payload.status === "ok") {
        setBaseServices((prev) =>
          prev.map((p) => {
            return p.id === res.payload.base_service.id
              ? {
                  ...res.payload.base_service,
                  collapseData: {
                    currencies: res.payload.base_service.currencies,
                    class_name: res.payload.base_service.class_name,
                    route_name: res.payload.base_service.route_name,
                  },
                }
              : p;
          })
        );

        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal2(false);
        setEditDataValue({});
        setCurrencies([]);
      }
    } catch (err) {
      toast.error("ویرایش دسترسی با خطا روبرو شد");
      throw err;
    }
  };

  // نابع هندل کردن ولیدیشن نام
  const nameValidationHandler = (val) => {
    if (!val) {
      setNameValidation({
        status: false,
        message: "نام نباید خالی باشد",
      });
      return false;
    } else if (!checkPersian(val)) {
      setNameValidation({
        status: false,
        message: "نام باید فارسی باشد",
      });
      return false;
    } else {
      setNameValidation({
        status: true,
        message: "",
      });
      return true;
    }
  };

  // نابع هندل کردن ولیدیشن نام کلاس
  const classNameValidationHandler = (val) => {
    if (addData.is_active && !val) {
      setClassNameValidation({
        status: false,
        message: "نام کلاس نباید خالی باشد",
      });
      return false;
    } else if (!checkEnglish(val)) {
      setClassNameValidation({
        status: false,
        message: "نام کلاس باید انگلیسی باشد",
      });
      return false;
    } else {
      setClassNameValidation({
        status: true,
        message: "",
      });
      return true;
    }
  };

  // نابع هندل کردن ولیدیشن نام مسیر
  const routeNameValidationHandler = (val) => {
    if (addData.is_active && !val) {
      setRouteNameValidation({
        status: false,
        message: "نام مسیر نباید خالی باشد",
      });
      return false;
    } else if (!checkEnglish(val)) {
      setRouteNameValidation({
        status: false,
        message: "نام مسیر باید انگلیسی باشد",
      });
      return false;
    } else {
      setRouteNameValidation({
        status: true,
        message: "",
      });
      return true;
    }
  };

  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <Colxx lg="12" xl="12">
          <Card className="mb-4 p-5">
            {/* برد کرامب و دکمه سرج و اضافه کردن در کامپوننت پایین قرار دارد 
            ورودی ها : 
            -title:عنوان صفحه
            -match:برای برد کرامپ
            -onSearch:تابع هندل کردن سرچ
            -hasSearch:آیا این صفحه گزینه ای برای سرچ کردن دارد یا نه
            -searchInputRef:ref برای اینپوت سرچ
            -onAdd:تابع برای وقتی که کاربر روی دکمه اضافه کردن زد
            -searchOption:آپشن های مختلف برای سرچ کردن که شامل ایدی و نام میباشد
            -
            */}
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
            {/* برای نشان دادن جدول استفاده میشود 
            ورودی ها:
            -cols:دیتا های ستون ها 
            -data:دیتا های اصلی
            -isCollapse:آیا این جدول کالپس دارد؟
            -collapseData:وقتی که کاربر کالپس را زد چه دیتاهایی در کالپس نشان دهد
            */}
            <Table
              cols={cols}
              data={baseServices}
              isCollapse={collapse}
              collapseData={collapseData}
            />
            {/* مدال اضافه کردن دیتای جدید */}
            <Modal
              isOpen={isModal}
              size="lg"
              toggle={() => setIsModal(!isModal)}
            >
              <ModalHeader>ایجاد سرویس پایه جدید</ModalHeader>
              <ModalBody>
                <div className="mb-3 d-flex">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">نام</span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        className="form-control"
                        name="name"
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
                        if (!e) {
                          setClassNameValidation({
                            status: true,
                            message: "",
                          });
                          setRouteNameValidation({
                            status: true,
                            message: "",
                          });
                        } else {
                          setClassNameValidation({
                            status: false,
                            message: "نام کلاس نباید خالی باشد",
                          });
                          setRouteNameValidation({
                            status: false,
                            message: "نام مسیر نباید خالی باشد",
                          });
                        }
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
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        onChange={(e) => {
                          if (!classNameValidationHandler(e.target.value))
                            return;
                          setAddData((prev) => ({
                            ...prev,
                            class_name: e.target.value,
                          }));
                        }}
                      />
                      {classNameValidation.status || (
                        <div className="invalid-feedback d-block">
                          {classNameValidation.message}
                        </div>
                      )}
                    </div>
                  </InputGroup>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اسم مسیر</span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        onChange={(e) => {
                          if (!routeNameValidationHandler(e.target.value))
                            return;
                          setAddData((prev) => ({
                            ...prev,
                            route_name: e.target.value,
                          }));
                        }}
                      />
                      {routeNameValidation.status || (
                        <div className="invalid-feedback d-block">
                          {routeNameValidation.message}
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
                      !nameValidation.status ||
                      !classNameValidation.status ||
                      !routeNameValidation.status
                    )
                      return;
                    addBaseServicesandler();
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
            {/* مدال اضافه کردن ارز جدید */}
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
                      if (!allCurrencies.some((c) => c.name === autoSuggest)) {
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
            {/* مدال ویرایش دیتای یک ستون */}
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
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        value={editData.name}
                        onChange={(e) => {
                          if (!nameValidationHandler(e.target.value)) return;
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
                      {nameValidation.status || (
                        <div className="invalid-feedback d-block">
                          {nameValidation.message}
                        </div>
                      )}
                    </div>
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
                      checked={editData?.is_active}
                      onChange={(e) => {
                        if (!e) {
                          setClassNameValidation({
                            status: true,
                            message: "",
                          });
                          setRouteNameValidation({
                            status: true,
                            message: "",
                          });
                        } else {
                          setClassNameValidation({
                            status: false,
                            message: "نام کلاس نباید خالی باشد",
                          });
                          setRouteNameValidation({
                            status: false,
                            message: "نام مسیر نباید خالی باشد",
                          });
                        }
                        setEditData((prev) => ({ ...prev, is_active: e }));
                        setEditDataValue((prev) => ({ ...prev, is_active: e }));
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اسم کلاس</span>
                    </InputGroupAddon>
                    <div className="pos-rel flex-grow-1">
                      <Input
                        value={editData.class_name}
                        onChange={(e) => {
                          if (!classNameValidationHandler(e.target.value))
                            return;
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
                      {classNameValidation.status || (
                        <div className="invalid-feedback d-block">
                          {classNameValidation.message}
                        </div>
                      )}
                    </div>
                  </InputGroup>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اسم مسیر</span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        value={editData.route_name}
                        onChange={(e) => {
                          if (!routeNameValidationHandler(e.target.value))
                            return;
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
                      {routeNameValidation.status || (
                        <div className="invalid-feedback d-block">
                          {routeNameValidation.message}
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
