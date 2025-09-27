import React from 'react';
import { Row, Col } from 'antd';
import ResumeUploader from '../components/ResumeUploader';

const Interviewee: React.FC = () => {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <ResumeUploader />
      </Col>
    </Row>
  );
};

export default Interviewee;