import { useParams } from "react-router-dom";
import Layout from "layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useRef, useState } from "react";
import { getAllPermissions } from "redux-toolkit/permissionsSlice";
import styles from "./roles.module.css";
const AddRolePermissions = () => {
  const { id } = useParams();
  const { loading } = useSelector((store) => store.permissions);
  const dispatch = useDispatch();
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
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      <Colxx xxs="12">
        <div className="d-flex justify-content-between align-items-center">
          <h1>
            <span className="align-middle d-inline-block pt-1">
              اضافه کردن نقش
            </span>
          </h1>
          <Button
            color="primary"
            size="lg"
            className="top-right-button mr-5"
            // onClick={addRoleHandler}
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
                  />
                </div>
                <Separator className="mb-5" />
              </div>
              <div className={styles["permission-container"]}>
                {/* {allPermissions?.map((permit) => {
              const isChecked = permissions.some((p) => permit.id === p.id);
              return (
                <div
                  key={permit.id}
                  className="d-flex align-items-center w-50 justify-content-between"
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
            })} */}
              </div>
            </CardBody>
          </Card>
        )}
      </Colxx>
    </Layout>
  );
};

export default AddRolePermissions;
