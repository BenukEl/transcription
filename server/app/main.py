from fastapi import FastAPI
from controllers import transcription_controller, transcriber_controller
import uvicorn

app = FastAPI(
    title="Audio Transcription API",
    description="API for transcribing audio files using various transcription engines",
    version="1.0.0"
)

app.include_router(transcription_controller.router, prefix="/transcriptions")
app.include_router(transcriber_controller.router, prefix="/transcribers")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000)
