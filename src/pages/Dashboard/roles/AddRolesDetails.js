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
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRole, getAllRoles } from "redux-toolkit/RolesSlice";
import { toast } from "react-toastify";
import Breadcrumb from "components/custom/Breadcrumb";
import checkPersian from "components/custom/validation/checkPersian";
import checkUnique from "components/custom/validation/checkUnique";
import checkCountCharacters from "components/custom/validation/checkCountCharacters";
const AddRolesDetails = () => {
  const [data, setData] = useState({ type: 0 });
  const { loading, roles } = useSelector((store) => store.roles);
  const dispatch = useDispatch();
  const history = useHistory();
  const [pNameValidation, setPNameValidation] = useState({
    status: true,
    message: "",
  });
  const [nameValidation, setNameValidation] = useState({
    status: false,
    message: "برچسب نباید خالی باشد",
  });
  const [descriptionValidation, setDescriptionVAlidation] = useState({
    status: true,
    message: "",
  });
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);
  const fetchRoles = async () => {
    try {
      await dispatch(getAllRoles());
    } catch (err) {
      throw err;
    }
  };
  const addRoleHandler = async () => {
    try {
      const res = await dispatch(addRole(data));
      if (res.payload.status === "ok") {
        toast.success("نقش با موفقیت دخیره شد");
        history.push(`/roles/addrole/${res.payload.role.id}/permissions`);
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
      text: "اضافه کردن نقش",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      <Colxx xxs="12">
        <div className="d-flex justify-content-between align-items-center">
          <Breadcrumb title="اضافه کردن نقش" list={match} />

          <Button
            color="primary"
            size="lg"
            className="top-right-button mr-5"
            onClick={() => {
              if (
                !pNameValidation.status ||
                !!nameValidation.status ||
                !descriptionValidation.status
              ) {
                return;
              } else {
                addRoleHandler();
              }
            }}
          >
            ذخیره
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
                  <div className="flex-grow-1 pos-rel">
                    <Input
                      onChange={(e) => {
                        if (!e.target.value) {
                          setPNameValidation({
                            status: true,
                            message: "",
                          });
                        } else {
                          setPNameValidation({
                            status: checkPersian(e.target.value),
                            message: "نام باید فارسی باشد",
                          });
                        }

                        setData((prev) => ({
                          ...prev,
                          p_name: e.target.value,
                        }));
                      }}
                    />
                    {pNameValidation.status || (
                      <div className="invalid-feedback d-block">
                        {pNameValidation.message}
                      </div>
                    )}
                  </div>
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
                  <div className="flex-grow-1 pos-rel">
                    <Input
                      onChange={(e) => {
                        if (!e.target.value) {
                          setNameValidation({
                            status: false,
                            message: "برجسب نقش نباید خالی باشد",
                          });
                          return;
                        } else if (checkUnique(roles, "name", e.target.value)) {
                          setNameValidation({
                            status: false,
                            message: "برچسب نقش باید یکتا باشد",
                          });
                          return;
                        } else {
                          setNameValidation({
                            status: true,
                            message: "",
                          });
                        }
                        setData((prev) => ({
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
                  <div className="flex-grow-1 pos-rel">
                    <Input
                      type="textarea"
                      name="text"
                      onChange={(e) => {
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
                        setData((prev) => ({
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
            </CardBody>
          </Card>
        )}
      </Colxx>
    </Layout>
  );
};
export default AddRolesDetails;
