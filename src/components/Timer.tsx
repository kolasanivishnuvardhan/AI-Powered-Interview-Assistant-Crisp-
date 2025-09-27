import React, { useState, useEffect } from 'react';
import { Progress, Typography } from 'antd';

const { Text } = Typography;

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // Exit early if time is up
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Set up the interval
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount or when time is up
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <div style={{ textAlign: 'center' }}>
      <Progress
        type="circle"
        percent={percentage}
        format={() => <Text style={{ fontSize: '24px' }}>{formatTime(timeLeft)}</Text>}
        strokeColor={percentage > 50 ? '#52c41a' : percentage > 25 ? '#faad14' : '#f5222d'}
        width={120}
      />
      <Text style={{ display: 'block', marginTop: '10px' }}>Time Remaining</Text>
    </div>
  );
};

export default Timer;