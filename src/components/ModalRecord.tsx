import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, InputNumber } from "antd";
import currencies, { Currency } from "../utils/Currency";
import { ITicket } from "../model/Ticket";
import { getCurrencySymbol } from "../utils/CurrencySymbols";
import dayjs from "dayjs";

const { Option } = Select;

interface ModalRecordProps {
  visible: boolean;
  record: ITicket | undefined;
  action: "create" | "edit" | "view";
  onCancel: () => void;
  onOk: (values: any) => void;
}

const dateFormat = "DD/MM/YYYY";

const ModalRecord: React.FC<ModalRecordProps> = ({
  visible,
  record,
  action,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm<ITicket>();
  const [currencySymbol, setCurrencySymbol] = useState("");

  const prevVisibleRef = useRef<boolean>();

  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);

  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
      setCurrencySymbol("");
    }
    if (record) {
      handleCurrencyChange(record.moneda);
    }
  }, [visible, prevVisible, form]);

  const handleOk = async () => {
    if (action === "create") {
      const values = await form.validateFields();
      onOk(values);
      form.resetFields();
    }
  };

  const handleCurrencyChange = (value: string) => {
    const symbol = getCurrencySymbol(value);
    setCurrencySymbol(symbol);
  };

  return (
    <Modal
      title={
        action === "create"
          ? "Nuevo Recibo"
          : action === "edit"
          ? "Editar Recibo"
          : "Ver Recibo"
      }
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Guardar"
      cancelText={action === "view" ? "Cerrar" : "Cancelar"}
      okButtonProps={{ style: { display: action === "view" ? "none" : "" } }}
      cancelButtonProps={{ type: action === "view" ? "primary" : "default" }}
    >
      <Form<ITicket>
        name="tickets_form"
        form={form}
        layout="vertical"
        initialValues={record}
      >
        <Form.Item
          label="Monto"
          name="monto"
          rules={[{ required: true, message: "Por favor ingresa el monto" }]}
        >
          <InputNumber
            key={currencySymbol}
            disabled={action === "view"}
            style={{ width: "100%" }}
            placeholder="Ingrese monto"
            formatter={(value) =>
              `${currencySymbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item
          label="Moneda"
          name="moneda"
          rules={[
            { required: true, message: "Por favor selecciona la moneda" },
          ]}
        >
          <Select
            disabled={action === "view"}
            style={{ width: "100%" }}
            placeholder="Seleccione una divisa"
            showSearch
            onChange={handleCurrencyChange}
          >
            {currencies.map((currency: Currency) => (
              <Option key={currency.code} value={currency.code}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Proveedor"
          name="proveedor"
          rules={[
            { required: true, message: "Por favor ingresa el proveedor" },
          ]}
        >
          <Input disabled={action === "view"} placeholder="Ingrese proveedor" />
        </Form.Item>
        <Form.Item label="Comentario" name="comentario">
          <Input.TextArea
            disabled={action === "view"}
            placeholder="Ingrese comentario"
          />
        </Form.Item>
        <Form.Item
          label="Fecha"
          name="fecha"
          rules={[{ required: true, message: "Por favor selecciona la fecha" }]}
          getValueProps={(i) => ({ value: dayjs(i) })}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabled={action === "view"}
            format={dateFormat}
            placeholder="Seleccione una fecha"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRecord;
