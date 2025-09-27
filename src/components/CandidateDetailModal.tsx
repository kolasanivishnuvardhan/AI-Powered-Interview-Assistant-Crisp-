import React from 'react';
import { Modal, Descriptions, List, Typography, Tag, Divider } from 'antd';
import { CompletedCandidate } from '../types/candidate';
import { Question } from '../types/interview';

const { Title, Text } = Typography;

interface CandidateDetailModalProps {
  open: boolean;
  onClose: () => void;
  candidate: CompletedCandidate | null;
}

const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({ open, onClose, candidate }) => {
  if (!candidate) {
    return null;
  }

  const getQuestionById = (id: string): Question | undefined => {
    return candidate.questions.find(q => q.id === id);
  };

  return (
    <Modal
      title="Candidate Interview Details"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Title level={4}>Candidate Profile</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{candidate.profile.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{candidate.profile.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{candidate.profile.phone}</Descriptions.Item>
        <Descriptions.Item label="Final Score">
          <Text strong>{`${candidate.finalScore} / 110`}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="AI Summary">{candidate.summary}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={4}>Questions & Answers</Title>
      <List
        itemLayout="vertical"
        dataSource={candidate.answers}
        renderItem={item => {
          const question = getQuestionById(item.questionId);
          if (!question) return null;

          return (
            <List.Item key={item.questionId}>
              <List.Item.Meta
                title={
                  <Text strong>
                    {`Q: ${question.text}`}
                  </Text>
                }
                description={
                  <Tag color={question.level === 'Easy' ? 'green' : question.level === 'Medium' ? 'orange' : 'red'}>
                    {question.level}
                  </Tag>
                }
              />
              <Text>
                <strong>Answer:</strong> {item.text || <em>(No answer provided)</em>}
              </Text>
              <br />
              <Text type="secondary">
                <strong>Score:</strong> {item.score} / {question.level === 'Easy' ? 10 : question.level === 'Medium' ? 20 : 25}
              </Text>
            </List.Item>
          );
        }}
      />
    </Modal>
  );
};

export default CandidateDetailModal;