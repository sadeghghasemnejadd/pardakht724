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
  CustomInput,
  Button,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import "rc-switch/assets/index.css";
import Switch from "rc-switch";
import { useSelector, useDispatch } from "react-redux";
import {
  addServiceCategories,
  getAllServiceCategories,
  searchServiceCategories,
  updateServiceCategories,
} from "redux-toolkit/ServiceCategoriesSlice";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLayout from "containers/ui/headerLayout";
const ServiceCategories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // گرفتن اطلاعات از ریداکس
  const { loading, allServiceCategories } = useSelector(
    (store) => store.serviceCategories
  );
  // استیت ذخیره اطلاعات در استیت
  const [serviceCategories, setServiceCategories] = useState([]);
  // ref اینپوت سرچ
  const searchInputRef = useRef();
  // آیا جدول کالپس داره؟
  const [collapse, setCollapse] = useState([]);
  // آیدی دیتایی که میخواد ویرایش شود
  const [id, setId] = useState();
  // دیتاهای اولیه ویرایش
  const [editData, setEditData] = useState({});
  // دیتا های نهایی ویرایش
  const [editDataValue, setEditDataValue] = useState({});
  // مدال اضافه کردن دیتا
  const [isModal, setIsModal] = useState(false);
  // مدال ویرایش دیتا
  const [isModal2, setIsModal2] = useState(false);
  // ref اینپوت آیکون
  const iconRef = useRef();
  // ref اینپوت آیکون
  const editIconRef = useRef();
  // استیت آیکون
  const [addIcon, setAddIcon] = useState();
  // استیت ویرایش آیکون
  const [editIcon, setEditIcon] = useState();
  // دیتا های اولیه برای ذخیره دیتا
  const [addData, setAddData] = useState({
    name: "",
    description: "",
    url: "",
    is_active: 1,
  });
  // دیتا هایی که موقع کالپس جدول نمایش میدهد
  const [collapseData, setCollapseData] = useState([
    {
      type: "textarea",
      value: [],
    },
  ]);
  // برد کرامب صحفه
  const match = [
    {
      path: "/",
      text: "خدمات",
    },
    {
      path: history.location.pathname,
      text: "دسته بندی سرویس ها",
    },
  ];
  // محتوای اصلی جدول
  const cols = useMemo(
    () => [
      {
        Header: "آیکون",
        accessor: "icon",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <img src={props.value} alt="icon-image" width={50} />;
        },
      },

      {
        Header: "نام",
        accessor: "name",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "URL",
        accessor: "url",
        cellClass: "text-muted w-60 text-center ",
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
      },

      {
        Header: "بیشتر",
        accessor: "description",
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
                      type: "textarea",
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
        accessor: "id_name",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return (
            <div className="d-flex">
              <div
                className="glyph h5 mr-3"
                onClick={() => {
                  setId(props.value[0]);
                  setIsModal2(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className={`glyph-icon simple-icon-pencil text-center`} />
              </div>
              <div className="glyph text-center">
                <Link
                  className={`glyph-icon simple-icon-eye h5`}
                  style={{ cursor: "pointer" }}
                  to={{
                    pathname: `/service-categories/${props.value[0]}/services`,
                    state: { ServiceCategoriesName: props.value[1] },
                  }}
                />
              </div>
            </div>
          );
        },
      },
    ],
    [collapse, id]
  );
  // گرفتن دیتا های اصلی جدول
  useEffect(() => {
    fetchServiceCategories();
  }, [fetchServiceCategories]);
  // ذخیره دیتا ها در استیت جداگونه
  useEffect(() => {
    setServiceCategories(allServiceCategories);
  }, [allServiceCategories]);
  // دیتا های اولیه برای ویرایش
  useEffect(() => {
    const data = allServiceCategories.find((p) => p.id == id);
    if (!data) return;
    setEditData({
      name: data?.name === null ? "" : data.name,
      description: data?.description === null ? "" : data.description,
      url: data?.url === null ? "" : data.url,
      is_active: data?.is_active === null ? false : data.is_active,
    });
  }, [id]);
  // تابع گرفتن دیتا ها از دیتابیس
  const fetchServiceCategories = async () => {
    try {
      await dispatch(getAllServiceCategories());
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن سرچ
  const searchHandler = async (e) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=name:${searchInput}`;
      await dispatch(searchServiceCategories(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن اضافه کردن دیتا
  const addServiceCategoriesHandler = async () => {
    try {
      if (addData.name.length > 127) {
        throw new Error("نام حداکثر باید 127 کارکتر باشد");
      }
      if (addData.description.length > 255) {
        throw new Error(" توضیحات حداکثر باید 255 کارکتر باشد");
      }
      if (addIcon.size > 128000) {
        throw new Error("سایز عکس باید کمتر از 128 کیلوبایت باشد");
      }
      if (addIcon.type !== "image/png") {
        throw new Error("فرمت عکس حنما باید png باشد");
      }
      const formData = new FormData();
      formData.append("icon", addIcon, addIcon.name);
      const res = await dispatch(
        addServiceCategories({ ...addData, icon: addIcon })
      );
      if (res.payload) {
        toast.success("سرویس با موفقیت اضافه شد");
        setIsModal(false);
        await fetchServiceCategories();
      } else {
        throw new Error("مقادیر یک یا چند ستون نادرست وارد شده است.");
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };
  // تابع هندل کردن ذخیره اطلاعات ویرایش شده
  const saveChangeHandler = async () => {
    try {
      const data = editIcon
        ? { ...editDataValue, icon: editIcon }
        : editDataValue;
      const res = await dispatch(updateServiceCategories({ id, data }));
      if (res.payload.status === "ok") {
        setBaseServices((prev) =>
          prev.map((p) =>
            p.id === res.payload.service_category.id
              ? {
                  ...res.payload.service_category,
                  id_name: [
                    res.payload.service_category.id,
                    res.payload.service_category.name,
                  ],
                }
              : p
          )
        );
        toast.success("تغییرات با موفقیت ذخیره شد.");
        setIsModal2(false);
        setEditDataValue({});
      }
    } catch (err) {
      toast.error("ویرایش دسترسی با خطا روبرو شد");
      throw err;
    }
  };
  // تابع اضافه کردن آیکون
  const uploadIcon = (e) => {
    if (iconRef.current) {
      const file = e.target.files;
      setAddIcon(file[0]);
    }
  };
  // تابع اضافه کردن آیکون ویرایش شده
  const uploadEditIcon = (e) => {
    if (iconRef.current) {
      const file = e.target.files;
      setEditIcon(file[0]);
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
              title="دسته بندی سرویس ها"
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
              data={serviceCategories}
              isCollapse={collapse}
              collapseData={collapseData}
            />
            {/* مدال اضافه کردن دیتا */}
            <Modal
              isOpen={isModal}
              size="lg"
              toggle={() => setIsModal(!isModal)}
            >
              <ModalHeader>ایجاد سرویس جدید</ModalHeader>
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
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">URL</span>
                    </InputGroupAddon>
                    <Input
                      onChange={(e) =>
                        setAddData((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                    />
                  </InputGroup>
                </div>
                <div className="mb-3">
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      آپلود آیکون
                    </InputGroupAddon>
                    <CustomInput
                      type="file"
                      id="icon"
                      innerRef={iconRef}
                      name="icon"
                      onChange={uploadIcon}
                    />
                  </InputGroup>
                </div>
                <div className="mb-3">
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
                <div className="d-flex align-items-center justify-content-end">
                  <p className="mb-0 mr-3">وضعیت</p>
                  <Switch
                    className="custom-switch custom-switch-secondary custom-switch-small"
                    onChange={(e) => {
                      setAddData((prev) => ({
                        ...prev,
                        is_active: e,
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
                  onClick={addServiceCategoriesHandler}
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
            {/* مدال ویرایش دیتا */}
            <Modal
              isOpen={isModal2}
              size="lg"
              toggle={() => setIsModal2(!isModal2)}
            >
              <ModalHeader>ویرایش سرویس</ModalHeader>
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
                <div className="d-flex mb-3">
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">URL</span>
                    </InputGroupAddon>
                    <Input
                      value={editData.url}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }));
                        setEditDataValue((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }));
                      }}
                    />
                  </InputGroup>
                </div>
                <div className="mb-3">
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      آپلود آیکون
                    </InputGroupAddon>
                    <CustomInput
                      type="file"
                      id="icon"
                      innerRef={editIconRef}
                      name="icon"
                      onChange={uploadEditIcon}
                    />
                  </InputGroup>
                </div>
                <div className="mb-3">
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
                <div className="d-flex align-items-center justify-content-end">
                  <p className="mb-0 mr-3">وضعیت</p>
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
                  onClick={() => setIsModal2(false)}
                >
                  لغو
                </Button>
              </ModalFooter>
            </Modal>
          </Card>
        </Colxx>
      )}
    </Layout>
  );
};
export default ServiceCategories;
