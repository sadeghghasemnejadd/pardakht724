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
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTasks,
  updateTasks,
  searchTasks,
  getAllPermissions,
} from "redux-toolkit/TasksSlice";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLayout from "containers/ui/headerLayout";
import checkPersian from "components/custom/validation/checkPersian";
import checkInclude from "components/custom/validation/checkInclude";
import checkNumber from "components/custom/validation/checkNumber";
import checkCountCharacters from "components/custom/validation/checkCountCharacters";
const Tasks = () => {
  const dispatch = useDispatch();
  const { loading, allTasks, permissions } = useSelector(
    (store) => store.tasks
  );
  const [tasks, setTasks] = useState([]);
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState([]);
  const [id, setId] = useState();
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [nameValidation, setNameValidation] = useState({
    status: true,
    message: "",
  });
  const [referValidation, setReferValidation] = useState({
    status: true,
    message: "",
  });
  const [priorityValidation, setPriorityValidation] = useState({
    status: true,
    message: "",
  });
  const [maxDueValidation, setMaxDueValidation] = useState({
    status: true,
    message: "",
  });
  const [descriptionValidation, setDescriptionVAlidation] = useState({
    status: true,
    message: "",
  });
  const [collapseData, setCollapseData] = useState([
    { type: "textarea", value: [] },
    { type: "badge", value: [] },
  ]);
  const history = useHistory();
  const match = [
    {
      path: "/",
      text: "کاربران",
    },
    {
      path: history.location.pathname,
      text: "مدیریت وظایف",
    },
  ];
  const cols = useMemo(
    () => [
      {
        Header: "نام",
        accessor: "name",
        cellClass: "text-muted  text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },

      {
        Header: "نوع",
        accessor: "type",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "ارجاع",
        accessor: "refer_to",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "حداکثر زمان انجام",
        accessor: "max_due_date",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          return (
            <>
              <>{props.value}</>
            </>
          );
        },
      },
      {
        Header: "اولویت",
        accessor: "priority",
        cellClass: "text-muted text-center ",
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: "جزییات",
        accessor: "description_subject",
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
                    prev.map((p) =>
                      p.type === "textarea"
                        ? {
                            type: "textarea",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value[0] },
                                ],
                          }
                        : {
                            type: "badge",
                            value: p.value.some((v) => v.id == props.row.id)
                              ? p.value
                              : [
                                  ...p.value,
                                  { id: props.row.id, value: props.value[1] },
                                ],
                          }
                    )
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
                setIsModal(true);
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
    fetchTasks();
    fetchPermissions();
  }, [fetchTasks]);
  useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);
  useEffect(() => {
    const data = allTasks.find((p) => p.id == id);
    if (!data) return;
    setEditData({
      type: data?.type === null ? "" : data.type,
      name: data?.name === null ? "" : data.name,
      description: data?.description === null ? "" : data.description,
      refer_to: data?.refer_to === null ? "" : data.refer_to,
      max_due_date: data?.max_due_date === null ? "" : data.max_due_date,
      priority: data?.priority === null ? "" : data.priority,
    });
  }, [id]);

  const fetchTasks = async () => {
    try {
      await dispatch(getAllTasks());
    } catch (err) {
      throw err;
    }
  };
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
        .map((s) => (s === 0 ? "name" : s === 1 ? "type" : "refer_to"))
        .map((s) => `${s}:${searchInput}`);

      const searchQuery = `?search_in=${
        searchIdQuery.length === 1 ? searchIdQuery[0] : searchIdQuery.join(",")
      }`;
      await dispatch(searchTasks(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(updateTasks({ id, data: editDataValue }));
      if (res.payload.status === "ok") {
        setTasks((prev) =>
          prev.map((p) =>
            p.id === res.payload.task.id
              ? {
                  ...res.payload.task,
                  description_subject: [
                    res.payload.task.description,
                    res.payload.task.subject_types,
                  ],
                }
              : p
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
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <Colxx lg="12" xl="12">
          <Card className="mb-4 p-5">
            <HeaderLayout
              title="مدیریت وظایف"
              addName="افزودن وظیفه جدید"
              onSearch={searchHandler}
              hasSearch={true}
              searchInputRef={searchInputRef}
              onAdd={() => {}}
              searchOptions={[
                {
                  id: 0,
                  name: "نام",
                },
                {
                  id: 1,
                  name: "نوع",
                },
                {
                  id: 2,
                  name: "ارجاع",
                },
              ]}
              match={match}
            />
            <Table
              cols={cols}
              data={tasks}
              isCollapse={collapse}
              collapseData={collapseData}
            />
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
                        value={editData.name}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                          if (!checkPersian(e.target.value)) {
                            setNameValidation({
                              status: false,
                              message: "نام باید فارسی باشد",
                            });
                            return;
                          } else {
                            setNameValidation({ status: true, message: "" });
                          }

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
                  <InputGroup size="sm" className="">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">ارجاع</span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        value={editData.refer_to}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            refer_to: e.target.value,
                          }));
                          if (!checkInclude(e.target.value, permissions)) {
                            setReferValidation({
                              status: false,
                              message: "ارجاع باید جزوی از دسترسی ها باشد.",
                            });
                            return;
                          } else {
                            setReferValidation({ status: true, message: "" });
                          }
                          setEditDataValue((prev) => ({
                            ...prev,
                            refer_to: e.target.value,
                          }));
                        }}
                      />
                      {referValidation.status || (
                        <div className="invalid-feedback d-block">
                          {referValidation.message}
                        </div>
                      )}
                    </div>
                  </InputGroup>
                </div>
                <div className="d-flex mb-3">
                  <InputGroup size="sm" className="mr-3">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">اولویت</span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        value={editData.priority}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }));
                          if (!checkNumber(e.target.value)) {
                            setPriorityValidation({
                              status: false,
                              message: "اولویت باید عدد باشد",
                            });
                            return;
                          } else {
                            setPriorityValidation({
                              status: true,
                              message: "",
                            });
                          }
                          setEditDataValue((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }));
                        }}
                      />
                      {priorityValidation.status || (
                        <div className="invalid-feedback d-block">
                          {priorityValidation.message}
                        </div>
                      )}
                    </div>
                  </InputGroup>
                  <InputGroup size="sm" className="">
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">
                        حداکثر زمان انجام
                      </span>
                    </InputGroupAddon>
                    <div className="flex-grow-1 pos-rel">
                      <Input
                        value={editData.max_due_date}
                        onChange={(e) => {
                          setEditData((prev) => ({
                            ...prev,
                            max_due_date: e.target.value,
                          }));
                          if (!checkNumber(e.target.value)) {
                            setMaxDueValidation({
                              status: false,
                              message: "حداکثر زمان انجام باید عدد باشد.",
                            });
                            return;
                          } else {
                            setMaxDueValidation({ status: true, message: "" });
                          }
                          setEditDataValue((prev) => ({
                            ...prev,
                            max_due_date: e.target.value,
                          }));
                        }}
                      />
                      {maxDueValidation.status || (
                        <div className="invalid-feedback d-block">
                          {maxDueValidation.message}
                        </div>
                      )}
                    </div>
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
          </Card>
        </Colxx>
      )}
    </Layout>
  );
};
export default Tasks;
