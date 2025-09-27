import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table, Input, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RootState } from '../store';
import { CompletedCandidate } from '../types/candidate';
import CandidateDetailModal from '../components/CandidateDetailModal';

const { Title } = Typography;
const { Search } = Input;

const InterviewerPage: React.FC = () => {
  const { history: candidates } = useSelector((state: RootState) => state.candidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CompletedCandidate | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowClick = (candidate: CompletedCandidate) => {
    setSelectedCandidate(candidate);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCandidate(null);
  };

  const filteredCandidates = useMemo(() => {
    if (!searchTerm) {
      return candidates;
    }
    return candidates.filter(
      (c) =>
        c.profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.profile.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [candidates, searchTerm]);

  const columns: ColumnsType<CompletedCandidate> = [
    {
      title: 'Name',
      dataIndex: ['profile', 'name'],
      key: 'name',
      sorter: (a, b) => (a.profile.name || '').localeCompare(b.profile.name || ''),
    },
    {
      title: 'Email',
      dataIndex: ['profile', 'email'],
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: ['profile', 'phone'],
      key: 'phone',
    },
    {
      title: 'Final Score',
      dataIndex: 'finalScore',
      key: 'finalScore',
      sorter: (a, b) => a.finalScore - b.finalScore,
      defaultSortOrder: 'descend',
      render: (score: number) => `${score} / 110`,
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
      ellipsis: true,
    },
  ];

  return (
    <>
      <Title level={2}>Interviewer Dashboard</Title>
      <Search
        placeholder="Search by name or email"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filteredCandidates}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' }
        })}
      />
      <CandidateDetailModal
        open={isModalVisible}
        onClose={handleModalClose}
        candidate={selectedCandidate}
      />
    </>
  );
};

export default InterviewerPage;