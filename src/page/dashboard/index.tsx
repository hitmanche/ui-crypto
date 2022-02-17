import { Button, Card, Col, PageHeader, Row, Table, Typography } from "antd";
import { useAppSelector } from "src/store/hooks";
import {
  logout,
  selectUser,
  selectUserAccount,
} from "src/store/reducer/registerSlice";
import { ExportOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  currenciesAsync,
  selectCurrencies,
  setBSData,
} from "src/store/reducer/dashboardSlice";
import { useEffect } from "react";
import { UserAccountState } from "src/types/userAccountState";
import BSModal from "./bsModal";

export default function DashboardComponent() {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const userAccount = useAppSelector(selectUserAccount);
  const currencies = useAppSelector(selectCurrencies);

  useEffect(() => {
    if (currencies.length < 1) {
      dispatch(currenciesAsync());
    }
  }, [currencies, dispatch]);

  const clickTrigger = (account: UserAccountState, type: "B" | "S") => {
    dispatch(
      setBSData({
        open: true,
        type: type,
        currency: account.currency.toString(),
        value: parseFloat(account.value.$numberDecimal.toString()),
      })
    );
  };

  return (
    <div>
      <PageHeader
        style={{
          boxShadow: "0px 2px 4px gray",
        }}
        title={`Hello, ${user.fullName}`}
        extra={[
          <Button
            key="_logout"
            onClick={() => dispatch(logout())}
            type="primary"
            icon={<ExportOutlined />}
          >
            Sign Out
          </Button>,
        ]}
      ></PageHeader>
      <br />
      <div className="site-card-wrapper">
        <Row>
          {userAccount?.map((account) => (
            <Col xs={24} md={6} lg={6} key={account.currency.toString()}>
              <Card title={account.currency} style={{ margin: 5 }}>
                <Typography.Title
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {parseFloat(account.value.$numberDecimal.toString()).toFixed(
                    5
                  )}
                </Typography.Title>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => clickTrigger(account, "S")}
                    type="primary"
                    ghost
                  >
                    SELL
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    onClick={() => clickTrigger(account, "B")}
                    type="primary"
                    ghost
                  >
                    BUY
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col xs={24} md={12} lg={12}>
            <Table
              style={{ width: "100%" }}
              rowKey={"_id"}
              dataSource={currencies}
              columns={[
                {
                  key: "name",
                  title: "Currency",
                  dataIndex: "name",
                  render: (data) => <b>{"1 " + data}</b>,
                },
                {
                  key: "rate",
                  title: "Value",
                  dataIndex: "rate",
                  render: (data) => <b>{data?.$numberDecimal + " BTC"}</b>,
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <BSModal />
        </Row>
      </div>
    </div>
  );
}
