import React, { useState } from 'react';
import { View, Button, useWindowDimensions } from 'react-native';

import SessionProgress from './SessionProgress.react';
import SessionForm from './SessionForm.react';
import { mainTheme as theme } from '../Theme';

interface Session {
  totalJumps: number;
  lapAmount: number;
  progress: number;
  progressText: string;
  startTime: Date;
  endTime: Date;
}

function Home() {
  const [session, setSession] = useState<Session>({
    totalJumps: 500,
    lapAmount: 50,
    progress: 0,
    progressText: '',
    startTime: new Date(),
    endTime: new Date(),
  });

  const width = useWindowDimensions().width;
  const radius = width >= 992 ? width * 0.1 : width * 0.3;

  function submitSessionData(total: number, lapAmount: number) {
    setSession(prevData => ({
      ...prevData,
      totalJumps: total,
      lapAmount: lapAmount,
      startTime: new Date(),
    }));
  }

  function updateProgress() {
    if (session.progress == 100) {
      setSession(prevData => ({
        ...prevData,
        progressText: 'Done!',
        endTime: new Date(),
      }));
      return;
    }

    const laps = Math.ceil(session.totalJumps / session.lapAmount);
    const increments = 100 / laps;
    const current = Math.ceil(session.progress / increments) + 1;
    let newText = `${current}/${laps}`;

    setSession(prevData => ({
      ...prevData,
      progress: prevData.progress + increments,
      progressText: newText,
    }));
  }

  return (
    <View>
      <SessionProgress
        radius={radius}
        stroke={4}
        progress={session.progress}
        text={session.progressText}
      />
      <Button title="Next" onPress={updateProgress} color={theme.accentColor} />
      <SessionForm onSubmit={submitSessionData} />
    </View>
  );
}

export default Home;
