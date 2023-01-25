import { Card, CardBody } from "reactstrap";
import { Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useState } from "react";
import styles from "./roles.module.css";
import { Link, useParams } from "react-router-dom";
const RolesAccesses = ({ data, isEdit, onDataChanged }) => {
  // استیت اینپوت سرچ
  const [searchInput, setSearchInput] = useState("");
  // استیت همه دیتا ها
  const [allPermissionsState, setAllPermissionsState] = useState([]);
  // استیت دیتا ها
  const [permissions, setPermissions] = useState([]);
  // ایدی اصلی url
  const { id } = useParams();
  // گرفتن دیتای اصلی صحفه
  useEffect(() => {
    setAllPermissionsState(data.allPermissions);
    setPermissions(data.permissions);
  }, [data.allPermissions]);
  // گرفتن نام permissions
  useEffect(() => {
    onDataChanged({ permissions: permissions.map((permit) => permit.name) });
  }, [permissions]);
  // تابع هندل کردن سرچ
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    setAllPermissionsState(
      data.allPermissions.filter((permit) =>
        permit.name.includes(e.target.value)
      )
    );
  };
  // تابع هندل کردن تغییر فیلتر
  const changeHandler = (e, permissionId) => {
    if (!e) {
      setPermissions((prev) => prev.filter((p) => p.id !== permissionId));
    } else {
      setPermissions((prev) => [
        ...prev,
        allPermissionsState.find((p) => p.id === permissionId),
      ]);
    }
  };
  return (
    <Card className="mb-4">
      <CardBody className={styles["auto-scroll"]}>
        <div>
          {/* قسمت سرچ */}
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
        {/* قسمت سوییچ ها */}
        <div className={styles["permission-container"]}>
          {allPermissionsState?.map((permit) => {
            const isChecked = permissions.some((p) => permit.id === p.id);
            return (
              <div
                key={permit.id}
                className="d-flex align-items-center w-55 justify-content-between"
              >
                <span>{permit.name}</span>
                <Switch
                  className="custom-switch custom-switch-secondary ml-5"
                  checked={isChecked}
                  disabled={!isEdit}
                  onChange={(e) => changeHandler(e, permit.id)}
                />
              </div>
            );
          })}
          {allPermissionsState.length === 0 && (
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
};
export default RolesAccesses;
