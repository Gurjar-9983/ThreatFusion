from app.core.logger import logger
from app.integrations.correlation import CorrelationEngine


class CorrelationService:
    @staticmethod
    def correlate(enrichment):
        logger.info("Running IOC correlation")
        return CorrelationEngine.correlate(enrichment)