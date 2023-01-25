import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Layout from "layout/AppLayout";
import { Card } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import "rc-switch/assets/index.css";
import Switch from "rc-switch";
import { useSelector, useDispatch } from "react-redux";
import { getAllServices, searchServices } from "redux-toolkit/ServicesSlice";
import { useHistory, Link } from "react-router-dom";
import HeaderLayout from "containers/ui/headerLayout";
const MainServices = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // گرفتن اطلاعات از ریداکس
  const { loading, services } = useSelector((store) => store.services);
  // ref اینپوت سرچ
  const searchInputRef = useRef();
  // بردکرامب صحفه
  const match = [
    {
      path: "/",
      text: "خدمات",
    },
    {
      path: history.location.pathname,
      text: "سرویس ها",
    },
  ];
  // محتویات اصلی صحفه
  const cols = useMemo(
    () => [
      {
        Header: "آیکون",
        accessor: "services_icon",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <img src={props.value} alt="service icon" width={50} />;
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
        Header: "نوع سرویس",
        accessor: "service_type",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "نحوه پردازش",
        accessor: "execution_type",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "ارز ها",
        accessor: "",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>در حال تکمیل</>;
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
            <div className="glyph text-center h5">
              <Link
                className={`glyph-icon simple-icon-pencil text-center`}
                style={{ cursor: "pointer" }}
                to={`/services/${props.value}`}
              />
            </div>
          );
        },
      },
    ],
    []
  );
  // گرفتن اطلاعات از دیتا بیس
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);
  // تابع گرفتن اطلاعات از دیتابیس
  const fetchServices = async () => {
    try {
      await dispatch(getAllServices());
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
      await dispatch(searchServices(searchQuery));
    } catch (err) {
      throw err;
    }
  };

  // !در حال تکمیل
  // const addServiceCategoriesHandler = async () => {
  //   try {
  //     if (addData.name.length > 127) {
  //       throw new Error("نام حداکثر باید 127 کارکتر باشد");
  //     }
  //     if (addData.description.length > 255) {
  //       throw new Error(" توضیحات حداکثر باید 255 کارکتر باشد");
  //     }
  //     if (addIcon.size > 128000) {
  //       throw new Error("سایز عکس باید کمتر از 128 کیلوبایت باشد");
  //     }
  //     if (addIcon.type !== "image/png") {
  //       throw new Error("فرمت عکس حنما باید png باشد");
  //     }
  //     const formData = new FormData();
  //     formData.append("icon", addIcon, addIcon.name);
  //     const res = await dispatch(
  //       addServiceCategories({ ...addData, icon: addIcon })
  //     );
  //     if (res.payload) {
  //       toast.success("سرویس با موفقیت اضافه شد");
  //       setIsModal(false);
  //       await fetchServiceCategories();
  //     } else {
  //       throw new Error("مقادیر یک یا چند ستون نادرست وارد شده است.");
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //     throw err;
  //   }
  // };

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
              title="لیست سرویس ها"
              addName="افزودن سرویس جدید"
              onSearch={searchHandler}
              hasSearch={true}
              searchInputRef={searchInputRef}
              onAdd={() => {}}
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
            <Table cols={cols} data={services} />
            {/* مدال اضافه کردن دیتا (در حال تکمیل) */}
            {/* <Modal
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
            </Modal> */}
          </Card>
        </Colxx>
      )}
    </Layout>
  );
};
export default MainServices;
