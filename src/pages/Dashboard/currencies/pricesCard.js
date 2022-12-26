import { Card, CardBody, CardHeader } from "reactstrap";

const PricesCard = ({ title, sell, buy }) => {
  return (
    <Card className="w-30 bg-primary">
      <CardHeader className="text-center">
        <h3 className="mt-3 text-primary-2">{title}:</h3>
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-between">
          <p className="text-primary-2 h6">فروش:</p>
          <p>{sell}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-primary-2 h6">خرید:</p>
          <p>{buy}</p>
        </div>
      </CardBody>
    </Card>
  );
};
export default PricesCard;
