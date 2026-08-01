
class CorrelationEngine:
    """
    Initial correlation engine.

    Version 1:
        Uses enrichment data.

    Future:
        OpenCTI
        MISP
        ATT&CK
        CISA
        NVD
    """

    @staticmethod
    def correlate(enrichment: dict):

        return {
            "indicator": enrichment.get("indicator"),
            "indicator_type": enrichment.get("type"),
            "threat_score": 80,
            "malware": [],
            "threat_actors": [],
            "related_cves": [],
            "mitre": [],
        }