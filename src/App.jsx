import React, { useState, useEffect } from 'react';
import { Layout, Table, Avatar, message } from 'antd';
const { createProxyMiddleware } = require('http-proxy-middleware');

import './styles/App.less';

const { Content } = Layout;

const columns = [
  { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
  { title: 'Número de Empleados', dataIndex: 'numero_empleados', key: 'numero_empleados' },
  { title: 'Embajador Designado', dataIndex: 'embajador_designado', key: 'embajador_designado', render: embajador => <Avatar>{embajador.nombre_completo[0]}</Avatar> },
];

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proxy = createProxyMiddleware('/api', {
          target: 'https://app-departamentos-fdba2e12deac.herokuapp.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        });
    
        const response = await fetch('/api/departamentos', { // Utiliza '/api/departamentos' como la URL de la solicitud
          method: 'GET',
          headers: {
            // Agrega cualquier encabezado necesario aquí
          },
        });
        
        if (!response.ok) {
          console.log(response);
          throw new Error('Error al obtener los datos de los departamentos desde la API status');
        }
        
        const departamentosData = await response.json();
        setData(departamentosData);
        setLoading(false);
      } catch (error) {
        message.error('Error al obtener los datos de los departamentos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout className="main-layout">
      <Content className="content">
        <h1>Departamentos</h1>
        <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
      </Content>
    </Layout>
  );
};

export default App;
