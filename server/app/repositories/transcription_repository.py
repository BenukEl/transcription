from typing import List, Optional
from entities.transcription_entity import Transcription
from datetime import datetime
import uuid

# In-memory database simulation
transcriptions_db = {}

class TranscriptionRepository:
    @staticmethod
    def create_transcription(transcriber: str) -> Transcription:
        transcription_id = str(uuid.uuid4())
        transcription = Transcription(
            transcription_id=transcription_id,
            transcriber=transcriber,
            date=datetime.utcnow(),
            status="processing"
        )
        transcriptions_db[transcription_id] = transcription
        return transcription

    @staticmethod
    def get_all_transcriptions() -> List[Transcription]:
        return list(transcriptions_db.values())

    @staticmethod
    def delete_transcription(transcription_id: str) -> bool:
        if transcription_id in transcriptions_db:
            del transcriptions_db[transcription_id]
            return True
        return False

    @staticmethod
    def get_transcription(transcription_id: str) -> Optional[Transcription]:
        return transcriptions_db.get(transcription_id)
