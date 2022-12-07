import {
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormGroup,
} from "reactstrap";
import React, { useState } from "react";

const RolesDetail = ({ data }) => {
  const [inputsValue, setInputsValue] = useState({
    p_name: data.p_name,
    name: data.name,
    type: data.type == 0 ? "مشتری" : data.type == 1 ? "کارمند" : "همکار",
    description: data.description,
    type: "فعال",
  });

  return (
    <Card className="mb-4">
      <CardBody>
        <div className="d-flex align-items-center">
          <InputGroup size="sm" className="mb-3">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">نام نقش</span>
            </InputGroupAddon>
            <Input
              value={inputsValue.p_name || ""}
              onChange={(e) =>
                setInputsValue((prev) => ({ ...prev, p_name: e.target.value }))
              }
            />
          </InputGroup>
          <div className="ml-5 d-flex justify-content-between w-50 align-items-center">
            <p>نوع نقش:</p>
            <select
              className="form-select rounded p-2 border-primary"
              value={inputsValue.type}
              disabled
              onChange={(e) =>
                setInputsValue((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="همکار">همکار</option>
              <option value="مشتری">مشتری</option>
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
              value={inputsValue.name || ""}
              onChange={(e) =>
                setInputsValue((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </InputGroup>
          <div className="ml-5 d-flex justify-content-between w-50 align-items-center">
            <p>وضعیت:</p>
            <select
              className="form-select rounded p-2 border-primary"
              value={inputsValue.status}
              disabled
              onChange={(e) =>
                setInputsValue((prev) => ({ ...prev, status: e.target.value }))
              }
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
              value={inputsValue.description || ""}
              onChange={(e) =>
                setInputsValue((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </InputGroup>
        </div>
      </CardBody>
    </Card>
  );
};
export default RolesDetail;
