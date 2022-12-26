import { useHistory, useParams } from "react-router-dom";
import Layout from "layout/AppLayout";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  InputGroup,
  InputGroupAddon,
  ButtonGroup,
  Button,
  CustomInput,
} from "reactstrap";
import HeaderLayout from "containers/ui/headerLayout";
import { useSelector, useDispatch } from "react-redux";
import { getHistories } from "redux-toolkit/currenciesSlice";
import { useEffect, useState } from "react";
import PricesCard from "./pricesCard";
import { AreaChart } from "components/charts";
import { ThemeColors } from "helpers/ThemeColors";
import { Colxx } from "components/common/CustomBootstrap";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
const Histories = () => {
  const { id } = useParams();
  const { loading, histories } = useSelector((store) => store.currencies);
  const [isModal, setIsModal] = useState(false);
  const history = useHistory();
  const match = [
    {
      path: "/",
      text: "کاربران",
    },
    {
      path: "/currencies",
      text: "مدیریت ارز ها",
    },
    {
      path: history.location.pathname,
      text: "تاریخچه نرخ",
    },
  ];
  const dispatch = useDispatch();
  const colors = ThemeColors();
  useEffect(() => {
    fetchHistories();
  }, [fetchHistories]);
  const fetchHistories = async () => {
    try {
      await dispatch(getHistories(id));
    } catch (err) {
      throw err;
    }
  };
  const sellChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "sell",
        data: [54, 63, 60, 65, 60, 56, 60],
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 6,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor1_10,
      },
      {
        label: "buy",
        data: [63, 52, 60, 65, 60, 68, 52],
        borderColor: colors.themeColor6,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 6,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: false,
        borderWidth: 2,
      },
    ],
  };
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <>
          <Colxx lg="12" xl="9">
            <Card className="mb-4 p-5">
              <HeaderLayout
                title="تاریخچه نرخ"
                addName="افزودن ارز جدید"
                hasSearch={false}
                onAdd={() => {
                  setIsModal(true);
                }}
                match={match}
              />
              <Modal
                isOpen={isModal}
                size="lg"
                toggle={() => setIsModal(!isModal)}
              >
                <ModalHeader>تست</ModalHeader>
                <ModalBody>تست</ModalBody>
                <ModalFooter className="d-flex flex-row-reverse justify-content-start">
                  تست
                </ModalFooter>
              </Modal>
              <div className="d-flex justify-content-between">
                <PricesCard title="بالاترین قیمت" sell={45000} buy={45000} />
                <PricesCard title="پایین ترین قیمت" sell={45000} buy={45000} />
                <PricesCard title="میانگین قیمت" sell={45000} buy={45000} />
              </div>
              <Card className="mt-5 mb-5 h-100">
                <CardBody style={{ minHeight: "30rem" }}>
                  <AreaChart shadow data={sellChartData} />
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div className="text-center w-10">
                      <h5>تاریخ و ساعت</h5>
                      <p className="text-muted">
                        1401/10/20
                        <br />
                        12:35:43
                      </p>
                    </div>
                    <div className="text-center w-10">
                      <h5>نام کاربر</h5>
                      <p className="text-muted">محمد رضا بهرامی</p>
                    </div>
                    <div className="w-70">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th className="text-center">قیمت خرید از مشتری</th>
                            <th className="text-center">قیمت فروش به مشتری</th>
                            <th className="text-center">میانگین نرخ خرید</th>
                            <th className="text-center">میانگین نرخ فروش</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center">43500</td>
                            <td className="text-center">45500</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                          </tr>
                          <tr>
                            <td className="text-success text-center">44000</td>
                            <td className="text-danger text-center">4500</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-5">
                    <div className="text-center w-10">
                      <h5></h5>
                      <p className="text-muted"></p>
                    </div>
                    <div className="text-center w-10">
                      <h5>نام ارز</h5>
                      <p className="text-muted">
                        -<br />-
                      </p>
                    </div>
                    <div className="w-70">
                      <Table responsive>
                        <thead>
                          <tr>
                            <th className="text-center">نماد</th>
                            <th className="text-center">موجودی حساب</th>
                            <th className="text-center">حچم واقعی</th>
                            <th className="text-center">حجم در دسترسی</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                          </tr>
                          <tr>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Card>
          </Colxx>
          <Colxx xxs="2">
            <SurveyApplicationMenu
              filters={[
                {
                  id: "date",
                  title: "تاریخ",
                  switches: [
                    { id: 0, name: "مشتری" },
                    { id: 1, name: "کارمند" },
                    { id: 2, name: "همکار" },
                  ],
                },
                {
                  id: "type",
                  title: "نوع تفییرات",
                  switches: [
                    { id: 0, name: "نام ارز" },
                    { id: 1, name: "نماد" },
                    { id: 2, name: "قیمت فروش به مشتری" },
                    { id: 3, name: "قیمت خرید از مشتری" },
                    { id: 4, name: "میانگین نرخ خرید" },
                    { id: 5, name: "میانگین نرخ فروش" },
                    { id: 6, name: "موجودی حساب" },
                    { id: 6, name: "حجم واقعی" },
                    { id: 6, name: "حجم در دسترس" },
                  ],
                },
              ]}
              onSwitch={() => {}}
              onFilter={() => {}}
            />
          </Colxx>
        </>
      )}
    </Layout>
  );
};
export default Histories;
