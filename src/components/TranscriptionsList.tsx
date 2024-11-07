// src/components/TranscriptionsList.tsx
import React from 'react';
import { useTranscriptions } from '../api/transcriptionsApi';

const TranscriptionsList: React.FC = () => {
  const { data: transcriptions, isLoading } = useTranscriptions();

  if (isLoading) return <p>Chargement des transcriptions...</p>;

  return (
    <div>
      <h3>Liste des Transcriptions</h3>
      <ul>
        {transcriptions?.map((transcription) => (
          <li key={transcription.id}>{transcription.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TranscriptionsList;
