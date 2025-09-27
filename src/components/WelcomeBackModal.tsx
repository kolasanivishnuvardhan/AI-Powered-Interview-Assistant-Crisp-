import React from 'react';
import { Modal, Button, Typography } from 'antd';

const { Title, Text } = Typography;

interface WelcomeBackModalProps {
  open: boolean;
  onResume: () => void;
  onRestart: () => void;
}

const WelcomeBackModal: React.FC<WelcomeBackModalProps> = ({ open, onResume, onRestart }) => {
  return (
    <Modal
      open={open}
      title={<Title level={4}>Welcome Back!</Title>}
      closable={false}
      footer={[
        <Button key="restart" onClick={onRestart}>
          Restart Interview
        </Button>,
        <Button key="resume" type="primary" onClick={onResume}>
          Resume Interview
        </Button>,
      ]}
    >
      <Text>We found an unfinished interview session. Would you like to continue where you left off or start over?</Text>
    </Modal>
  );
};

export default WelcomeBackModal;