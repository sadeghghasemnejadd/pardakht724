/* eslint-disable no-alert */
import React from "react";
import { Card, CardBody, CardTitle, Button, CardSubtitle } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { NotificationManager } from "components/common/react-notifications";

const NotificationExamples = () => {
  const createNotification = (type, className) => {
    const cName = className || "";
    switch (type) {
      case "primary":
        NotificationManager.primary(
          "This is a notification!",
          "Primary Notification",
          3000,
          null,
          null,
          cName
        );
        break;
      case "secondary":
        NotificationManager.secondary(
          "This is a notification!",
          "Secondary Notification",
          3000,
          null,
          null,
          cName
        );
        break;
      case "info":
        NotificationManager.info("Info message", "", 3000, null, null, cName);
        break;
      case "success":
        NotificationManager.success(
          "Success message",
          "Title here",
          3000,
          null,
          null,
          cName
        );
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000,
          null,
          null,
          cName
        );
        break;
      case "error":
        NotificationManager.error(
          "Error message",
          "Click me!",
          5000,
          () => {
            alert("callback");
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info("Info message");
        break;
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>React Notifications</CardTitle>
        <CardSubtitle>Outline</CardSubtitle>
        <Button
          outline
          className="mb-3"
          color="primary"
          onClick={() => createNotification("primary")}
        >
          Primary
        </Button>{" "}
        <Button
          outline
          className="mb-3"
          color="secondary"
          onClick={() => createNotification("secondary")}
        >
          Secondary
        </Button>{" "}
        <Button
          outline
          className="mb-3"
          color="info"
          onClick={() => createNotification("info")}
        >
          Info
        </Button>{" "}
        <Button
          outline
          className="mb-3"
          color="success"
          onClick={() => createNotification("success")}
        >
          <IntlMessages id="alert.success" />
        </Button>{" "}
        <Button
          outline
          className="mb-3"
          color="warning"
          onClick={() => createNotification("warning")}
        >
          Warning
        </Button>{" "}
        <Button
          outline
          className="mb-3"
          color="danger"
          onClick={() => createNotification("error")}
        >
          Error
        </Button>
        <CardSubtitle>Filled</CardSubtitle>
        <Button
          className="mb-3"
          color="primary"
          onClick={() => createNotification("primary", "filled")}
        >
          Primary
        </Button>{" "}
        <Button
          className="mb-3"
          color="secondary"
          onClick={() => createNotification("secondary", "filled")}
        >
          Secondary
        </Button>{" "}
        <Button
          className="mb-3"
          color="info"
          onClick={() => createNotification("info", "filled")}
        >
          Info
        </Button>{" "}
        <Button
          className="mb-3"
          color="success"
          onClick={() => createNotification("success", "filled")}
        >
          <IntlMessages id="alert.success" />
        </Button>{" "}
        <Button
          className="mb-3"
          color="warning"
          onClick={() => createNotification("warning", "filled")}
        >
          Warning
        </Button>{" "}
        <Button
          className="mb-3"
          color="danger"
          onClick={() => createNotification("error", "filled")}
        >
          Error
        </Button>
      </CardBody>
    </Card>
  );
};

export default NotificationExamples;
