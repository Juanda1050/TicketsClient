import React from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import currencies, { Currency } from "../utils/Currency";

const { Option } = Select;

interface ModalRecordProps {
  visible: boolean;
  action: "create" | "edit" | "view";
  onCancel: () => void;
  onOk: (values: any) => void;
}

const ModalRecord: React.FC<ModalRecordProps> = ({
  visible,
  action,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  return (
    <Modal
      title={
        action === "create"
          ? "Nuevo Registro"
          : action === "edit"
          ? "Editar Registro"
          : "Ver Registro"
      }
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={action === "view" ? "Cerrar" : "Guardar"}
      cancelText="Cancelar"
      okButtonProps={{ disabled: action === "view" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Monto"
          name="amount"
          rules={[{ required: true, message: "Por favor ingresa el monto" }]}
        >
          <Input disabled={action === "view"} />{" "}
        </Form.Item>
        <Form.Item
          label="Moneda"
          name="currency"
          rules={[
            { required: true, message: "Por favor selecciona la moneda" },
          ]}
        >
          <Select disabled={action === "view"} style={{ width: "100%" }}>
            {currencies.map((currency: Currency) => (
              <Option key={currency.code} value={currency.code}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Proveedor"
          name="provider"
          rules={[
            { required: true, message: "Por favor ingresa el proveedor" },
          ]}
        >
          <Input disabled={action === "view"} />{" "}
        </Form.Item>
        <Form.Item label="Comentario" name="comment">
          <Input.TextArea disabled={action === "view"} />{" "}
        </Form.Item>
        <Form.Item
          label="Fecha"
          name="date"
          rules={[{ required: true, message: "Por favor selecciona la fecha" }]}
        >
          <DatePicker style={{ width: "100%" }} disabled={action === "view"} />{" "}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRecord;
