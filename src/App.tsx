import React from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Layout, Tabs } from 'antd';
import Interviewee from './pages/Interviewee';
import Interviewer from './pages/Interviewer';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Tabs
          theme="dark"
          activeKey={location.pathname}
          onChange={handleTabChange}
          items={[
            {
              key: '/interviewee',
              label: 'Interviewee',
            },
            {
              key: '/interviewer',
              label: 'Interviewer',
            },
          ]}
        />
      </Header>
      <Content style={{ padding: '50px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/interviewee" replace />} />
          <Route path="/interviewee" element={<Interviewee />} />
          <Route path="/interviewer" element={<Interviewer />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;