
from io import BytesIO

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate


class PDFGenerator:

    @staticmethod
    def generate_ioc_report(report: dict) -> bytes:
        buffer = BytesIO()

        doc = SimpleDocTemplate(buffer)

        styles = getSampleStyleSheet()

        story = []

        story.append(
            Paragraph(
                "<b>ThreatFusion</b>",
                styles["Title"],
            )
        )

        story.append(
            Paragraph(
                "Cyber Threat Intelligence Report",
                styles["Heading2"],
            )
        )

        story.append(
            Paragraph("<br/>", styles["BodyText"])
        )

        ioc = report["ioc"]

        threat = report["threat_report"]

        story.append(
            Paragraph(
                f"<b>IOC:</b> {ioc['value']}",
                styles["BodyText"],
            )
        )

        story.append(
            Paragraph(
                f"<b>Type:</b> {ioc['type']}",
                styles["BodyText"],
            )
        )

        story.append(
            Paragraph(
                f"<b>Threat Score:</b> {threat['threat_score']}",
                styles["BodyText"],
            )
        )

        story.append(
            Paragraph(
                f"<b>Threat Level:</b> {threat['threat_level']}",
                styles["BodyText"],
            )
        )

        story.append(
            Paragraph("<br/>", styles["BodyText"])
        )

        story.append(
            Paragraph(
                "<b>Analyst Summary</b>",
                styles["Heading2"],
            )
        )

        for line in threat["summary"]:
            story.append(
                Paragraph(
                    f"• {line}",
                    styles["BodyText"],
                )
            )

        doc.build(story)

        pdf = buffer.getvalue()

        buffer.close()

        return pdf