import React, { useState } from "react";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Colxx } from "components/common/CustomBootstrap";

const DatePickerExamples = ({ intl }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());
  const [embeddedDate, setEmbeddedDate] = useState(new Date());
  const { messages } = intl;

  return (
    <Row>
      <Colxx xxs="12" xl="8" className="mb-4">
        <Card>
          <CardBody>
            <CardTitle>Date Picker</CardTitle>
            <label>Date</label>
            <div className="mb-5">
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                placeholderText="Date"
              />
            </div>
            <label>Date Range</label>
            <Row className="mb-5">
              <Colxx xxs="6">
                <DatePicker
                  selected={startDateRange}
                  selectsStart
                  startDate={startDateRange}
                  endDate={endDateRange}
                  onChange={setStartDateRange}
                  placeholderText="Start"
                />
              </Colxx>
              <Colxx xxs="6">
                <DatePicker
                  selected={endDateRange}
                  selectsEnd
                  startDate={startDateRange}
                  endDate={endDateRange}
                  onChange={setEndDateRange}
                  placeholderText="End"
                />
              </Colxx>
            </Row>
            <Row className="mb-5">
              <Colxx xxs="12">
                <label>Date with Time</label>
                <DatePicker
                  selected={startDateTime}
                  onChange={setStartDateTime}
                  placeholderText="Date"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="LLL"
                  timeCaption="Time"
                />
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </Colxx>

      <Colxx xxs="12" xl="4" className="mb-4">
        <Card className="h-100">
          <CardBody>
            <CardTitle>Embedded</CardTitle>
            <DatePicker
              calendarClassName="embedded"
              inline
              selected={embeddedDate}
              onChange={setEmbeddedDate}
            />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default DatePickerExamples;
