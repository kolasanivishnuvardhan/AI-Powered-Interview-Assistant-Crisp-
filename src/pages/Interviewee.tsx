import React from 'react';
import { Row, Col, Space } from 'antd';
import ResumeUploader from '../components/ResumeUploader';
import ChatBox from '../components/ChatBox';

const Interviewee: React.FC = () => {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <ResumeUploader />
          <ChatBox />
        </Space>
      </Col>
    </Row>
  );
};

export default Interviewee;