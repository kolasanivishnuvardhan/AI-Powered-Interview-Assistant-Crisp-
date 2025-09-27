import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, Button, message, Card, Descriptions, Spin, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { parseResume } from '../utils/resumeParser';
import { setCandidateInfo, setParsingError } from '../store/slices/candidateSlice';
import { RootState } from '../store';

const ResumeUploader: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { info: candidateInfo, error } = useSelector((state: RootState) => state.candidate);

  const handleUpload = async (file: File) => {
    setLoading(true);
    dispatch(setParsingError('')); // Clear previous errors

    try {
      const extractedInfo = await parseResume(file);
      dispatch(setCandidateInfo(extractedInfo));
      message.success('Resume parsed successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      dispatch(setParsingError(errorMessage));
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }

    return false; // Prevent default upload behavior
  };

  return (
    <Spin spinning={loading} tip="Parsing resume...">
      <Card title="Upload Resume">
        <Upload
          beforeUpload={handleUpload}
          showUploadList={false}
          accept=".pdf,.docx"
        >
          <Button icon={<UploadOutlined />}>Select PDF or DOCX File</Button>
        </Upload>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginTop: '20px' }}
          />
        )}

        {candidateInfo.name && !error && (
          <Card title="Extracted Information" style={{ marginTop: '20px' }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">
                {candidateInfo.name || 'Not found'}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {candidateInfo.email || 'Not found'}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {candidateInfo.phone || 'Not found'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Card>
    </Spin>
  );
};

export default ResumeUploader;