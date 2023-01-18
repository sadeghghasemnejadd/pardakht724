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
import { getAllServices } from "redux-toolkit/ServicesSlice";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLayout from "containers/ui/headerLayout";
const MainServices = () => {
  const dispatch = useDispatch();
  const { loading, services } = useSelector((store) => store.services);
  const [allServices, setAllServices] = useState([]);
  const searchInputRef = useRef();
  const [isModal, setIsModal] = useState(false);
  // const [addData, setAddData] = useState({
  //   name: "",
  //   description: "",
  //   url: "",
  //   is_active: 1,
  // });
  const history = useHistory();
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
        Header: "نوع سرویس",
        accessor: "url",
        cellClass: "text-muted w-60 text-center ",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "نحوه پردازش",
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
        Header: "ارز ها",
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
        accessor: "id_name",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return (
            <div
              className="glyph h5 mr-3"
              onClick={() => {}}
              style={{ cursor: "pointer" }}
            >
              <div className={`glyph-icon simple-icon-pencil text-center`} />
            </div>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);
  useEffect(() => {
    setAllServices(services);
  }, [services]);
  const fetchServices = async () => {
    try {
      await dispatch(getAllServices());
    } catch (err) {
      throw err;
    }
  };

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

  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <Colxx lg="12" xl="12">
          <Card className="mb-4 p-5">
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
            {/* <Table
              cols={cols}
              data={serviceCategories}
              isCollapse={collapse}
              collapseData={collapseData}
            /> */}
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
