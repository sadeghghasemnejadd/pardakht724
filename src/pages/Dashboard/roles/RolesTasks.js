import { Card, CardBody, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { Separator } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import React, { useEffect, useRef, useState } from "react";
import styles from "./roles.module.css";
const RolesTasks = ({ data, isEdit, onDataChanged }) => {
  // console.log(data);
  // const [searchInput, setSearchInput] = useState("");
  // const [allTasks, setAllTasks] = useState([]);
  // const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   setAllTasks(data.all_tasks);
  //   setPermissions(data.tasks);
  // }, [data]);
  // useEffect(() => {
  //   onDataChanged({ tasks: tasks.map((task) => task.name) });
  // }, [tasks]);

  // const searchHandler = (e) => {
  //   setSearchInput(e.target.value);
  //   setAllTasks(
  //     data.all_permissions.filter((task) =>
  //       task.name.includes(e.target.value)
  //     )
  //   );
  // };
  // const changeHandler = (e, taskId) => {
  //   if (!e) {
  //     setTasks((prev) => prev.filter((p) => p.id !== taskId));
  //   } else {
  //     setTasks((prev) => [
  //       ...prev,
  //       allTasks.find((p) => p.id === taskId),
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
  //       <div className={styles["task-container"]}>
  //         {allTasks?.map((task) => {
  //           const isChecked = tasks.some((p) => task.id === p.id);
  //           return (
  //             <div key={task.id} className="d-flex align-items-center w-50">
  //               <span>{task.name}</span>
  //               <Switch
  //                 className="custom-switch custom-switch-secondary ml-5"
  //                 checked={isChecked}
  //                 disabled={!isEdit}
  //                 onChange={(e) => changeHandler(e, task.id)}
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
