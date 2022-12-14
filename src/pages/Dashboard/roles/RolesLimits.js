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
              <th className="text-center w-20">تعداد سفارشات مجاز روزانه</th>
              <th className="text-center w-20">سقف تومان روزانه سفارش</th>
              <th className="w-10 text-center">وضعیت محدودیت</th>
              <th className="w-10 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>خرید با پی پال</td>
              <td className="text-center ">
                {isEdit && (
                  <InputGroup className="w-60 mx-auto">
                    <Input className="min-h-30 w-60" value="3" />{" "}
                    <InputGroupAddon addonType="prepend ">
                      <span className="input-group-text">تعداد</span>
                    </InputGroupAddon>
                  </InputGroup>
                )}{" "}
                {isEdit || "3"}
              </td>
              <td className="text-center">
                {isEdit && (
                  <InputGroup className="w-70 mx-auto">
                    <Input className="min-h-30 w-60" value="500000" />{" "}
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">تومان</span>
                    </InputGroupAddon>
                  </InputGroup>
                )}{" "}
                {isEdit || "500,000 تومان"}
              </td>
              <td className="">
                <Switch
                  className="custom-switch custom-switch-secondary mx-auto"
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
                    <div
                      className={`glyph-icon simple-icon-pencil text-center`}
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>خرید با پی پال</td>
              <td className="text-center ">
                {isEdit && (
                  <InputGroup className="w-60 mx-auto">
                    <Input className="min-h-30 w-60" value="3" />{" "}
                    <InputGroupAddon addonType="prepend ">
                      <span className="input-group-text">تعداد</span>
                    </InputGroupAddon>
                  </InputGroup>
                )}{" "}
                {isEdit || "3"}
              </td>
              <td className="text-center">
                {isEdit && (
                  <InputGroup className="w-70 mx-auto">
                    <Input className="min-h-30 w-60" value="500000" />{" "}
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">تومان</span>
                    </InputGroupAddon>
                  </InputGroup>
                )}{" "}
                {isEdit || "500,000 تومان"}
              </td>
              <td className="">
                <Switch
                  className="custom-switch custom-switch-secondary mx-auto"
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
                    <div
                      className={`glyph-icon simple-icon-pencil text-center`}
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>خرید با پی پال</td>
              <td className="text-center ">
                {isEdit && (
                  <InputGroup className="w-60 mx-auto">
                    <Input className="min-h-30 w-60" value="3" />{" "}
                    <InputGroupAddon addonType="prepend ">
                      <span className="input-group-text">تعداد</span>
                    </InputGroupAddon>
                  </InputGroup>
                )}{" "}
                {isEdit || "3"}
              </td>
              <td className="text-center">
                {isEdit && (
                  <InputGroup className="w-70 mx-auto">
                    <Input className="min-h-30 w-60" value="500000" />{" "}
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">تومان</span>
                    </InputGroupAddon>
                  </InputGroup>
                )}{" "}
                {isEdit || "500,000 تومان"}
              </td>
              <td className="">
                <Switch
                  className="custom-switch custom-switch-secondary mx-auto"
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
                    <div
                      className={`glyph-icon simple-icon-pencil text-center`}
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>خرید با پی پال</td>
              <td className="text-center ">
                {isEdit && (
                  <InputGroup className="w-60 mx-auto">
                    <Input className="min-h-30 w-60" value="3" />{" "}
                    <InputGroupAddon addonType="prepend ">
                      <span className="input-group-text">تعداد</span>
                    </InputGroupAddon>
                  </InputGroup>
                )}{" "}
                {isEdit || "3"}
              </td>
              <td className="text-center">
                {isEdit && (
                  <InputGroup className="w-70 mx-auto">
                    <Input className="min-h-30 w-60" value="500000" />{" "}
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">تومان</span>
                    </InputGroupAddon>
                  </InputGroup>
                )}{" "}
                {isEdit || "500,000 تومان"}
              </td>
              <td className="">
                <Switch
                  className="custom-switch custom-switch-secondary mx-auto"
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
                    <div
                      className={`glyph-icon simple-icon-pencil text-center`}
                    />
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
