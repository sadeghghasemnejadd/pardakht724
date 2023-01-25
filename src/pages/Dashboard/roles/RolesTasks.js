import { Card, CardBody } from "reactstrap";
import { Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./roles.module.css";
const RolesTasks = ({ data, isEdit, onDataChanged }) => {
  // گرفتن آیدی اصلی url
  const { id } = useParams();
  // استیت اینپوت سرپ
  const [searchInput, setSearchInput] = useState("");
  // استیت تمام اطلاعات
  const [allTasks, setAllTasks] = useState([]);
  // استیت تما اطلاعات
  const [tasks, setTasks] = useState([]);
  // گرفتن نام تمام اطلاعات
  useEffect(() => {
    onDataChanged({ tasks: tasks?.map((task) => task.name) });
  }, [tasks]);
  // تابع هندل کردن سرچ
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    setAllTasks(
      data.all_permissions.filter((task) => task.name.includes(e.target.value))
    );
  };
  // تابع هندل کردن تغییر سوویچ ها
  const changeHandler = (e, taskId) => {
    if (!e) {
      setTasks((prev) => prev.filter((p) => p.id !== taskId));
    } else {
      setTasks((prev) => [...prev, allTasks.find((p) => p.id === taskId)]);
    }
  };
  return (
    <Card className="mb-4">
      <CardBody className={styles["auto-scroll"]}>
        {/* سرچ */}
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
        {/* سوییچ ها */}
        <div className={styles["task-container"]}>
          {allTasks?.map((task) => {
            const isChecked = tasks.some((p) => task.id === p.id);
            return (
              <div key={task.id} className="d-flex align-items-center w-50">
                <span>{task.name}</span>
                <Switch
                  className="custom-switch custom-switch-secondary ml-5"
                  checked={isChecked}
                  disabled={!isEdit}
                  onChange={(e) => changeHandler(e, task.id)}
                />
              </div>
            );
          })}
          {allTasks?.length === 0 && (
            <div>
              <p>
                به این نقش هنوز دسترسی داده نشده برای ایجاد دسترسی جدید روی لینک
                زیر کلیک کنید:{" "}
              </p>
              <Link
                to={{
                  pathname: `/roles/addrole/${id}/permissions`,
                  state: { fromDashboard: true },
                }}
                ss="ss"
              >
                لینک
              </Link>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
  // return <p>در حال تکمیل</p>;
};
export default RolesTasks;
