from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Transcription(BaseModel):
    transcription_id: str
    transcriber: str
    date: datetime
    status: str
    transcription_text: Optional[str] = None
