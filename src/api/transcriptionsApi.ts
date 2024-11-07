// src/api/transcriptionsApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fonction pour obtenir les transcriptions
export const useTranscriptions = () =>
  useQuery(['transcriptions'], async () => {
    // Remplacez cette ligne par un appel API réel
    return [{ id: 1, text: 'Transcription exemple' }];
  });

// Fonction pour ajouter une nouvelle transcription
export const useAddTranscription = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (audioFile: File) => {
      // Remplacez cette ligne par un appel API réel de transcription audio
      return { id: Date.now(), text: 'Nouvelle transcription' };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['transcriptions']);
      },
    }
  );
};
