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
  Input,
  Select,
  Flex,
  Button, 
} from "antd";

import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { render } from "less";
import { resetWarned } from "antd/es/_util/warning";
const { Content } = Layout;

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

const asyncFilterDepartamentosUniqueArray = async () => {
    const response = await fetch(`/api/departamentos`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
    const departamentos = await response.json();
    const uniqueData = departamentos.map((departamento) => departamento.nombre);
    return uniqueData.map((nombre) => ({ text: nombre, value: nombre }));
    }


const DepartamentosTabla = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('nombre'); // Estado inicial
  const [nombreFilter, setNombreFilter] = useState([{}]);
  const [nivelesFilter, setNivelesFilter] = useState([{}]);

  const nombreFilterArray = (departamentos) => {
    const uniqueData = departamentos.map((departamento) => departamento.nombre);
    return uniqueData.map((nombre) => ({ text: nombre, value: nombre }));
    };

  const nivelesFilterArray = (departamentos) => {
    const uniqueData = departamentos
        .map((departamento) => departamento.nivel)
        .reduce((acc, nivel) => {
        if (!acc.includes(nivel)) {
          acc.push(nivel);
        }
        return acc;
      }, []);
    const nivelesUnicos = uniqueData.sort();
    console.log(nivelesUnicos);
    return nivelesUnicos.map((nivel) => ({ text: nivel, value: nivel }));

    };

  const handleChange = (value) => {
    setSelectedOption(value);
    // Aquí puedes guardar la opción seleccionada en alguna parte
    console.log('Opción seleccionada:', value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleButtonClick = async () => {
    try {
      const response = await fetch(`/api/getDepartamentosByColumnValue/${selectedOption}/${inputValue}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const result = await response.json();
      setData(result);
      message.success('Datos obtenidos exitosamente');
    } catch (error) {
      message.error('Error al obtener los datos');
      console.error(error);
    }
  };



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
        setNombreFilter(nombreFilterArray(departamentosData));
        setNivelesFilter(nivelesFilterArray(departamentosData));

      } catch (error) {
        message.error("Error al obtener los datos de los departamentos");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      sorter: (a, b) => a.name.length - b.name.length,
      filters: nombreFilter,
      onFilter: (value, record) => record.nombre.indexOf(value) === 0,
      sortDirections: ['descend'],
      resetWarned: true,
      resetText: 'Reiniciar',
      okText: 'OK',
    },
    
    {
      title: "Departamento Superior",
      dataIndex: "departamento_superior",
      key: "departamento_superior",
      render: (departamento_superior) =>
        departamento_superior ? departamento_superior.nombre : "-",
      filters: nombreFilter,
      onFilter: (value, record) => record.nombre.indexOf(value) === 0,
      sortDirections: ['descend'],
      resetWarned: true,
      resetText: 'Reiniciar',
      okText: 'OK',
    },
    {
      title: "Colaboradores",
      dataIndex: "numero_empleados",
      key: "numero_empleados",
      sorter: (a, b) => a.numero_empleados - b.numero_empleados,
    },
    {
        title: "Niveles",
        dataIndex: "nivel",
        key: "nivel",
        filters: nivelesFilter,
        onFilter: (value, record) => record.nivel == value,
        sortDirections: ['descend'],
        resetWarned: true,
        resetText: 'Reiniciar',
        okText: 'OK',
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
  



  return (
    <>
    <Content
        style={{
            padding: 24,
            margin: 0,
        }}
    >
        <Flex justify='space-between' gap={'large'} horizontal> 
            <Space>
                <Button 
                    type="primary"
                >
                    Listado
                </Button>
                <Button 
                    type="default"
                >
                    Árbol
                </Button>
            </Space>
        <Space>
            <Select
                showSearch
                style={{ width: 200, marginRight: 16 }}
                placeholder="Selecciona una columna de búsqueda"
                optionFilterProp="children"
                value={selectedOption} // Valor seleccionado
                onChange={handleChange} // Manejador de cambio
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Select.Option value="nombre">Nombre</Select.Option>
                <Select.Option value="departamento_superior">
                    Departamento Superior
                </Select.Option>
                <Select.Option value="numero_empleados">Colaboradores</Select.Option>
                <Select.Option value="departamentos_sub">Subdivisiones</Select.Option>
                <Select.Option value="embajador_designado">
                    Embajador Designado
                </Select.Option>

            </Select>
            <Input.Search
                placeholder="Buscar departamento"
                enterButton="Buscar"
                size="middle"
                style={{ width: 400 }}
                onChange={handleInputChange}
                onSearch={handleButtonClick}
            />
        </Space>
        </Flex>
    </Content>
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
