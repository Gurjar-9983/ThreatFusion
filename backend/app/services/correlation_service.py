
from app.integrations.correlation import CorrelationEngine


class CorrelationService:

    @staticmethod
    def correlate(enrichment):

        return CorrelationEngine.correlate(enrichment)