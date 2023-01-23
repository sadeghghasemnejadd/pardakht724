import { useParams, useHistory } from "react-router-dom";
import Layout from "layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useState } from "react";
import { getAllTasks } from "redux-toolkit/TasksSlice";
import styles from "./roles.module.css";
import { toast } from "react-toastify";
import Breadcrumb from "components/custom/Breadcrumb";
const AddRolesTasks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // گرفتن id از url
  const { id } = useParams();
  // گرفتن اطلاعات از ریداکس
  const { loading, allTasks } = useSelector((store) => store.tasks);
  // استیت اینپوت سرچ
  const [searchInput, setSearchInput] = useState("");
  // استیت گرفتن تمام اطلاعات
  const [allTasksState, setAllTasksState] = useState([]);
  // استیت گرفتن تمام دیتا ها
  const [tasks, setTasks] = useState([]);
  // دیتا های اولیه هبرای اضافه کردن دیتای جدید
  const [data, setData] = useState(null);
  // گرفتن اطلاعات از دیتا بیس
  useEffect(() => {
    fetchTasks();
  }, []);
  // گرفتن نام های دیتا
  useEffect(() => {
    setData({ tasks: tasks.map((task) => task.id) });
  }, [tasks]);
  // ذخیره تمام دیتا ها در استیت مربوطه
  useEffect(() => {
    setAllTasksState(allTasks);
  }, [allTasks]);
  // تابع گرفتن اطلاعات از دیتابیس
  const fetchTasks = async () => {
    try {
      const res = await dispatch(getAllTasks());
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن سرچ
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    setAllTasksState(
      allTasks.filter((task) => task.name.includes(e.target.value))
    );
  };
  // تابع هندل کردن تغییر سوییچ ها
  const changeHandler = (e, taskId) => {
    if (!e) {
      setTasks((prev) => prev.filter((p) => p.id !== taskId));
    } else {
      setTasks((prev) => [...prev, allTasksState.find((p) => p.id === taskId)]);
    }
  };
  // تابع هندل کردن اضافه کردن دیتای جدید
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
  // بردکرامب های صفحه
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
          {/* برد کرامب صحفه و عنوان
          ورودی ها:
          title:عنوان 
          list:برد کرامب
          */}
          <Breadcrumb title="اضافه کردن وظیفه" list={match} />
          {/* دکمه ذخیره */}
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
            {/* اینپوت هایی برای گرفتن اطلاعات اضافه کردن دیتای جدید */}
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
