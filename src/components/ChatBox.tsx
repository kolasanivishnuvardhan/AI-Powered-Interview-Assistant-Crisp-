import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, List, Avatar, Card } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import { RootState, AppDispatch } from '../store';
import { addMessage } from '../store/slices/chatSlice';
import { setCandidateName, setCandidateEmail, setCandidatePhone } from '../store/slices/candidateSlice';
import { ChatMessage } from '../types/chat';

type CurrentQuestion = 'name' | 'email' | 'phone' | 'confirmation' | null;

const ChatBox: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { info: candidateInfo } = useSelector((state: RootState) => state.candidate);
  const { messages } = useSelector((state: RootState) => state.chat);
  const [inputValue, setInputValue] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sendBotMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text,
      timestamp: Date.now(),
    };
    dispatch(addMessage(newMessage));
  };

  const askNextQuestion = (info: typeof candidateInfo) => {
    if (!info.name) {
      setCurrentQuestion('name');
      sendBotMessage("Hello! I see we don't have your name yet. What is your full name?");
    } else if (!info.email) {
      setCurrentQuestion('email');
      sendBotMessage(`Thanks, ${info.name}. What is your email address?`);
    } else if (!info.phone) {
      setCurrentQuestion('phone');
      sendBotMessage('Great. And finally, what is your phone number?');
    } else {
      setCurrentQuestion('confirmation');
      sendBotMessage(
        `Perfect, thank you! I have your details as:
        - Name: ${info.name}
        - Email: ${info.email}
        - Phone: ${info.phone}
        Is this correct? (yes/no)`
      );
    }
  };

  useEffect(() => {
    // Start the conversation if messages are empty
    if (messages.length === 0) {
      askNextQuestion(candidateInfo);
    }
  }, [candidateInfo]);

  useEffect(() => {
    // Auto-scroll to the latest message
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !currentQuestion) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: Date.now(),
    };
    dispatch(addMessage(userMessage));

    let updatedInfo = { ...candidateInfo };

    if (currentQuestion === 'name') {
      dispatch(setCandidateName(inputValue));
      updatedInfo.name = inputValue;
      askNextQuestion(updatedInfo);
    } else if (currentQuestion === 'email') {
      dispatch(setCandidateEmail(inputValue));
      updatedInfo.email = inputValue;
      askNextQuestion(updatedInfo);
    } else if (currentQuestion === 'phone') {
      dispatch(setCandidatePhone(inputValue));
      updatedInfo.phone = inputValue;
      askNextQuestion(updatedInfo);
    } else if (currentQuestion === 'confirmation') {
      if (inputValue.toLowerCase().startsWith('y')) {
        sendBotMessage('Excellent! Shall we begin the interview?');
      } else {
        sendBotMessage("I'm sorry to hear that. Let's try again. What is your full name?");
        // In a real app, you'd have a more robust correction flow.
        // For now, we'll just restart.
        setCurrentQuestion('name');
      }
      setCurrentQuestion(null); // End of pre-interview chat
    }

    setInputValue('');
  };

  return (
    <Card title="Pre-Interview Chat">
      <div
        ref={listRef}
        style={{ height: '400px', overflowY: 'auto', padding: '16px', border: '1px solid #f0f0f0' }}
      >
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item style={{ borderBottom: 'none' }}>
              <List.Item.Meta
                avatar={
                  <Avatar icon={item.sender === 'bot' ? <RobotOutlined /> : <UserOutlined />} />
                }
                title={item.sender === 'bot' ? 'AI Assistant' : 'You'}
                description={item.text}
              />
            </List.Item>
          )}
        />
      </div>
      <div style={{ display: 'flex', marginTop: '16px' }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type your message..."
          disabled={!currentQuestion}
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          style={{ marginLeft: '8px' }}
          disabled={!currentQuestion}
        >
          Send
        </Button>
      </div>
    </Card>
  );
};

export default ChatBox;