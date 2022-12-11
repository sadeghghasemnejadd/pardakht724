import {
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Table,
} from "reactstrap";
import { Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useRef, useState } from "react";
import styles from "./roles.module.css";
const RolesLimits = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const searchHandler = (e) => {
    // setSearchInput(e.target.value);
    // setAllTasks(
    //   data.all_permissions.filter((task) =>
    //     task.name.includes(e.target.value)
    //   )
    // );
  };
  return (
    <Card className="mb-4">
      <CardBody>
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
        <Table striped>
          <thead>
            <tr>
              <th className="w-40">نام خدمت/ محصول</th>
              <th className="text-center">تعداد سفارشات مجاز روزانه</th>
              <th className="text-center">سقف تومان روزانه سفارش</th>
              <th className="">وضعیت محدودیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>خرید با پی پال</td>
              <td className="text-center">
                {isEdit && <input type="text" value="3" />} {isEdit || "3"}
              </td>
              <td className="text-center">
                {isEdit && <input type="text" value="500000" />}{" "}
                {isEdit || "500,000"} تومان
              </td>
              <td className="">
                <Switch
                  className="custom-switch custom-switch-secondary ml-5"
                  checked={true}
                  disabled={false}
                />
              </td>
              <td className="h3">
                {isEdit && (
                  <div className="d-flex justify-content-around">
                    <div
                      className="glyph"
                      style={{ color: "green", cursor: "pointer" }}
                    >
                      <div className={`glyph-icon simple-icon-check`} />
                    </div>
                    <div
                      className="glyph"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => setIsEdit(false)}
                    >
                      <div className={`glyph-icon simple-icon-close`} />
                    </div>
                  </div>
                )}
                {isEdit || (
                  <div
                    className="glyph"
                    onClick={() => setIsEdit(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={`glyph-icon simple-icon-pencil`} />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>خرید با پی پال</td>
              <td className="text-center">
                {isEdit && <input type="text" value="3" />} {isEdit || "3"}
              </td>
              <td className="text-center">
                {isEdit && <input type="text" value="500000" />}{" "}
                {isEdit || "500,000"} تومان
              </td>
              <td className="">
                <Switch
                  className="custom-switch custom-switch-secondary ml-5"
                  checked={true}
                  disabled={false}
                />
              </td>
              <td className="h3">
                {isEdit && (
                  <div className="d-flex justify-content-around">
                    <div
                      className="glyph"
                      style={{ color: "green", cursor: "pointer" }}
                    >
                      <div className={`glyph-icon simple-icon-check`} />
                    </div>
                    <div
                      className="glyph"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => setIsEdit(false)}
                    >
                      <div className={`glyph-icon simple-icon-close`} />
                    </div>
                  </div>
                )}
                {isEdit || (
                  <div
                    className="glyph"
                    onClick={() => setIsEdit(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={`glyph-icon simple-icon-pencil`} />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>خرید با پی پال</td>
              <td className="text-center">
                {isEdit && <input type="text" value="3" />} {isEdit || "3"}
              </td>
              <td className="text-center">
                {isEdit && <input type="text" value="500000" />}{" "}
                {isEdit || "500,000"} تومان
              </td>
              <td className="">
                <Switch
                  className="custom-switch custom-switch-secondary ml-5"
                  checked={true}
                  disabled={false}
                />
              </td>
              <td className="h3">
                {isEdit && (
                  <div className="d-flex justify-content-around">
                    <div
                      className="glyph"
                      style={{ color: "green", cursor: "pointer" }}
                    >
                      <div className={`glyph-icon simple-icon-check`} />
                    </div>
                    <div
                      className="glyph"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => setIsEdit(false)}
                    >
                      <div className={`glyph-icon simple-icon-close`} />
                    </div>
                  </div>
                )}
                {isEdit || (
                  <div
                    className="glyph"
                    onClick={() => setIsEdit(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={`glyph-icon simple-icon-pencil`} />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>خرید با پی پال</td>
              <td className="text-center">
                {isEdit && <input type="text" value="3" />} {isEdit || "3"}
              </td>
              <td className="text-center">
                {isEdit && <input type="text" value="500000" />}{" "}
                {isEdit || "500,000"} تومان
              </td>
              <td className="">
                <Switch
                  className="custom-switch custom-switch-secondary ml-5"
                  checked={true}
                  disabled={false}
                />
              </td>
              <td className="h3">
                {isEdit && (
                  <div className="d-flex justify-content-around">
                    <div
                      className="glyph"
                      style={{ color: "green", cursor: "pointer" }}
                    >
                      <div className={`glyph-icon simple-icon-check`} />
                    </div>
                    <div
                      className="glyph"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => setIsEdit(false)}
                    >
                      <div className={`glyph-icon simple-icon-close`} />
                    </div>
                  </div>
                )}
                {isEdit || (
                  <div
                    className="glyph"
                    onClick={() => setIsEdit(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={`glyph-icon simple-icon-pencil`} />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
export default RolesLimits;
