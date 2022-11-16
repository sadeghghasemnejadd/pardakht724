import { useState } from "react";
import { Alert } from "reactstrap";

function AlertExample({ color, content }) {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  return (
    <Alert color={color} isOpen={visible} toggle={onDismiss} className="radius" >
      {content}
    </Alert>
  );
}

export default AlertExample;
