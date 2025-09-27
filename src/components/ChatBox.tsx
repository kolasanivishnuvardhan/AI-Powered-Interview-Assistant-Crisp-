import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, List, Avatar, Card, Space, Divider, Typography } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import { RootState, AppDispatch } from '../store';
import { addMessage, clearChat } from '../store/slices/chatSlice';
import { resetCandidate, setCandidateName, setCandidateEmail, setCandidatePhone } from '../store/slices/candidateSlice';
import { resetAnswers, startInterview, submitAnswer } from '../store/slices/answersSlice';
import { addCompletedCandidate } from '../store/slices/candidatesSlice';
import { generateInterviewQuestions, evaluateAnswer, generateSummary } from '../utils/ai';
import { ChatMessage } from '../types/chat';
import { CompletedCandidate } from '../types/candidate';
import Timer from './Timer';

const { Text } = Typography;

type InfoCollectionState = 'name' | 'email' | 'phone' | 'confirmation' | 'ready_to_start' | 'complete';

const ChatBox: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { info: candidateInfo } = useSelector((state: RootState) => state.candidate);
  const { messages } = useSelector((state: RootState) => state.chat);
  const { questions, answers, currentQuestionIndex, interviewStatus } = useSelector((state: RootState) => state.answers);

  const [inputValue, setInputValue] = useState('');
  const [infoState, setInfoState] = useState<InfoCollectionState>('complete');
  const listRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const sendBotMessage = useCallback((text: string) => {
    const newMessage: ChatMessage = { id: `bot-${Date.now()}`, sender: 'bot', text, timestamp: Date.now() };
    dispatch(addMessage(newMessage));
  }, [dispatch]);

  const askNextInfoQuestion = useCallback((info: typeof candidateInfo) => {
    if (!info.name) {
      setInfoState('name');
      sendBotMessage("Hello! I see we don't have your name yet. What is your full name?");
    } else if (!info.email) {
      setInfoState('email');
      sendBotMessage(`Thanks, ${info.name}. What is your email address?`);
    } else if (!info.phone) {
      setInfoState('phone');
      sendBotMessage('Great. And finally, what is your phone number?');
    } else {
      setInfoState('confirmation');
      sendBotMessage(`Perfect, thank you! I have your details as:\n- Name: ${info.name}\n- Email: ${info.email}\n- Phone: ${info.phone}\nIs this correct? (yes/no)`);
    }
  }, [sendBotMessage]);

  useEffect(() => {
    if (interviewStatus === 'not_started' && messages.length === 0) {
      askNextInfoQuestion(candidateInfo);
    }
  }, [interviewStatus, messages.length, candidateInfo, askNextInfoQuestion]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleBeginInterview = useCallback(() => {
    const generatedQuestions = generateInterviewQuestions();
    dispatch(startInterview(generatedQuestions));
    sendBotMessage("Excellent! Let's begin the interview. I will ask you 6 questions. Each has a time limit. Please answer concisely. Here is your first question:");
  }, [dispatch, sendBotMessage]);

  useEffect(() => {
    if (interviewStatus === 'in_progress' && currentQuestion) {
      sendBotMessage(`Question ${currentQuestionIndex + 1}/${questions.length} (${currentQuestion.level}):\n${currentQuestion.text}`);
    }
  }, [interviewStatus, currentQuestion, currentQuestionIndex, questions.length, sendBotMessage]);

  const handleSubmitAnswer = useCallback((answerText: string) => {
    if (!currentQuestion) return;

    const score = evaluateAnswer(currentQuestion, { questionId: currentQuestion.id, text: answerText, score: 0 });
    dispatch(submitAnswer({ questionId: currentQuestion.id, text: answerText, score }));

    const userMessage: ChatMessage = {
      id: `user-ans-${Date.now()}`,
      sender: 'user',
      text: answerText || '(No answer provided)',
      timestamp: Date.now(),
    };
    dispatch(addMessage(userMessage));
    setInputValue('');
  }, [dispatch, currentQuestion]);

  useEffect(() => {
    // This effect handles the session hand-off after the interview is completed.
    if (interviewStatus === 'completed' && answers.length === questions.length && questions.length > 0) {
      const finalScore = answers.reduce((total, ans) => total + ans.score, 0);
      const summary = generateSummary();

      const completedCandidate: CompletedCandidate = {
        id: candidateInfo.id!,
        profile: candidateInfo,
        questions,
        answers,
        finalScore,
        summary,
        completedAt: Date.now(),
      };

      dispatch(addCompletedCandidate(completedCandidate));
      sendBotMessage(`Thank you for completing the interview! \n\nYour final score is ${finalScore}/110. \n\nSummary: ${summary}\n\nThis session will now be reset.`);

      // Reset the state for the next candidate after a delay
      setTimeout(() => {
        dispatch(resetCandidate());
        dispatch(resetAnswers());
        dispatch(clearChat());
      }, 5000);
    }
  }, [interviewStatus, answers, questions, candidateInfo, dispatch, sendBotMessage]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = { id: `user-info-${Date.now()}`, sender: 'user', text: inputValue, timestamp: Date.now() };
    dispatch(addMessage(userMessage));

    let updatedInfo = { ...candidateInfo };

    switch (infoState) {
      case 'name':
        dispatch(setCandidateName(inputValue));
        updatedInfo.name = inputValue;
        askNextInfoQuestion(updatedInfo);
        break;
      case 'email':
        dispatch(setCandidateEmail(inputValue));
        updatedInfo.email = inputValue;
        askNextInfoQuestion(updatedInfo);
        break;
      case 'phone':
        dispatch(setCandidatePhone(inputValue));
        updatedInfo.phone = inputValue;
        askNextInfoQuestion(updatedInfo);
        break;
      case 'confirmation':
        if (inputValue.toLowerCase().startsWith('y')) {
          setInfoState('ready_to_start');
          sendBotMessage('Excellent! Shall we begin the interview? (yes/no)');
        } else {
          dispatch(resetCandidate());
          askNextInfoQuestion({ id: uuidv4(), name: null, email: null, phone: null });
        }
        break;
      case 'ready_to_start':
        if (inputValue.toLowerCase().startsWith('y')) {
          setInfoState('complete');
          handleBeginInterview();
        } else {
          sendBotMessage("No problem. Let me know when you're ready to start.");
        }
        break;
    }
    setInputValue('');
  };

  const isInterviewActive = interviewStatus === 'in_progress' && currentQuestion;
  const isInputDisabled = infoState !== 'complete' || isInterviewActive;

  return (
    <Card title="AI Interview Assistant">
      <div ref={listRef} style={{ height: '400px', overflowY: 'auto', padding: '16px', border: '1px solid #f0f0f0', marginBottom: '16px' }}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item style={{ borderBottom: 'none' }}>
              <List.Item.Meta
                avatar={<Avatar icon={item.sender === 'bot' ? <RobotOutlined /> : <UserOutlined />} />}
                title={item.sender === 'bot' ? 'AI Assistant' : 'You'}
                description={<Text style={{ whiteSpace: 'pre-wrap' }}>{item.text}</Text>}
              />
            </List.Item>
          )}
        />
      </div>

      {isInterviewActive && (
        <>
          <Divider />
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Timer key={currentQuestion.id} duration={currentQuestion.timeLimit} onTimeUp={() => handleSubmitAnswer(inputValue)} />
            <Input.TextArea
              rows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer here..."
            />
            <Button type="primary" onClick={() => handleSubmitAnswer(inputValue)}>Submit Answer</Button>
          </Space>
          <Divider />
        </>
      )}

      {!isInterviewActive && interviewStatus !== 'completed' && (
        <div style={{ display: 'flex' }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSendMessage}
            placeholder="Type your message..."
            disabled={infoState === 'complete'}
          />
          <Button type="primary" onClick={handleSendMessage} style={{ marginLeft: '8px' }} disabled={infoState === 'complete'}>Send</Button>
        </div>
      )}
    </Card>
  );
};

export default ChatBox;