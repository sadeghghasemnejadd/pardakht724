import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "layout/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  addExchangeRate,
  getExchnageRate,
  getAllCurrencies,
  searchExchangeRate,
  updateExchangeRate,
} from "redux-toolkit/currenciesSlice";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Colxx } from "components/common/CustomBootstrap";
import ReactAutoSuggest from "components/common/ReactAutoSuggest";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  ButtonGroup,
  Button,
  CustomInput,
  Card,
} from "reactstrap";
import HeaderLayout from "containers/ui/headerLayout";
export default function ExchangeRate() {
  const searchInputRef = useRef();
  const [isModal, setIsModal] = useState(false);
  const [addData, setAddData] = useState({
    manual_exchange_rate: 0,
    percantage_exchange_rate: 0,
    priority: 0,
  });
  const [id2, setId2] = useState();
  const [isModal2, setIsModal2] = useState(false);
  const [editData, setEditData] = useState({});
  const [editDataValue, setEditDataValue] = useState({});
  const [autoSuggest, setAutoSuggest] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, exchangeRates, currencies } = useSelector(
    (store) => store.currencies
  );
  const { id } = useParams();
  const cols = useMemo(
    () => [
      {
        Header: "ارز مبدا",
        accessor: "primary_currency_id",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          const primaryName = currencies.find(
            (c) => c.id == props.value
          ).name_with_symbol;
          return (
            <>
              <p>{primaryName[0]}</p>
              <p>{primaryName[1]}</p>
            </>
          );
        },
        isSort: false,
      },
      {
        Header: "ارز مقصد",
        accessor: "secondary_currency_id",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          const primaryName = currencies.find(
            (c) => c.id == props.value
          ).name_with_symbol;
          return (
            <>
              <p>{primaryName[0]}</p>
              <p>{primaryName[1]}</p>
            </>
          );
        },
        isSort: false,
      },
      {
        Header: "نرخ تبدیل جهانی",
        accessor: "global_exchange_rate",
        cellClass: "text-muted text-center",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },
      {
        Header: "درصد افزایش",
        accessor: "percentage_exchange_rate",
        cellClass: "text-muted text-center",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },
      {
        Header: "اولیت",
        accessor: "priority",
        cellClass: "text-muted text-center",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },

      {
        Header: "عملیات",
        accessor: "id",
        cellClass: "text-muted text-center",
        Cell: ({ value }) => {
          return (
            <div
              className="glyph"
              onClick={() => {
                setId2(value);
                setIsModal2(true);
              }}
            >
              <div
                className={`glyph-icon simple-icon-pencil
                h5`}
                style={{ cursor: "pointer" }}
              />
            </div>
          );
        },
      },
    ],
    [id2]
  );
  ////////////////////////
  useEffect(() => {
    fetchExchangeRate();
  }, [fetchExchangeRate]);
  useEffect(() => {
    const data = exchangeRates.find((e) => e.id == id2);
    if (!data) return;
    setEditData({
      manual_exchange_rate:
        data?.manual_exchange_rate === null ? "" : data.manual_exchange_rate,
      percantage_exchange_rate:
        data?.percantage_exchange_rate === null
          ? ""
          : data.percantage_exchange_rate,
      priority: data?.priority === null ? "" : data.priority,
    });
  }, [id2]);

  const searchCurrencyHandler = async (e, searchId) => {
    e.preventDefault();
    try {
      const searchIdQuery = searchId === 0 ? "name" : "symbol";
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=${searchIdQuery}:${searchInput}`;
      await dispatch(searchExchangeRate({ query: searchQuery, id }));
    } catch (err) {
      throw err;
    }
  };

  const fetchExchangeRate = async () => {
    try {
      await dispatch(getExchnageRate(id));
      await dispatch(getAllCurrencies());
    } catch (err) {
      throw err;
    }
  };

  const addCurrenciesHandler = async () => {
    try {
      if (!addData.manual_exchange_rate > 0) {
        throw new Error("نرخ تبدیل دستی باید بزرگتر از صفر باشد");
      }
      if (!addData.percantage_exchange_rate > 0) {
        throw new Error("درصد افزایشی باید بزرگتر از صفر باشد");
      }
      if (!addData.priority > 0) {
        throw new Error(" اولویت باید بزرگتر از صفر باشد");
      }
      const secondaryId = currencies.find((c) => c.name === autoSuggest)?.id;
      if (!secondaryId) {
        throw new Error("ارز مقصد به درستی انتخاب نشده است");
      }
      const res = await dispatch(
        addExchangeRate({
          data: { ...addData, secondary_currency_id: secondaryId },
          id,
        })
      );
      if (res.payload.status === "ok") {
        toast.success("ارز با موفقیت اضافه شد");
        await fetchExchangeRate();
        isModal(false);
      }
    } catch (err) {
      toast.error(err);
      throw err;
    }
  };
  const saveChangeHandler = async () => {
    try {
      const res = await dispatch(
        updateExchangeRate({ id1: id, id2, data: editDataValue })
      );
      if (res.payload.status === "ok") {
        toast.success("تفییرات با موفقیت ذخیره شد.");
        setIsModal2(false);
        setEditDataValue({});
        await fetchExchangeRate();
      }
    } catch (err) {
      toast.error("ویرایش نرخ تبدیل با خطا روبرو شد");
      throw err;
    }
  };
  const match = [
    {
      path: "/",
      text: "مالی",
    },
    {
      path: "/currencies",
      text: "مدیریت ارز ها",
    },
    {
      path: history.location.pathname,
      text: "نرخ تبدیل",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div className="d-flex">
          <Colxx lg="12" xl="12">
            <Card className="mb-4 p-5">
              <HeaderLayout
                title="نرخ تبدیل"
                addName="افزودن ارز جدید"
                onSearch={searchCurrencyHandler}
                hasSearch={true}
                searchInputRef={searchInputRef}
                searchOptions={[
                  {
                    id: 0,
                    name: "نام ارز",
                  },
                  {
                    id: 1,
                    name: "نماد",
                  },
                ]}
                onAdd={() => {
                  setIsModal(true);
                }}
                match={match}
              />
              <Table cols={cols} data={exchangeRates} />
            </Card>
          </Colxx>
          <Modal isOpen={isModal} toggle={() => setIsModal(!isModal)}>
            <ModalHeader>ایجاد نرخ تبدیل جدید</ModalHeader>
            <ModalBody>
              <div className="mb-5">
                <ReactAutoSuggest
                  placeholder="ارز مقصد"
                  value={autoSuggest}
                  onChange={(val) => setAutoSuggest(val)}
                  data={currencies.map((c) => ({ name: c.name }))}
                />
              </div>
              <InputGroup size="sm" className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <span className="input-group-text">نرخ تبدیل دستی</span>
                </InputGroupAddon>
                <Input
                  onChange={(e) =>
                    setAddData((prev) => ({
                      ...prev,
                      manual_exchange_rate: e.target.value,
                    }))
                  }
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <span className="input-group-text">درصد افزایشی</span>
                </InputGroupAddon>
                <Input
                  onChange={(e) =>
                    setAddData((prev) => ({
                      ...prev,
                      percantage_exchange_rate: e.target.value,
                    }))
                  }
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <span className="input-group-text">اولویت</span>
                </InputGroupAddon>
                <Input
                  onChange={(e) =>
                    setAddData((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                />
              </InputGroup>
            </ModalBody>
            <ModalFooter className="d-flex flex-row-reverse justify-content-start">
              <Button
                color="primary"
                size="lg"
                className="mb-2"
                onClick={addCurrenciesHandler}
              >
                ایجاد
              </Button>
              <Button
                color="secondary"
                size="lg"
                className="mb-2"
                onClick={() => setIsModal(false)}
              >
                لغو
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={isModal2}
            size="lg"
            toggle={() => {
              setIsModal2(!isModal2);
            }}
          >
            <ModalHeader>ویرایش</ModalHeader>
            <ModalBody>
              <div className="d-flex mb-3">
                <InputGroup size="sm">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">نرخ تبدیل دستی</span>
                  </InputGroupAddon>
                  <Input
                    value={editData.manual_exchange_rate}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        manual_exchange_rate: e.target.value,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        manual_exchange_rate: e.target.value,
                      }));
                    }}
                  />
                </InputGroup>
              </div>
              <div className="d-flex mb-3">
                <InputGroup size="sm">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">درصد افزایش</span>
                  </InputGroupAddon>
                  <Input
                    value={editData.percantage_exchange_rate}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        percantage_exchange_rate: e.target.value,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        percantage_exchange_rate: e.target.value,
                      }));
                    }}
                  />
                </InputGroup>
              </div>
              <div className="d-flex mb-3">
                <InputGroup size="sm">
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">اولویت</span>
                  </InputGroupAddon>
                  <Input
                    value={editData.priority}
                    onChange={(e) => {
                      setEditData((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }));
                      setEditDataValue((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }));
                    }}
                  />
                </InputGroup>
              </div>
            </ModalBody>
            <ModalFooter className="d-flex flex-row-reverse justify-content-start">
              <Button
                color="primary"
                size="lg"
                className="mb-2"
                onClick={saveChangeHandler}
              >
                ویرایش
              </Button>
              <Button
                color="secondary"
                size="lg"
                className="mb-2"
                onClick={() => {
                  setIsModal2(false);
                }}
              >
                لغو
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </div>
      )}
    </Layout>
  );
}
