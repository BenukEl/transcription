from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from services.transcription_service import TranscriptionService
from entities.transcription_entity import Transcription
from typing import List

router = APIRouter()

@router.post(
    "",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Transcribe an audio file",
    description="Upload an audio file for transcription using a specified transcription engine."
)
async def create_transcription(
    file: UploadFile = File(..., description="The audio file to transcribe"),
    transcriber: str = Form(..., description="The transcription engine to use")
):
    content = await file.read()
    transcription = TranscriptionService.create_transcription(content, transcriber)
    if not transcription:
        raise HTTPException(status_code=400, detail="Invalid transcriber specified")
    return {
        "transcription_id": transcription.transcription_id,
        "status": transcription.status
    }

@router.get(
    "",
    response_model=List[Transcription],
    summary="List past transcriptions",
    description="Retrieve a list of all previously processed transcriptions."
)
def list_transcriptions():
    return TranscriptionService.get_all_transcriptions()

@router.delete(
    "/{transcription_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a transcription",
    description="Delete a specific transcription using its unique identifier."
)
def delete_transcription(transcription_id: str):
    success = TranscriptionService.delete_transcription(transcription_id)
    if not success:
        raise HTTPException(status_code=404, detail="Transcription not found")
    return
