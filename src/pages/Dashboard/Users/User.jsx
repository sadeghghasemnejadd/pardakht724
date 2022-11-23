import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addUserRoles,
  getUserData,
  getUserRoles,
  removeUserRoles,
} from "redux-toolkit/UserSlice";
import { getAllRoles } from "redux-toolkit/RolesSlice";
import { client } from "services/client";
import Layout from "layout/AppLayout";
import styles from "./contact.module.css";
import "./../../../icomoon/style.css";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  Button,
} from "reactstrap";

import ImageCardList from "containers/ui/ImageCardList";

export default function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, user, userRoles } = useSelector((store) => store.users);
  const { roles } = useSelector((store) => store.roles);
  const [isEdit, setIsEdit] = useState({ enable: false, roleId: 0 });
  const rolesRef = useRef();
  const handleSetEmployee = () => {
    client
      .post(
        "/users/set-employee",
        { user_id: id, set_employee: true },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status_code === 200) {
        }
      });
  };
  const fetchUserRoles = async () => {
    try {
      await dispatch(getUserRoles(id));
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getUserData(id));
        await fetchUserRoles();
        await dispatch(getAllRoles());
      } catch (err) {
        throw err;
      }
    };
    getData();
  }, []);
  const addRoleHandler = async (e) => {
    e.preventDefault();
    try {
      const selectedRole = document.querySelector("#role").value;
      const roleId = roles.find((role) => role.name === selectedRole).id;
      const res = await dispatch(addUserRoles({ id, roleId }));
      if (res.payload.status === "ok") {
        await fetchUserRoles();
        toast.success("نقش با موفقیت اضافه شد");
      }
    } catch (err) {
      toast.error("اضافه کردن نقش با خطا مواجه شد");
      throw err;
    }
  };
  const removeRoleHandler = async (e) => {
    try {
      const roleId = +e.target.dataset.id;
      const res = await dispatch(removeUserRoles({ userId: user.id, roleId }));
      if (res.payload.status === "ok") {
        await fetchUserRoles();
        toast.success("نقش با موفقیت حذف شد");
      }
    } catch (err) {
      toast.error("حذف نقش با خطا مواجه شد");
      throw err;
    }
  };
  const editRoleHandler = async (e) => {
    e.preventDefault();

    try {
      const lastRoleId = +e.target.dataset.id;
      const selectedRole = document.querySelector("#edit_role").value;
      const newRoleId = roles.find((role) => role.name === selectedRole).id;
      const res1 = await dispatch(
        removeUserRoles({ userId: user.id, roleId: lastRoleId })
      );
      const res2 = await dispatch(
        addUserRoles({ id: user.id, roleId: newRoleId })
      );
      if (res1.payload.status === "ok" && res2.payload.status === "ok") {
        setIsEdit({ enable: false, roleId: 0 });
        await fetchUserRoles();
        toast.success("نقش با موفقیت ویرایش شد");
      }
    } catch (err) {
      setIsEdit({ enable: false, roleId: 0 });
      toast.error("عملیات ویرایش نقش با خطا مواجه شد");
      throw err;
    }
  };
  // این متغییر حساب های کاربر را رندر می کند
  const renderPayAccounts = user?.pay_accounts?.map((account, index) => (
    <ImageCardList {...account} key={account.id} />
  ));
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div className="container">
          <div className={styles.contact}>
            <div className={styles.roles}>
              <h3 className={styles["roles__title"]}>نقش های کاربر</h3>
              <ul className={styles["roles__list"]}>
                {userRoles ? (
                  userRoles.map((role) => {
                    return (
                      <>
                        <li
                          key={role.id}
                          className={styles["roles__list--item"]}
                        >
                          {role.name}
                          <div className={styles["roles__list--item--icons"]}>
                            <span
                              className="icon-Remove"
                              data-id={role.id}
                              onClick={removeRoleHandler}
                            ></span>
                            <span
                              className="icon-Edit"
                              data-id={role.id}
                              onClick={(e) => {
                                const roleId = +e.target.dataset.id;
                                isEdit.enable
                                  ? setIsEdit({ enable: false, roleId: 0 })
                                  : setIsEdit({ enable: true, roleId });
                              }}
                            ></span>
                          </div>
                        </li>
                        {isEdit.enable && isEdit.roleId == role.id && (
                          <form
                            className={styles["roles__form"]}
                            onSubmit={editRoleHandler}
                            data-id={role.id}
                          >
                            <InputGroup className="mb-3">
                              <InputGroupAddon
                                addonType="prepend"
                                htmlFor="role"
                              >
                                ویرایش نقش
                              </InputGroupAddon>
                              <Input
                                list="edit_roles"
                                name="edit_role"
                                id="edit_role"
                                className={styles["rules__form--input"]}
                                ref={rolesRef}
                              />
                              <datalist
                                id="edit_roles"
                                className={styles["rules__form--list"]}
                              >
                                {user.is_employee &&
                                  roles
                                    .filter((opt) => opt.id >= 1 && opt.id <= 4)
                                    .map((opt) => {
                                      return (
                                        <option value={opt.name} key={opt.id}>
                                          {opt.id}
                                        </option>
                                      );
                                    })}
                                {roles
                                  .filter((opt) => opt.id > 4)
                                  .map((opt) => {
                                    return (
                                      <option value={opt.name} key={opt.id}>
                                        {opt.id}
                                      </option>
                                    );
                                  })}
                              </datalist>
                            </InputGroup>
                            <button className="btn btn-warning mb-5">
                              ویرایش
                            </button>
                          </form>
                        )}
                      </>
                    );
                  })
                ) : (
                  <p>نقشی وجود ندارد!</p>
                )}
              </ul>
              {roles && (
                <form
                  className={styles["roles__form"]}
                  onSubmit={addRoleHandler}
                >
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend" htmlFor="role">
                      اضافه کردن نقش
                    </InputGroupAddon>
                    <Input
                      list="roles"
                      name="role"
                      id="role"
                      className={styles["rules__form--input"]}
                      ref={rolesRef}
                    />
                    <datalist
                      id="roles"
                      className={styles["rules__form--list"]}
                    >
                      {user.is_employee &&
                        roles
                          .filter((opt) => opt.id >= 1 && opt.id <= 4)
                          .map((opt) => {
                            return (
                              <option value={opt.name} key={opt.id}>
                                {opt.id}
                              </option>
                            );
                          })}
                      {roles
                        .filter((opt) => opt.id > 4)
                        .map((opt) => {
                          return (
                            <option value={opt.name} key={opt.id}>
                              {opt.id}
                            </option>
                          );
                        })}
                    </datalist>
                  </InputGroup>
                  <button className="btn btn-primary mb-5">+</button>
                </form>
              )}
            </div>

            <div className={`bg-white w-75 radius py-4 ${styles.profile}`}>
              <CardBody>
                <div className="text-center">
                  <CardImg
                    top
                    src="/assets/img/profiles/l-1.jpg"
                    alt="Card image cap"
                    className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                  />

                  <CardSubtitle className="mb-1">{`${user.first_name} ${user.last_name}`}</CardSubtitle>

                  <CardText className="text-muted text-small mb-4">
                    {user.is_employee ? "کارمند" : "مشتری"}
                  </CardText>
                  {user?.agreement_verifying_status === "pending" && (
                    <div className="d-flex justify-content-center align-items-center">
                      <span>توافق نامه</span>
                      <NavLink to={`/users/${id}/agreement`}>
                        <Button
                          outline
                          size="sm"
                          color="primary"
                          className="mx-2"
                        >
                          بررسی
                        </Button>
                      </NavLink>
                    </div>
                  )}
                  {user?.national_id_verifying_status === "pending" && (
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={user?.profile?.national_id_front_pic.thumbnail}
                        alt=""
                      />
                      <span>کارت ملی</span>
                      <NavLink to={`/users/${id}/national-id`}>
                        <Button
                          outline
                          size="sm"
                          color="primary"
                          className="mx-2"
                        >
                          بررسی
                        </Button>
                      </NavLink>
                    </div>
                  )}
                  {user?.selfie_agreement_verifying_status === "pending" && (
                    <div className="d-flex justify-content-center align-items-center">
                      <img src={user?.profile?.national_id_front_pic} alt="" />
                      <span>سلفی و توافقنامه</span>
                      <NavLink to={`/users/${id}/selfie-agreement`}>
                        <Button
                          outline
                          size="sm"
                          color="primary"
                          className="mx-2"
                        >
                          بررسی
                        </Button>
                      </NavLink>
                    </div>
                  )}
                </div>
              </CardBody>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">شناسه</InputGroupAddon>
                <Input value={user.id} disabled />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">نام</InputGroupAddon>
                <Input value={user.first_name} disabled />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  نام خانوادگی
                </InputGroupAddon>
                <Input value={user.last_name} disabled />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">ایمیل</InputGroupAddon>
                <Input
                  value={user.email ? user.email : "ایمیلی وجود ندارد"}
                  disabled
                />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  شماره موبایل
                </InputGroupAddon>
                <Input value={user.mobile} disabled />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  تاریخ تولد
                </InputGroupAddon>
                <Input value={user.birth_day} disabled />
              </InputGroup>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-6">
              <div>
                <h4 className="mb-4">جزییات حساب</h4>
                <>{renderPayAccounts ? renderPayAccounts : "حسابی یافت نشد"}</>
              </div>
            </div>
            <div className="col-6">
              <h4 className="mb-4">جزییات تراکنش</h4>
              <></>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
