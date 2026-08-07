
class ThreatRules:

    @staticmethod
    def calculate(
        vt,
        abuse,
    ):
        malicious = vt.get(
            "malicious",
            0,
        )

        abuse_score = abuse.get(
            "abuse_confidence_score",
            0,
        )

        score = 0

        reasons = []

        recommendation = "Monitor"

        if malicious >= 10:
            score += 50

            reasons.append(
                "VirusTotal detected many malicious engines."
            )

        elif malicious >= 1:
            score += 20

            reasons.append(
                "VirusTotal detected a small number of malicious engines."
            )

        if abuse_score >= 80:
            score += 40

            reasons.append(
                "AbuseIPDB reports heavy abuse."
            )

        elif abuse_score >= 30:
            score += 20

            reasons.append(
                "AbuseIPDB reports suspicious activity."
            )

        if score >= 80:
            level = "Critical"
            recommendation = "Block Immediately"

        elif score >= 60:
            level = "High"
            recommendation = "Investigate Immediately"

        elif score >= 30:
            level = "Medium"
            recommendation = "Monitor Closely"

        else:
            level = "Low"

        confidence = min(
            score + 20,
            99,
        )

        return {
            "level": level,
            "score": score,
            "confidence": confidence,
            "recommendation": recommendation,
            "reasons": reasons,
        }