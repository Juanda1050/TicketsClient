import React, { useState } from "react";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import Navbar from "./Navbar";
import ModalRecord from "./ModalRecord";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

interface DataType {
  id: number;
  monto: number;
  moneda: string;
  proveedor: string;
  comentario: string;
  fechaCreo: string;
}

const RecordsTable: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [modalAction, setModalAction] = useState<"create" | "edit" | "view">(
    "create"
  ); 

  const handleNewRecord = () => {
    setModalVisible(true);
    setModalAction("create");
  };

  const handleExistingRecord = () => {
    setModalVisible(true);
    setModalAction("edit");
  };

  const handleViewRecord = () => {
    setModalVisible(true);
    setModalAction("view"); 
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
    console.log("Cerrar sesión");
  };

  const columns = [
    {
      title: "No. Registro",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Monto",
      dataIndex: "monto",
      key: "monto",
      width: "15%",
      render: (text: number) => (
        <span>
          {new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
          }).format(text)}
        </span>
      ),
    },
    {
      title: "Moneda",
      dataIndex: "moneda",
      key: "moneda",
      width: "10%",
    },
    {
      title: "Proveedor",
      dataIndex: "proveedor",
      key: "proveedor",
      width: "20%",
    },
    {
      title: "Comentario",
      dataIndex: "comentario",
      key: "comentario",
      width: "20%",
    },
    {
      title: "Fecha",
      dataIndex: "fechaCreo",
      key: "fechaCreo",
      width: "10%",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: () => (
        <span>
          <Button
            type="text"
            onClick={handleViewRecord}
            icon={<EyeOutlined />}
          />
          <Button
            type="link"
            onClick={handleExistingRecord}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar este registro?"
            onConfirm={() => console.log("Registro eliminado")}
            okText="Sí"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
      width: "7%",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      monto: 1000,
      moneda: "MXN",
      proveedor: `Proveedor ${i}`,
      comentario: "Comentario",
      fechaCreo: "17/02/2024",
    });
  }

  return (
    <Row gutter={[0, 16]}>
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
          dataSource={data}
          columns={columns}
          style={{ borderRadius: "8px" }}
          bordered
          size="small"
          pagination={{ defaultPageSize: 15 }}
        />
      </Col>
      <ModalRecord
        visible={modalVisible}
        action={modalAction}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Row>
  );
};

export default RecordsTable;
