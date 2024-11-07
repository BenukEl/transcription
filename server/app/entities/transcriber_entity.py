from pydantic import BaseModel

class Transcriber(BaseModel):
    id: str
    name: str
    description: str
