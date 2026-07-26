
from unittest.mock import MagicMock, patch

from app.services.enrichment_service import EnrichmentService


def test_enrich_ip_cache_hit():
    db = MagicMock()

    ioc = MagicMock()
    ioc.id = 1
    ioc.value = "8.8.8.8"

    cached = MagicMock()
    cached.raw_response = {"cached": True}
    cached.updated_at = EnrichmentService._is_cache_valid.__globals__["datetime"].now(
        EnrichmentService._is_cache_valid.__globals__["timezone"].utc
    )

    with patch(
        "app.services.enrichment_service.EnrichmentRepository.get_latest",
        return_value=cached,
    ), patch(
        "app.services.enrichment_service.VirusTotalClient.get_ip_report"
    ) as vt_mock, patch(
        "app.services.enrichment_service.AbuseIPDBClient.get_ip_report"
    ) as abuse_mock:

        result = EnrichmentService.enrich_ip(db, ioc)

        assert result["ioc"] == "8.8.8.8"
        assert result["providers"]["virustotal"] == {"cached": True}
        assert result["providers"]["abuseipdb"] == {"cached": True}

        vt_mock.assert_not_called()
        abuse_mock.assert_not_called()

from unittest.mock import MagicMock, patch

from app.services.enrichment_service import EnrichmentService


def test_enrich_ip_cache_miss():
    db = MagicMock()

    ioc = MagicMock()
    ioc.id = 1
    ioc.value = "8.8.8.8"

    vt_response = {"malicious": 5}
    abuse_response = {"abuseConfidenceScore": 42}

    with patch(
        "app.services.enrichment_service.EnrichmentRepository.get_latest",
        return_value=None,
    ), patch(
        "app.services.enrichment_service.EnrichmentRepository.save"
    ) as save_mock, patch(
        "app.services.enrichment_service.VirusTotalClient.get_ip_report",
        return_value=vt_response,
    ) as vt_mock, patch(
        "app.services.enrichment_service.AbuseIPDBClient.get_ip_report",
        return_value=abuse_response,
    ) as abuse_mock:

        result = EnrichmentService.enrich_ip(db, ioc)

        assert result["ioc"] == "8.8.8.8"
        assert result["providers"]["virustotal"] == vt_response
        assert result["providers"]["abuseipdb"] == abuse_response

        vt_mock.assert_called_once_with("8.8.8.8")
        abuse_mock.assert_called_once_with("8.8.8.8")

        assert save_mock.call_count == 2

from datetime import datetime, timedelta, timezone
from unittest.mock import MagicMock, patch

from app.services.enrichment_service import EnrichmentService


def test_enrich_ip_expired_cache():
    db = MagicMock()

    ioc = MagicMock()
    ioc.id = 1
    ioc.value = "8.8.8.8"

    expired = MagicMock()
    expired.updated_at = datetime.now(timezone.utc) - timedelta(days=7)
    expired.raw_response = {"old": True}

    vt_response = {"fresh": "vt"}
    abuse_response = {"fresh": "abuse"}

    with patch(
        "app.services.enrichment_service.EnrichmentRepository.get_latest",
        return_value=expired,
    ), patch(
        "app.services.enrichment_service.EnrichmentRepository.save"
    ) as save_mock, patch(
        "app.services.enrichment_service.VirusTotalClient.get_ip_report",
        return_value=vt_response,
    ) as vt_mock, patch(
        "app.services.enrichment_service.AbuseIPDBClient.get_ip_report",
        return_value=abuse_response,
    ) as abuse_mock:

        result = EnrichmentService.enrich_ip(db, ioc)

        assert result["providers"]["virustotal"] == vt_response
        assert result["providers"]["abuseipdb"] == abuse_response

        vt_mock.assert_called_once()
        abuse_mock.assert_called_once()

        assert save_mock.call_count == 2

import pytest
from unittest.mock import MagicMock, patch

from app.services.enrichment_service import EnrichmentService


def test_enrich_ip_provider_failure():
    db = MagicMock()

    ioc = MagicMock()
    ioc.id = 1
    ioc.value = "8.8.8.8"

    with patch(
        "app.services.enrichment_service.EnrichmentRepository.get_latest",
        return_value=None,
    ), patch(
        "app.services.enrichment_service.VirusTotalClient.get_ip_report",
        side_effect=Exception("VirusTotal unavailable"),
    ):

        with pytest.raises(Exception, match="VirusTotal unavailable"):
            EnrichmentService.enrich_ip(db, ioc)