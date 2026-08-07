
from app.ai.rules import ThreatRules


class ThreatAnalyst:

    @staticmethod
    def analyze(report):

        vt = report["providers"].get(
            "virustotal",
            {},
        )

        abuse = report["providers"].get(
            "abuseipdb",
            {},
        )

        analysis = ThreatRules.calculate(
            vt,
            abuse,
        )

        summary = (
            f"The indicator was classified as "
            f"{analysis['level']} risk "
            f"based on VirusTotal and "
            f"AbuseIPDB intelligence."
        )

        return {
            "summary": summary,
            "level": analysis["level"],
            "score": analysis["score"],
            "confidence": analysis["confidence"],
            "recommendation": analysis["recommendation"],
            "reasoning": analysis["reasons"],
        }