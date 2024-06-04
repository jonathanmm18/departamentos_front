import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Avatar,
  message,
  Dropdown,
  Menu,
  Badge,
  Space,
} from "antd";

import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { render } from "less";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const getColorFromLength = (length) => {
    // Calcular el tono de azul en función de la longitud
    const hue = 205; // H de HSL para el azul
    const saturation = 100; // S de HSL para el azul
    const lightness = 50 - (length * 8); // L de HSL para el azul (ajustado según la longitud)
  
    // Construir el color en formato HSL
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

const columns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
    sorter: (a, b) => a.nombre.localeCompare(b.nombre),
  },
  {
    title: "Departamento Superior",
    dataIndex: "departamento_superior",
    key: "departamento_superior",
    render: (departamento_superior) =>
      departamento_superior ? departamento_superior.nombre : "-",
  },
  {
    title: "Colaboradores",
    dataIndex: "numero_empleados",
    key: "numero_empleados",
    sorter: (a, b) => a.numero_empleados - b.numero_empleados,
  },
  {
    title: "Subdivisiones",
    dataIndex: "departamentos_sub",
    key: "departamentos_sub",
    render: (departamentos_sub) => {
      const menu = (
        <Menu>
          {departamentos_sub.map((subdivision) => (
            <Menu.Item key={subdivision.id}>{subdivision.nombre}</Menu.Item>
          ))}
        </Menu>
      );

      return (
        <Space>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ textDecoration: "None" }}
            >
              <Badge status="success" text="Ver" color="hwb(205 6% 9%)">
                <Avatar shape="square" size="large" style={{ backgroundColor: getColorFromLength(departamentos_sub.length), marginRight: 8 }} >
                  {departamentos_sub.length}
                </Avatar>
              </Badge>
            </a>
          </Dropdown>
        </Space>
      );
    },
    sorter: (a, b) => a.departamentos_sub.length - b.departamentos_sub.length,
  },
  {
    title: "Embajador Designado",
    dataIndex: "embajador_designado",
    key: "embajador_designado",
    render: (embajador) =>
      embajador ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{ backgroundColor: getRandomColor(), marginRight: 8 }}
            size="medium"
          >
            {embajador.nombre_completo.charAt(0)}
          </Avatar>
          {embajador.nombre_completo}
        </div>
      ) : (
        "-"
      ),
    sorter: (a, b) =>
      a.embajador_designado.nombre_completo.localeCompare(
        b.embajador_designado.nombre_completo
      ),
  },
];

const DepartamentosTabla = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/departamentos");
        if (!response.ok) {
          console.log(response);
          throw new Error(
            "Error al obtener los datos de los departamentos desde la API status"
          );
        }
        const departamentosData = await response.json();
        setData(departamentosData);
        setLoading(false);
      } catch (error) {
        message.error("Error al obtener los datos de los departamentos");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Total ${total} registros`,
        }}
        rowKey="id"
      />
    </>
  );
};
export default DepartamentosTabla;
