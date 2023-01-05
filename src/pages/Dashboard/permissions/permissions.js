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
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
import HeaderLayout from "containers/ui/headerLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPermissions,
  updatePermissions,
  searchPermissions,
  addPermissions,
} from "redux-toolkit/permissionsSlice";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const Permissions = () => {
  const dispatch = useDispatch();
  const { loading, allPermissions, pageSize } = useSelector(
    (store) => store.permissions
  );
  const [permissions, setPermissions] = useState([]);
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState([]);
  const [id, setId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [addData, setAddData] = useState({
    name: "",
    p_name: "",
    description: "",
  });
  const [collapseData, setCollapseData] = useState([
    { type: "textarea", value: [] },
  ]);
  const history = useHistory();
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
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);
  useEffect(() => {
    setPermissions(allPermissions);
  }, [allPermissions]);
  useEffect(() => {
    const data = allPermissions.find((p) => p.id == id);
    if (!data) return;
    setEditData({
      p_name: data?.p_name === null ? "" : data.p_name,
      name: data?.name === null ? "" : data.name,
      description: data?.description === null ? "" : data.description,
    });
  }, [id]);
  const fetchPermissions = async () => {
    try {
      await dispatch(getAllPermissions());
    } catch (err) {
      throw err;
    }
  };
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
                    <Input
                      value={editData.p_name}
                      onChange={(e) => {
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
                    <Input
                      onChange={(e) => {
                        setAddData((prev) => ({
                          ...prev,
                          p_name: e.target.value,
                        }));
                      }}
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">برچسب</span>
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
              </ModalBody>
              <ModalFooter className="d-flex flex-row-reverse justify-content-start">
                <Button
                  color="primary"
                  size="lg"
                  className="mb-2"
                  onClick={addPermissionHandler}
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
