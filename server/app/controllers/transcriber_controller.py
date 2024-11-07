from fastapi import APIRouter
from services.transcriber_service import TranscriberService
from entities.transcriber_entity import Transcriber
from typing import List

router = APIRouter()

@router.get(
    "",
    response_model=List[Transcriber],
    summary="List available transcribers",
    description="Retrieve a list of available transcription engines for audio transcription."
)
def list_transcribers():
    return TranscriberService.get_all_transcribers()
