import Layout from "layout/AppLayout";
import {
  Button,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
} from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { NavLink, useParams, useHistory } from "react-router-dom";
import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRole } from "redux-toolkit/RolesSlice";
import { toast } from "react-toastify";
const AddRoles = () => {
  const [data, setData] = useState({ type: 0 });
  const { loading } = useSelector((store) => store.roles);
  const dispatch = useDispatch();
  const history = useHistory();
  const addRoleHandler = async () => {
    try {
      const res = await dispatch(addRole(data));
      if (res.payload.status === "ok") {
        toast.success("نقش با موفقیت دخیره شد");
        history.push("/roles");
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
              اضافه کردن نقش
            </span>
          </h1>
          <Button
            color="primary"
            size="lg"
            className="top-right-button mr-5"
            onClick={addRoleHandler}
          >
            دخیره
          </Button>
        </div>
        {!loading && (
          <Card className="mb-4">
            <CardBody>
              <div className="d-flex align-items-center">
                <InputGroup size="sm" className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">نام نقش</span>
                  </InputGroupAddon>
                  <Input
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        p_name: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
                <div className="ml-5 d-flex justify-content-between w-50 align-items-center">
                  <p>نوع نقش:</p>
                  <select
                    className="form-select rounded p-2 border-primary"
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        type:
                          e.target.value === "همکار"
                            ? 1
                            : e.target.value === "مشتری"
                            ? 0
                            : 2,
                      }))
                    }
                  >
                    <option value="مشتری">مشتری</option>
                    <option value="همکار">همکار</option>
                    <option value="کارمند">کارمند</option>
                  </select>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <InputGroup size="sm" className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">برچسب</span>
                  </InputGroupAddon>
                  <Input
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
                <div className="ml-5 d-flex justify-content-between w-50 align-items-center">
                  <p>وضعیت:</p>
                  <select
                    className="form-select rounded p-2 border-primary"
                    onChange={(e) => {}}
                  >
                    <option value="فعال">فعال</option>
                    <option value="غیر فعال">غیر فعال</option>
                  </select>
                </div>
              </div>
              <div>
                <InputGroup className="w-100">
                  <InputGroupAddon addonType="prepend">توضیحات</InputGroupAddon>
                  <Input
                    type="textarea"
                    name="text"
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </div>
            </CardBody>
          </Card>
        )}
      </Colxx>
    </Layout>
  );
};
export default AddRoles;
