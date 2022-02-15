import { FunctionComponent, useState } from "react";
import {
  Modal,
  InputNumber,
  Select,
  Row,
  Col,
  Typography,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/store/hooks";
import {
  selectBSData,
  selectCurrencies,
  setBSData,
} from "src/store/reducer/dashboardSlice";
import { postActionCurrency } from "src/api";
import { userAccountAsync } from "src/store/reducer/registerSlice";

const { Option } = Select;

interface IBSModal {}

const BSModal: FunctionComponent<IBSModal> = (props) => {
  const dispatch = useDispatch();
  const bsData = useAppSelector(selectBSData);
  const currencies = useAppSelector(selectCurrencies);

  const [newCurrency, setNewCurrency] = useState<string>(
    currencies.filter((x) => x.name !== bsData.currency)[0]?.name.toString()
  );
  const triggerNewCurrency = (value: string) => setNewCurrency(value);
  const [value, setValue] = useState<number>(0);
  const triggerValue = (value: number) => setValue(value);

  const triggerModal = () => {
    dispatch(
      setBSData({ open: !bsData.open, currency: "", value: 0, type: "B" })
    );
  };

  const sendActionCurrencyData = () => {
    postActionCurrency({
      newCurrency: newCurrency,
      oldCurrency: bsData.currency,
      type: bsData.type,
      value: value,
    })
      .then(() => {
        triggerModal();
        dispatch(userAccountAsync());
        message.info("The operation was successful.");
      })
      .catch((err) => message.error(err));
  };

  return (
    <>
      <Modal
        title={`${bsData.type === "B" ? "Buy" : "Sell"} ${bsData.currency}`}
        visible={bsData.open}
        okText={bsData.type === "B" ? "Buy" : "Sell"}
        onOk={sendActionCurrencyData}
        onCancel={triggerModal}
      >
        <Row gutter={16}>
          <Col span={10}>
            <InputNumber
              style={{ width: "100%" }}
              value={value}
              prefix={bsData.currency}
              min={0}
              step="0.01"
              onChange={(e: number) => triggerValue(e)}
            />
          </Col>
          <Col span={4} style={{ textAlign: "center" }}>
            <Typography.Text strong>
              {bsData.type === "B" ? "from" : "to"}
            </Typography.Text>
          </Col>
          <Col span={10}>
            <Select
              value={newCurrency}
              onChange={(e: string) => triggerNewCurrency(e)}
              style={{ width: "100%" }}
            >
              {currencies
                .filter((x) => x.name !== bsData.currency)
                .map((currency, index) => (
                  <Option key={index} value={currency.name}>
                    {currency.name}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default BSModal;
