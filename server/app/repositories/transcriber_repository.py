from typing import List
from entities.transcriber_entity import Transcriber

# In-memory list of available transcribers
transcribers_db = [
    Transcriber(id="1", name="Transcriber A", description="High accuracy transcription engine"),
    Transcriber(id="2", name="Transcriber B", description="Fast transcription engine"),
]

class TranscriberRepository:
    @staticmethod
    def get_all_transcribers() -> List[Transcriber]:
        return transcribers_db

    @staticmethod
    def is_transcriber_available(transcriber_id: str) -> bool:
        return any(t.id == transcriber_id for t in transcribers_db)
