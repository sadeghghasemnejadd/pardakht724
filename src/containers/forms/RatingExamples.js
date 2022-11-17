import React from "react";
import { Row } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import Rating from "components/common/Rating";

const RatingExamples = () => {
  return (
    <Row>
      <Colxx xxs="12" sm="6">
        <label>Interactive</label>
        <Rating total={5} rating={0} onRate={(rating) => {}} />
      </Colxx>
      <Colxx xxs="12" sm="6">
        <label>Readonly</label>
        <Rating total={5} rating={5} interactive={false} />
      </Colxx>
    </Row>
  );
};
export default RatingExamples;
