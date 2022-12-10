import { Card, CardBody, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useRef, useState } from "react";
import styles from "./roles.module.css";
const RolesTasks = ({ data, isEdit, onDataChanged }) => {
  // console.log(data);
  // const [searchInput, setSearchInput] = useState("");
  // const [allPermissions, setAllPermissions] = useState([]);
  // const [permissions, setPermissions] = useState([]);
  // useEffect(() => {
  //   setAllPermissions(data.all_permissions);
  //   setPermissions(data.permissions);
  // }, [data]);
  // useEffect(() => {
  //   onDataChanged({ permissions: permissions.map((permit) => permit.name) });
  // }, [permissions]);

  // const searchHandler = (e) => {
  //   setSearchInput(e.target.value);
  //   setAllPermissions(
  //     data.all_permissions.filter((permit) =>
  //       permit.name.includes(e.target.value)
  //     )
  //   );
  // };
  // const changeHandler = (e, permissionId) => {
  //   if (!e) {
  //     setPermissions((prev) => prev.filter((p) => p.id !== permissionId));
  //   } else {
  //     setPermissions((prev) => [
  //       ...prev,
  //       allPermissions.find((p) => p.id === permissionId),
  //     ]);
  //   }
  // };
  // return (
  //   <Card className="mb-4">
  //     <CardBody className={styles["auto-scroll"]}>
  //       <div>
  //         <div className="search-sm d-inline-block mr-1 mb-4 align-top w-40 ">
  //           <input
  //             type="text"
  //             name="keyword"
  //             id="search"
  //             className="w-100"
  //             value={searchInput}
  //             onChange={searchHandler}
  //           />
  //         </div>
  //         <Separator className="mb-5" />
  //       </div>
  //       <div className={styles["permission-container"]}>
  //         {allPermissions?.map((permit) => {
  //           const isChecked = permissions.some((p) => permit.id === p.id);
  //           return (
  //             <div key={permit.id} className="d-flex align-items-center w-50">
  //               <span>{permit.name}</span>
  //               <Switch
  //                 className="custom-switch custom-switch-secondary ml-5"
  //                 checked={isChecked}
  //                 disabled={!isEdit}
  //                 onChange={(e) => changeHandler(e, permit.id)}
  //               />
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </CardBody>
  //   </Card>
  // );
  return <p>در حال تکمیل</p>;
};
export default RolesTasks;
