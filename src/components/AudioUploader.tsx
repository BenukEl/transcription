// src/components/AudioUploader.tsx
import React, { useState } from 'react';
import { useAddTranscription } from '../api/transcriptionsApi';
import { Button } from '@codegouvfr/react-dsfr/Button';

const AudioUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const addTranscription = useAddTranscription();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      addTranscription.mutate(file);
    }
  };

  return (
    <div>
      <h3>Upload ou Enregistrer l'audio</h3>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
      <Button onClick={() => alert('Enregistrement en cours...')}>
        Enregistrer
      </Button>
    </div>
  );
};

export default AudioUploader;
