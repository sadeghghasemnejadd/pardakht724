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
import "rc-switch/assets/index.css";
import HeaderLayout from "containers/ui/headerLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPermissions,
  updatePermissions,
  searchPermissions,
  addPermissions,
} from "redux-toolkit/permissionsSlice";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import checkPersian from "components/custom/validation/checkPersian";
import checkCountCharacters from "components/custom/validation/checkCountCharacters";
import checkUnique from "components/custom/validation/checkUnique";
const Permissions = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // گرفتن اطلاعات از ریداکس
  const { loading, allPermissions, pageSize } = useSelector(
    (store) => store.permissions
  );
  // تمام اطلاعات را در استیت زیر ذخیره کردیم
  const [permissions, setPermissions] = useState([]);
  // ref اینپوت سرچ
  const searchInputRef = useRef();
  // آیا این جدول کالپس دارد یا نه؟
  const [collapse, setCollapse] = useState([]);
  // آیدی دیتایی که میخواهیم ان را ویرایش کنیم
  const [id, setId] = useState();
  // دیتای اولیه برای فرم ویرایش
  const [editData, setEditData] = useState({});
  // دیتای نهایی جهت ویرایش ان دیتا
  const [editDataValue, setEditDataValue] = useState({});
  // استیت مدال اضافه کردن دیتا
  const [isModal, setIsModal] = useState(false);
  // استیت ندال ویرایش دیتا
  const [isModal2, setIsModal2] = useState(false);
  // اطلاعات اولیه جهت اضافه کردن دیتا
  const [addData, setAddData] = useState({
    name: "",
    p_name: "",
    description: "",
  });
  // دیتایی که موقع کالپس باید نمیاش دهد
  const [collapseData, setCollapseData] = useState([
    { type: "textarea", value: [] },
  ]);
  // استیت های ولیدیشن فرم ها
  const [pNameValidation, setPNameValidation] = useState({
    status: true,
    message: "",
  });
  const [nameValidation, setNameValidation] = useState({
    status: false,
    message: "برچسب نباید خالی باشد",
  });
  const [descriptionValidation, setDescriptionVAlidation] = useState({
    status: true,
    message: "",
  });
  // دیتا های اصلی جدول
  const cols = useMemo(
    () => [
      {
        Header: "نام",
        accessor: "p_name",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => {
          return <>{props.value}</>;
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
        Header: "توضیحات",
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
                <p>{props.value?.slice(0, 50)}...</p>
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
        cellClass: "text-muted w-10 text-center",
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
  // گرفتن اطلاعات اصلی
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);
  // ریختن دیتاهای اصلی داخل استیت
  useEffect(() => {
    setPermissions(allPermissions);
  }, [allPermissions]);

  // گرفتن اطلاعات اولیه برای فرم ویرایش
  useEffect(() => {
    const data = allPermissions.find((p) => p.id == id);
    if (!data) return;
    setEditData({
      p_name: data?.p_name === null ? "" : data.p_name,
      name: data?.name === null ? "" : data.name,
      description: data?.description === null ? "" : data.description,
    });
  }, [id]);
  // گرفتن اطعات اولیه از دیتا بیس
  const fetchPermissions = async () => {
    try {
      await dispatch(getAllPermissions());
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن سرچ
  const searchHandler = async (e, searchId) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchIdQuery = searchId
        .map((s) => (s === 0 ? "p_name" : "name"))
        .map((s) => `${s}:${searchInput}`);

      const searchQuery = `?search_in=${
        searchIdQuery.length === 1 ? searchIdQuery[0] : searchIdQuery.join(",")
      }`;
      await dispatch(searchPermissions(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن ذخیره ویرایش
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(
        updatePermissions({ id, data: editDataValue })
      );
      if (res.payload.status === "ok") {
        setPermissions((prev) =>
          prev.map((p) =>
            p.id === res.payload.permission.id ? res.payload.permission : p
          )
        );
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal(false);
        setEditDataValue({});
      }
    } catch (err) {
      toast.error("ویرایش دسترسی با خطا روبرو شد");
      throw err;
    }
  };
  // تابع هندل کردن ذخیره دیتای جدید
  const addPermissionHandler = async () => {
    try {
      if (addData.p_name.length > 125) {
        throw new Error(" تام حداکثر باید 125 کارکتر باشد");
      }
      if (addData.description.length > 500) {
        throw new Error(" توضیحات حداکثر باید 500 کارکتر باشد");
      }
      const res = await dispatch(addPermissions(addData));
      if (res.payload) {
        toast.success("دسترسی با موفقیت اضافه شد");
        setIsModal2(false);
        await fetchPermissions();
      } else {
        throw new Error("مقادیر یک یا چند ستون نادرست وارد شده است.");
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };
  // آدر صحفه کنونی برای برد کرامب
  const match = [
    {
      path: "/",
      text: "کاربران",
    },
    {
      path: history.location.pathname,
      text: "مدیریت دسترسی ها",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div>
          <Colxx lg="12" xl="12">
            {/* مدال ویرایش */}
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
            {/* مدال اضافه کردن دیتای جدید */}
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
            </Modal>
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
                title="مدیریت دسترسی ها"
                addName="افزودن دسترسی جدید"
                onSearch={searchHandler}
                hasSearch={true}
                searchInputRef={searchInputRef}
                searchOptions={[
                  {
                    id: 0,
                    name: "سرچ در نام",
                  },
                  {
                    id: 1,
                    name: "سرچ در برچسب",
                  },
                ]}
                onAdd={() => {
                  setIsModal2(true);
                }}
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
                data={permissions}
                isCollapse={collapse}
                collapseData={collapseData}
                pageSize={pageSize}
              />
            </Card>
          </Colxx>
        </div>
      )}
    </Layout>
  );
};
export default Permissions;
