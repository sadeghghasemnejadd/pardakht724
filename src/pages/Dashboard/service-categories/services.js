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
import ReactAutoSuggest from "components/common/ReactAutoSuggest";
import { useSelector, useDispatch } from "react-redux";
import {
  addServices,
  getServices,
  removeServices,
  searchServices,
  updateServices,
} from "redux-toolkit/ServiceCategoriesSlice";
import { useHistory, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLayout from "containers/ui/headerLayout";
const Services = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, services } = useSelector((store) => store.serviceCategories);
  const searchInputRef = useRef();
  const [isModal, setIsModal] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState("");
  const [addData, setAddData] = useState({
    service_id: 0,
    is_active: 1,
  });
  const history = useHistory();
  const serviceCategoryName = history.location.state.ServiceCategoriesName;
  const match = [
    {
      path: "/",
      text: "خدمات",
    },
    {
      path: "/service-categories",
      text: "دسته بندی سرویس ها",
    },
    {
      path: history.location.pathname,
      text: `سرویس های خدمات ${serviceCategoryName}`,
    },
  ];
  const cols = useMemo(
    () => [
      {
        Header: "آیکون",
        accessor: "",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return <>ندارد</>;
        },
      },

      {
        Header: "نام",
        accessor: "name",
        cellClass: "text-muted text-center w-60",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "وضعیت",
        accessor: "is_active_id",
        cellClass: "text-muted text-center",
        Cell: ({ value }) => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                className="custom-switch custom-switch-secondary custom-switch-small"
                checked={value[0]}
                onClick={(e) => {
                  changeEditActiveHandler(e, value[1]);
                }}
              />
            </div>
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
              style={{ cursor: "pointer" }}
              onClick={() => removeServiceHandler(props.value)}
            >
              <div className={`glyph-icon simple-icon-trash text-center`} />
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

  const fetchServices = async () => {
    try {
      await dispatch(getServices(id));
    } catch (err) {
      throw err;
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=name:${searchInput}`;
      await dispatch(searchServices({ id, query: searchQuery }));
    } catch (err) {
      throw err;
    }
  };
  const addServicesHandler = async () => {
    try {
      const res = await dispatch(addServices({ id, data: addData }));
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
  const changeEditActiveHandler = async (e, curId) => {
    try {
      const res = await dispatch(
        updateServices({ baseId: id, id: curId, data: { is_active: e } })
      );
      if (res.payload) {
        fetchServices();
        toast.success("خدمت با موفقیت آپدیت شد.");
      } else {
        throw new Error("بروزرسانی خدمت با خطا مواجه شد.");
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };
  const removeServiceHandler = async (curId) => {
    try {
      const res = await dispatch(removeServices({ baseId: id, id: curId }));
      if (res.payload) {
        fetchServices();
        toast.success("خدمت با موفقیت حذف شد.");
      } else {
        throw new Error("حذف خدمت با خطا مواجه شد.");
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
              title={`سرویس های خدمات ${serviceCategoryName}`}
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
            <Table cols={cols} data={services} />
            <Modal
              isOpen={isModal}
              size="lg"
              toggle={() => setIsModal(!isModal)}
            >
              <ModalHeader>ایجاد سرویس جدید</ModalHeader>
              <ModalBody>
                <div className="d-flex mb-3">
                  <InputGroup size="sm" className="mr-3">
                    <InputGroupAddon addonType="prepend" className="w-30">
                      <span className="input-group-text w-100">
                        سرویس مورد نظر
                      </span>
                    </InputGroupAddon>
                    <div className="w-70">
                      <ReactAutoSuggest
                        AutoSuggest
                        value={autoSuggest}
                        onChange={(val) => {
                          setAutoSuggest(val);
                        }}
                        data={[]}
                      />
                    </div>
                  </InputGroup>
                </div>
              </ModalBody>
              <ModalFooter className="d-flex flex-row-reverse justify-content-start">
                <Button
                  color="primary"
                  size="lg"
                  className="mb-2"
                  onClick={addServicesHandler}
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
          </Card>
        </Colxx>
      )}
    </Layout>
  );
};
export default Services;
