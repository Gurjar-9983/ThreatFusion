
import json
from pathlib import Path


class MITREAttackClient:
    """
    Temporary local ATT&CK mapping.

    Later this will be replaced by
    ATT&CK STIX dataset.
    """

    DATA_FILE = (
        Path(__file__)
        .parent
        / "data"
        / "attack_mapping.json"
    )

    _cache = None

    @classmethod
    def load(cls):
        if cls._cache is None:
            try:
                with open(cls.DATA_FILE, "r") as f:
                    cls._cache = json.load(f)
            except Exception:
                cls._cache = {}

        return cls._cache

    @classmethod
    def get_attack(cls, cve_id: str):
        return cls.load().get(cve_id, [])