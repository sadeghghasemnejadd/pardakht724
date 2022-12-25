import { useParams, useHistory } from "react-router-dom";
import Layout from "layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useState } from "react";
import { getAllTasks, updateRoleTasks } from "redux-toolkit/TasksSlice";
import styles from "./roles.module.css";
import { toast } from "react-toastify";
import Breadcrumb from "components/custom/Breadcrumb";
const AddRolesTasks = () => {
  const { id } = useParams();
  const { loading, allTasks } = useSelector((store) => store.tasks);
  const [searchInput, setSearchInput] = useState("");
  const [allTasksState, setAllTasksState] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchTasks = async () => {
    try {
      const res = await dispatch(getAllTasks());
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  useEffect(() => {
    setData({ tasks: tasks.map((task) => task.id) });
  }, [tasks]);
  useEffect(() => {
    setAllTasksState(allTasks);
  }, [allTasks]);
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    setAllTasksState(
      allTasks.filter((task) => task.name.includes(e.target.value))
    );
  };
  const changeHandler = (e, taskId) => {
    if (!e) {
      setTasks((prev) => prev.filter((p) => p.id !== taskId));
    } else {
      setTasks((prev) => [...prev, allTasksState.find((p) => p.id === taskId)]);
    }
  };
  const addTasksHandler = async () => {
    try {
      const res = await dispatch(
        updateRolePermissions({
          updatePath: `/roles/${id}/tasks`,
          updateData: data,
        })
      );
      if (res.payload.status === "ok") {
        toast.success("نقش با موفقیت دخیره شد");
        history.push(`/roles`);
      }
    } catch (err) {
      toast.error("اضافه کردن نقش با خطا مواجه شد");
      throw err;
    }
  };
  const match = [
    {
      path: "/",
      text: "کاربران",
    },
    {
      path: "/roles",
      text: "مدیریت نقش ها",
    },
    {
      path: history.location.pathname,
      text: "اضافه کردن وظیفه",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      <Colxx xxs="12">
        <div className="d-flex justify-content-between align-items-center">
          <Breadcrumb title="اضافه کردن وظیفه" list={match} />

          <Button
            color="primary"
            size="lg"
            className="top-right-button mr-5"
            onClick={addTasksHandler}
          >
            ذخیره
          </Button>
        </div>
        {!loading && (
          <Card className="mb-4">
            <CardBody className={styles["auto-scroll"]}>
              <div>
                <div className="search-sm d-inline-block mr-1 mb-4 align-top w-40 ">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    className="w-100"
                    value={searchInput}
                    onChange={searchHandler}
                  />
                </div>
                <Separator className="mb-5" />
              </div>
              <div className={styles["permission-container"]}>
                {allTasksState?.map((task) => {
                  const isChecked = tasks.some((p) => task.id === p.id);
                  return (
                    <div
                      key={task.id}
                      className="d-flex align-items-center w-50 justify-content-between"
                    >
                      <span>{task.name}</span>
                      <Switch
                        className="custom-switch custom-switch-secondary ml-5"
                        onChange={(e) => changeHandler(e, task.id)}
                        checked={isChecked}
                      />
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        )}
      </Colxx>
    </Layout>
  );
};
export default AddRolesTasks;
