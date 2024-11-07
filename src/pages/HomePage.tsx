// src/pages/HomePage.tsx
import React from 'react';
import AudioUploader from '../components/AudioUploader';
import TranscriptionsList from '../components/TranscriptionsList';

const HomePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <AudioUploader />
      </div>
      <div style={{ flex: 1 }}>
        <TranscriptionsList />
      </div>
    </div>
  );
};

export default HomePage;
