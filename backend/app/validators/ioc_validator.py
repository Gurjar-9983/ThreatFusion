
import ipaddress
import re
from urllib.parse import urlparse

from fastapi import HTTPException

DOMAIN_REGEX = re.compile(
    r"^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
)


def validate_ip(value: str):
    try:
        ipaddress.ip_address(value)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid IP address",
        )


def validate_domain(value: str):
    if not DOMAIN_REGEX.match(value):
        raise HTTPException(
            status_code=400,
            detail="Invalid domain name",
        )


def validate_url(value: str):
    parsed = urlparse(value)

    if not parsed.scheme or not parsed.netloc:
        raise HTTPException(
            status_code=400,
            detail="Invalid URL",
        )


def validate_hash(value: str):
    value = value.lower()

    if len(value) == 32:
        return

    if len(value) == 40:
        return

    if len(value) == 64:
        return

    raise HTTPException(
        status_code=400,
        detail="Invalid hash",
    )


def validate_ioc(ioc_type: str, value: str):
    if ioc_type == "ip":
        validate_ip(value)

    elif ioc_type == "domain":
        validate_domain(value)

    elif ioc_type == "url":
        validate_url(value)

    elif ioc_type == "hash":
        validate_hash(value)