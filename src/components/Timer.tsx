import React, { useState, useEffect, useMemo } from 'react';
import { Progress, Typography } from 'antd';

const { Text } = Typography;

interface TimerProps {
  duration: number; // in seconds
  startTime: number; // JS timestamp (ms) when the timer started
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, startTime, onTimeUp }) => {
  const [now, setNow] = useState(Date.now());

  const timeLeft = useMemo(() => {
    const elapsed = Math.floor((now - startTime) / 1000);
    return Math.max(0, duration - elapsed);
  }, [now, startTime, duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

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