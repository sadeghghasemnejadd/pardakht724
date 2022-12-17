import { useParams, useHistory } from "react-router-dom";
import Layout from "layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useState } from "react";
import {
  getAllPermissions,
  updateRolePermissions,
} from "redux-toolkit/permissionsSlice";
import styles from "./roles.module.css";
import { toast } from "react-toastify";
const AddRolePermissions = () => {
  const { id } = useParams();
  const { loading, allPermissions } = useSelector((store) => store.permissions);
  const [searchInput, setSearchInput] = useState("");
  const [allPermissionsState, setAllPermissionsState] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchPermissions = async () => {
    try {
      await dispatch(getAllPermissions());
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    fetchPermissions();
  }, []);
  useEffect(() => {
    setData({ permissions: permissions.map((permit) => permit.name) });
  }, [permissions]);
  useEffect(() => {
    setAllPermissionsState(allPermissions);
  }, [allPermissions]);
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    setAllPermissionsState(
      allPermissions.filter((permit) => permit.name.includes(e.target.value))
    );
  };
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
  const addPermissionsHandler = async () => {
    try {
      const res = await dispatch(
        updateRolePermissions({
          updatePath: `/roles/${id}/permissions`,
          updateData: data,
        })
      );
      if (res.payload.status === "ok") {
        toast.success("نقش با موفقیت دخیره شد");
        if (history.location.state?.fromDashboard) {
          history.push(`/roles`);
        } else {
          history.push(`/roles/addrole/${id}/tasks`);
        }
      }
    } catch (err) {
      toast.error("اضافه کردن نقش با خطا مواجه شد");
      throw err;
    }
  };
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      <Colxx xxs="12">
        <div className="d-flex justify-content-between align-items-center">
          <h1>
            <span className="align-middle d-inline-block pt-1">
              اضافه کردن دسترسی
            </span>
          </h1>
          <Button
            color="primary"
            size="lg"
            className="top-right-button mr-5"
            onClick={addPermissionsHandler}
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
                {allPermissionsState?.map((permit) => {
                  const isChecked = permissions.some((p) => permit.id === p.id);
                  return (
                    <div
                      key={permit.id}
                      className="d-flex align-items-center w-50 justify-content-between"
                    >
                      <span>{permit.name}</span>
                      <Switch
                        className="custom-switch custom-switch-secondary ml-5"
                        onChange={(e) => changeHandler(e, permit.id)}
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

export default AddRolePermissions;
