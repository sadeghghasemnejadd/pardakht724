import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  InputGroup,
  Input,
  InputGroupAddon,
  CustomInput,
} from "reactstrap";
import Switch from "rc-switch";
const ServicesDetails = ({ isEdit, data, onDataChanged }) => {
  const iconRef = useRef();
  const [editData, setEditData] = useState();
  useEffect(() => {
    setEditData(data);
  }, [data]);
  const uploadIcon = () => {};
  console.log(data);
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center mb-3">
          <InputGroup size="sm mr-5">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">نام سرویس</span>
            </InputGroupAddon>
            <Input
              value={editData?.name}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, name: e.target.value }));
                onDataChanged((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">اسلاگ</span>
            </InputGroupAddon>
            <Input
              value={editData?.slug}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, slug: e.target.value }));
                onDataChanged((prev) => ({
                  ...prev,
                  slug: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">آپلود آیکون</InputGroupAddon>
            {/* <div className="flex-grow-1 pos-rel"> */}
            <CustomInput
              type="file"
              id="icon"
              innerRef={iconRef}
              name="icon"
              onChange={uploadIcon}
              disabled={!isEdit}
            />
            {/* {iconValidation.status || (
                <div className="invalid-feedback d-block">
                  {iconValidation.message}
                </div>
              )} */}
            {/* </div> */}
          </InputGroup>
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputGroup size="sm mr-5">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">حداقل سود قابل قبول</span>
            </InputGroupAddon>
            <Input
              value={editData?.min_wage}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, min_wage: e.target.value }));
                onDataChanged((prev) => ({
                  ...prev,
                  min_wage: e.target.value,
                }));
              }}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">حداکثر سود قابل قبول</span>
            </InputGroupAddon>
            <Input
              value={editData?.max_wage}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, max_wage: e.target.value }));
                onDataChanged((prev) => ({
                  ...prev,
                  max_wage: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputGroup size="sm mr-5">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">حداقل میزان سفارش</span>
            </InputGroupAddon>
            <Input
              value={editData?.min_amount}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  min_amount: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  min_amount: e.target.value,
                }));
              }}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">حداکثر میزان سفارش</span>
            </InputGroupAddon>
            <Input
              value={editData?.max_amount}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  max_amount: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  max_amount: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputGroup size="sm mr-5">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">دقت محاسبه</span>
            </InputGroupAddon>
            <Input
              value={editData?.precision}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, precision: e.target.value }));
                onDataChanged((prev) => ({
                  ...prev,
                  precision: e.target.value,
                }));
              }}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">نوع دسترسی</span>
            </InputGroupAddon>
            <Input
              value={editData?.access_type}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  access_type: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  access_type: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputGroup size="sm mr-5">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">
                حداکثر تعداد پیوست های مشتری
              </span>
            </InputGroupAddon>
            <Input
              value={editData?.customer_max_attachment_count}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  customer_max_attachment_count: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  customer_max_attachment_count: e.target.value,
                }));
              }}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">
                حداکثر تعداد پیوست های کارمند
              </span>
            </InputGroupAddon>
            <Input
              value={editData?.employee_max_attachment_count}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  employee_max_attachment_count: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  employee_max_attachment_count: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputGroup size="sm mr-5">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">کارمزد خدمت</span>
            </InputGroupAddon>
            <Input
              value={editData?.order_fee}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, order_fee: e.target.value }));
                onDataChanged((prev) => ({
                  ...prev,
                  order_fee: e.target.value,
                }));
              }}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">حدکثر زمان انقضا فاکتور</span>
            </InputGroupAddon>
            <Input
              value={editData?.max_factor_expiration_time}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  max_factor_expiration_time: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  max_factor_expiration_time: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
        <div className="d-flex mb-3 justify-content-between mb-5">
          <div className="d-flex align-items-center">
            <p className="mr-2 mb-0">نوع کارمزد :</p>
            <Input
              bsSize="sm"
              className="w-50 min-h-15"
              type="select"
              style={{ borderRadius: 20 }}
              disabled={!isEdit}
              value={editData?.is_fee_percentage}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  is_fee_percentage: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  is_fee_percentage: e.target.value,
                }));
              }}
            >
              <option value={1}>درصدی</option>
              <option value={0}>تست</option>
            </Input>
          </div>
          <div className="d-flex align-items-center">
            <p className="mr-2 mb-0">نوع پردازش :</p>
            <Input
              bsSize="sm"
              className="w-50 min-h-15"
              type="select"
              style={{ borderRadius: 20 }}
              disabled={!isEdit}
              value={editData?.execution_type}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  execution_type: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  execution_type: e.target.value,
                }));
              }}
            >
              <option value={1}>دستی</option>
              <option value={0}>خودکار</option>
            </Input>
          </div>
          <div className="d-flex align-items-center">
            <p className="mr-2 mb-0">نحوه صدور فاکتور:</p>
            <Input
              bsSize="sm"
              className="w-50 min-h-15"
              type="select"
              style={{ borderRadius: 20 }}
              disabled={!isEdit}
              value={editData?.factor_creation_type}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  factor_creation_type: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  factor_creation_type: e.target.value,
                }));
              }}
            >
              <option value={0}>دستی</option>
              <option value={1}>خودکار</option>
            </Input>
          </div>
          <div className="d-flex align-items-center">
            <p className="mr-2 mb-0">نوع سرویس:</p>
            <Input
              bsSize="sm"
              className="w-50 min-h-15"
              type="select"
              style={{ borderRadius: 20 }}
              disabled={!isEdit}
              value={editData?.service_type}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  service_type: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  service_type: e.target.value,
                }));
              }}
            >
              <option value={0}>خرید</option>
              <option value={1}>تست</option>
            </Input>
          </div>
        </div>
        <div className="d-flex mb-3 justify-content-between mb-5">
          <div className="d-flex align-items-center">
            <p className="mb-0 mr-3">نمایش به کاربر</p>
            <Switch
              className="custom-switch custom-switch-secondary custom-switch-small"
              disabled={!isEdit}
              checked={editData?.can_show}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  can_show: e,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  can_show: e,
                }));
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 mr-3">امکان سفارش فقط از ایران</p>
            <Switch
              className="custom-switch custom-switch-secondary custom-switch-small"
              disabled={!isEdit}
              checked={editData?.from_iran}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  from_iran: e,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  from_iran: e,
                }));
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 mr-3">مخصوص کاربران معتمد</p>
            <Switch
              className="custom-switch custom-switch-secondary custom-switch-small"
              disabled={!isEdit}
              checked={editData?.only_trust_user}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  only_trust_user: e,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  only_trust_user: e,
                }));
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            <p className="mb-0 mr-3">وضعیت</p>
            <Switch
              className="custom-switch custom-switch-secondary custom-switch-small"
              disabled={!isEdit}
              checked={editData?.is_active}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  is_active: e,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  is_active: e,
                }));
              }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputGroup size="sm ">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">خدمت پایه</span>
            </InputGroupAddon>
            <Input
              value={editData?.base_service_id}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  base_service_id: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  base_service_id: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputGroup size="sm ">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">آدرس لندینگ</span>
            </InputGroupAddon>
            <Input
              value={editData?.landing_url}
              disabled={!isEdit}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  landing_url: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  landing_url: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
        <div>
          <InputGroup size="sm">
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">توضیحات</span>
            </InputGroupAddon>
            <Input
              type="textarea"
              rows="5"
              disabled={!isEdit}
              value={editData?.description}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
                onDataChanged((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </InputGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default ServicesDetails;
