from repositories.transcription_repository import TranscriptionRepository
from repositories.transcriber_repository import TranscriberRepository
from entities.transcription_entity import Transcription
from config.logger import logger
from typing import List, Optional

class TranscriptionService:
    @staticmethod
    def create_transcription(file: bytes, transcriber: str) -> Optional[Transcription]:
        logger.info(f"Creating transcription using transcriber {transcriber}")
        if not TranscriberRepository.is_transcriber_available(transcriber):
            logger.error(f"Transcriber {transcriber} is not available")
            return None
        transcription = TranscriptionRepository.create_transcription(transcriber)
        # Simulate transcription processing...
        transcription.status = "completed"
        transcription.transcription_text = "Simulated transcription text."
        transcriptions_db = TranscriptionRepository.transcriptions_db
        transcriptions_db[transcription.transcription_id] = transcription
        logger.info(f"Transcription {transcription.transcription_id} created successfully")
        return transcription

    @staticmethod
    def get_all_transcriptions() -> List[Transcription]:
        logger.info("Fetching all transcriptions")
        return TranscriptionRepository.get_all_transcriptions()

    @staticmethod
    def delete_transcription(transcription_id: str) -> bool:
        logger.info(f"Deleting transcription {transcription_id}")
        return TranscriptionRepository.delete_transcription(transcription_id)
