import React, { Fragment, useState } from "react";
import { Button, Col, Row, Table } from "antd";
import Navbar from "./Navbar";
import NewRecordModal from "./ModalRecord";

const RecordsTable: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  const handleNewRecord = () => {
    setModalVisible(true);
  };

  const handleOk = (values: any) => {
    const newRecord = {
      key: dataSource.length + 1,
      amount: values.amount,
      provider: values.provider,
      comment: values.comment,
      date: values.date.format("YYYY-MM-DD"),
    };
    setDataSource([...dataSource, newRecord]);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  const columns = [
    {
      title: "No. Registro",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Monto",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Proveedor",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Comentario",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <Row gutter={[0, 16]} >
      <Col span={24}>
        <Navbar onLogout={handleLogout} />
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={handleNewRecord}>
          Nuevo
        </Button>
      </Col>
      <Col span={24}>
        <Table
          dataSource={dataSource}
          columns={columns}
          style={{ borderRadius: "8px" }}
          bordered
          size="small"
        />
      </Col>
      <NewRecordModal
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Row>
  );
};

export default RecordsTable;
