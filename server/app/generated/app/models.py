# generated by fastapi-codegen:
#   filename:  ../openapi.yaml
#   timestamp: 2024-11-07T19:06:13+00:00

from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class TranscriptionsPostRequest(BaseModel):
    file: bytes = Field(..., description='The audio file to transcribe')
    transcriber: str = Field(..., description='The transcription engine to use')


class TranscriptionsPostResponse(BaseModel):
    transcription_id: Optional[str] = Field(
        None, description='Unique identifier for the transcription'
    )
    status: Optional[str] = Field(None, example='processing')


class TranscriptionsGetResponseItem(BaseModel):
    transcription_id: Optional[str] = Field(
        None, description='Unique identifier for the transcription'
    )
    transcriber: Optional[str] = Field(None, description='Transcription engine used')
    date: Optional[datetime] = Field(None, description='Date of the transcription')
    status: Optional[str] = Field(None, description='Status of the transcription')
    transcription_text: Optional[str] = Field(
        None, description='Transcribed text, if available'
    )


class TranscribersGetResponseItem(BaseModel):
    id: Optional[str] = Field(None, description='Unique identifier for the transcriber')
    name: Optional[str] = Field(None, description='Name of the transcriber')
    description: Optional[str] = Field(
        None, description='Description of the transcriber and its capabilities'
    )
