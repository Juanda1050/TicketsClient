import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Select, InputNumber, Spin, message } from "antd";
import currencies, { Currency } from "../utils/Currency";
import { ITicket } from "../model/Ticket";
import { getCurrencySymbol } from "../utils/CurrencySymbols";
import dayjs from "dayjs";
import { getTicketById } from "../api/tickets";
import { useQueryClient } from "react-query";
import CustomDatePicker from "./CustomPicker";

const { Option } = Select;

interface ModalRecordProps {
  visible: boolean;
  record: ITicket | undefined;
  action: "create" | "edit" | "view";
  onCancel: () => void;
  onOk: (values: ITicket) => void;
}

const ModalRecord: React.FC<ModalRecordProps> = ({
  visible,
  record,
  action,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm<ITicket>();
  const [currencySymbol, setCurrencySymbol] = useState("");
  const queryClient = useQueryClient();
  const prevVisibleRef = useRef<boolean>();

  const handleViewRecord = async (record: ITicket) => {
    try {
      if (visible) {
        const ticketData = await queryClient.fetchQuery(
          ["ticket", record.id],
          () => getTicketById(record.id)
        );
        if (ticketData) form.setFieldsValue(ticketData);
      } else form.resetFields();
    } catch (error) {
      message.error("Error al obtener el ticket: " + error);
    }
  };

  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);

  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
      setCurrencySymbol("");
    } else if (record && action !== "create") {
      handleCurrencyChange(record.moneda);
      handleViewRecord(record);
    }
  }, [visible, prevVisible, record, action]);

  const handleOk = async () => {
    if (action !== "view") {
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
      <Spin spinning={false}>
        <Form<ITicket> name="tickets_form" form={form} layout="vertical">
          <Form.Item label="No. registro" name="id" hidden={true}>
            <Input disabled={true} />
          </Form.Item>
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
                `${currencySymbol} ${value}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )
              }
              parser={(value) =>
                value
                  ? value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
                  : ""
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
            <Input
              disabled={action === "view"}
              placeholder="Ingrese proveedor"
            />
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
            rules={[
              { required: true, message: "Por favor selecciona la fecha" },
            ]}
            getValueProps={(i) => ({
              value: i ? dayjs(i) : null,
            })}
          >
            <CustomDatePicker
              placeholder="Seleccione una fecha"
              disabled={action === "view"}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalRecord;
