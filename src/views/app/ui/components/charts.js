import React from "react";
import { Row, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";

import {
  DoughnutChart,
  LineChart,
  PolarAreaChart,
  AreaChart,
  ScatterChart,
  BarChart,
  RadarChart,
  PieChart,
} from "components/charts";

import {
  lineChartData,
  polarAreaChartData,
  areaChartData,
  scatterChartData,
  barChartData,
  radarChartData,
  pieChartData,
  doughnutChartData,
} from "data/charts";

const ChartsUi = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Charts" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Line Chart</CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>Shadow</CardSubtitle>
                  <div className="chart-container">
                    <LineChart shadow data={lineChartData} />
                  </div>
                </Colxx>

                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>No Shadow</CardSubtitle>
                  <div className="chart-container">
                    <LineChart data={lineChartData} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Polar Chart</CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>Shadow</CardSubtitle>
                  <div className="chart-container">
                    <PolarAreaChart shadow data={polarAreaChartData} />
                  </div>
                </Colxx>

                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>No Shadow</CardSubtitle>
                  <div className="chart-container">
                    <PolarAreaChart data={polarAreaChartData} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Area Chart</CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>Shadow</CardSubtitle>
                  <div className="chart-container">
                    <AreaChart shadow data={areaChartData} />
                  </div>
                </Colxx>

                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>No Shadow</CardSubtitle>
                  <div className="chart-container">
                    <AreaChart data={areaChartData} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Scatter Chart</CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>Shadow</CardSubtitle>
                  <div className="chart-container">
                    <ScatterChart shadow data={scatterChartData} />
                  </div>
                </Colxx>

                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>No Shadow</CardSubtitle>
                  <div className="chart-container">
                    <ScatterChart data={scatterChartData} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Bar Chart</CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>Shadow</CardSubtitle>
                  <div className="chart-container">
                    <BarChart shadow data={barChartData} />
                  </div>
                </Colxx>

                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>No Shadow</CardSubtitle>
                  <div className="chart-container">
                    <BarChart data={barChartData} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Radar Chart</CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>Shadow</CardSubtitle>
                  <div className="chart-container">
                    <RadarChart shadow data={radarChartData} />
                  </div>
                </Colxx>

                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>No Shadow</CardSubtitle>
                  <div className="chart-container">
                    <RadarChart data={radarChartData} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Pie Chart</CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>Shadow</CardSubtitle>
                  <div className="chart-container">
                    <PieChart shadow data={pieChartData} />
                  </div>
                </Colxx>

                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>No Shadow</CardSubtitle>
                  <div className="chart-container">
                    <PieChart data={pieChartData} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Doughnut Chart</CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>Shadow</CardSubtitle>
                  <div className="chart-container">
                    <DoughnutChart data={doughnutChartData} />
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>No Shadow</CardSubtitle>
                  <div className="chart-container">
                    <DoughnutChart data={doughnutChartData} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default ChartsUi;
