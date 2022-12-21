import Alert from "components/custom/alert";

const nums = [1, 2];

export default function HomeNotifications() {
  const renderNotifItems = nums.map((num) => (
    <Alert
      key={num}
      color="danger"
      content="test test test test test test test test"
    />
  ));
  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col-12">
          <h3>اعلانات</h3>
          <div className="radius min-h-100 p-4">{renderNotifItems}</div>
        </div>
      </div>
    </div>
  );
}
