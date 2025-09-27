import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Tabs } from 'antd';
import Interviewee from './pages/Interviewee';
import Interviewer from './pages/Interviewer';
import WelcomeBackModal from './components/WelcomeBackModal';
import { RootState, AppDispatch } from './store';
import { resetCandidate } from './store/slices/candidateSlice';
import { resetAnswers } from './store/slices/answersSlice';
import { clearChat } from './store/slices/chatSlice';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const interviewStatus = useSelector((state: RootState) => state.answers.interviewStatus);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // After redux-persist rehydrates the state, check if an interview was in progress.
    if (interviewStatus === 'in_progress') {
      setIsModalVisible(true);
    }
  }, [interviewStatus]);

  const handleTabChange = (key: string) => {
    navigate(key);
  };

  const handleResume = () => {
    setIsModalVisible(false);
  };

  const handleRestart = () => {
    dispatch(resetCandidate());
    dispatch(resetAnswers());
    dispatch(clearChat());
    setIsModalVisible(false);
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
      <WelcomeBackModal
        open={isModalVisible}
        onResume={handleResume}
        onRestart={handleRestart}
      />
    </Layout>
  );
};

export default App;