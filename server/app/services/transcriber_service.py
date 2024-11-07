from repositories.transcriber_repository import TranscriberRepository
from entities.transcriber_entity import Transcriber
from config.logger import logger
from typing import List

class TranscriberService:
    @staticmethod
    def get_all_transcribers() -> List[Transcriber]:
        logger.info("Fetching all transcribers")
        return TranscriberRepository.get_all_transcribers()
