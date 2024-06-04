import React, { useState, useEffect } from "react";
import { Layout, Divider, Row, Col } from "antd";
import { Typography } from "antd";
import { Tabs } from "antd";
import DepartamentosTabla from "../components/DepartamentosTabla"

const { Title } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const OrganizacionPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {}, []);

  return (
    <>
      <Content className="content">
        <Title>Organizacion</Title>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Divisiones" key="1">
            <DepartamentosTabla />
          </TabPane>
          <TabPane tab="Colaboradores" key="2">
            Contenido de la pestaña de Colaboradores
          </TabPane>
        </Tabs>
      </Content>

      <Divider orientation="left"></Divider>
    </>
  );
};

export default OrganizacionPage;