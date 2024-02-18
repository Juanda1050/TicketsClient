import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import Navbar from "./Navbar";
import ModalRecord from "./ModalRecord";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} from "../api/tickets";
import { ITicket } from "../model/Ticket";
import dayjs from "dayjs";

const RecordsTable: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<ITicket[]>([]);
  const [modalAction, setModalAction] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<ITicket | undefined>(
    undefined
  );

  useEffect(() => {
    handleFilter();
  }, []);

  const handleNewRecord = () => {
    setModalVisible(true);
    setModalAction("create");
  };

  const handleFilter = async () => {
    setLoading(true);

    try {
      const response = await getAllTickets();

      setDataSource(response);
    } catch (error) {
      message.error("Error al filtrar los recibos.");
    } finally {
      setLoading(false);
    }
  };

  const handleExistingRecord = async (record: ITicket) => {
    const response = await getTicketById(record.id);

    if (response) {
      setSelectedRecord(response);
      setModalVisible(true);
      setModalAction("edit");
    }
  };

  const handleViewRecord = async (record: ITicket) => {
    const response = await getTicketById(record.id);
    const ticketData = dayjs(response.fecha, "YYYY-MM-DDTHH:mm:ss.SSS");
    response.fecha = ticketData;

    if (response) {
      setSelectedRecord(record);
      setModalVisible(true);
      setModalAction("view");
    }
  };

  // const handleOk = (values: any) => {
  //   const newRecord = {
  //     key: dataSource.length + 1,
  //     amount: values.amount,
  //     provider: values.provider,
  //     comment: values.comment,
  //     date: values.date.format("YYYY-MM-DD"),
  //   };
  //   setDataSource([...dataSource, newRecord]);
  //   setModalVisible(false);
  // };

  const handleOk = async (values: ITicket) => {
    if (modalAction !== "view") {
      setLoading(true); // Activar el estado de carga

      try {
        const response =
          modalAction === "create"
            ? await createTicket(values)
            : await updateTicket(values);

        if (response.id > 0) {
          setDataSource([...dataSource, response]);
          message.success("Recibo cargado exitosamente.");
          setModalVisible(false);
        }
      } catch (error) {
        message.error("Error al crear el recibo.");
      } finally {
        setLoading(false); // Desactivar el estado de carga, ya sea que haya sido exitosa o no la petición
      }
    }
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
      dataIndex: "fecha",
      key: "fecha",
      width: "10%",
      render: (date: dayjs.Dayjs) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (record: ITicket) => (
        <span>
          <Button
            type="text"
            onClick={() => handleViewRecord(record)}
            icon={<EyeOutlined />}
          />
          <Button
            type="link"
            onClick={() => handleExistingRecord(record)}
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

  return (
    <Spin spinning={loading}>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Navbar onLogout={handleLogout} />
        </Col>
        <Col span={24}>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleNewRecord}
            >
              Nuevo
            </Button>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleFilter}
            >
              Filtrar
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <Table<ITicket>
            rowKey={(record) => record.id}
            dataSource={dataSource}
            columns={columns}
            style={{ borderRadius: "8px" }}
            bordered
            size="small"
            pagination={{ defaultPageSize: 15 }}
          />
        </Col>
        <ModalRecord
          visible={modalVisible}
          record={selectedRecord}
          action={modalAction}
          onCancel={handleCancel}
          onOk={handleOk}
        />
      </Row>
    </Spin>
  );
};

export default RecordsTable;
