import React, { useState, useEffect } from 'react';
import { Layout, Divider, Row, Col } from 'antd';
import DepartamentosTabla from './components/DepartamentosTabla';
import MenuSuperior from './layouts/MenuSuperior';
import OrganizacionPage from './layouts/OrganizacionPage';

import './styles/App.less';

const { Content } = Layout;

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
  }, []);

  return (
    <>
    <Layout>
      <MenuSuperior />
      <Content style={{ padding: '50px', minHeight: 'calc(100vh - 64px)' }}>
        <Row>
          <Col span={24}>
            <Layout className="main-layout">
              <OrganizacionPage />
            </Layout>
          </Col>
        </Row>  
      </Content>
    </Layout>
    <Divider orientation="left"></Divider>

    
    </>
  );
};

export default App;
