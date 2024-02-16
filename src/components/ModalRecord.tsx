// NewRecordModal.tsx
import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';

interface NewRecordModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
}

const NewRecordModal: React.FC<NewRecordModalProps> = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
      });
  };

  return (
    <Modal
      title="Nuevo Registro"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Monto" name="amount" rules={[{ required: true, message: 'Por favor ingresa el monto' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Proveedor" name="provider" rules={[{ required: true, message: 'Por favor ingresa el proveedor' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Comentario" name="comment">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Fecha" name="date" rules={[{ required: true, message: 'Por favor selecciona la fecha' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewRecordModal;
