
def test_create_ioc(client):
    payload = {
        "type": "ip",
        "value": "8.8.8.8",
        "severity": "High",
        "source": "Unit Test",
        "description": "Google DNS",
    }

    response = client.post("/api/v1/iocs", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["type"] == "ip"
    assert data["value"] == "8.8.8.8"
    assert data["severity"] == "High"
    assert data["source"] == "Unit Test"
    assert data["description"] == "Google DNS"
    assert "id" in data


def test_get_ioc_by_id(client):
    payload = {
        "type": "ip",
        "value": "1.1.1.1",
        "severity": "Medium",
        "source": "Cloudflare",
        "description": "Cloudflare DNS",
    }

    create = client.post("/api/v1/iocs", json=payload)

    assert create.status_code == 200

    ioc_id = create.json()["id"]

    response = client.get(f"/api/v1/iocs/{ioc_id}")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == ioc_id
    assert data["value"] == "1.1.1.1"
    assert data["type"] == "ip"

def test_get_all_iocs(client):
    client.post(
        "/api/v1/iocs",
        json={
            "type": "ip",
            "value": "8.8.8.8",
            "severity": "High",
            "source": "Google",
            "description": "DNS",
        },
    )

    client.post(
        "/api/v1/iocs",
        json={
            "type": "domain",
            "value": "example.com",
            "severity": "Low",
            "source": "Manual",
            "description": "Example Domain",
        },
    )

    response = client.get("/api/v1/iocs")

    assert response.status_code == 200

    data = response.json()

    assert "items" in data
    assert len(data["items"]) == 2
    assert data["total"] == 2

def test_update_ioc(client):
    create = client.post(
        "/api/v1/iocs",
        json={
            "type": "ip",
            "value": "8.8.8.8",
            "severity": "Low",
            "source": "Manual",
            "description": "Original",
        },
    )

    assert create.status_code == 200

    ioc_id = create.json()["id"]

    response = client.put(
        f"/api/v1/iocs/{ioc_id}",
        json={
            "severity": "Critical",
            "source": "VirusTotal",
            "description": "Updated IOC",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["severity"] == "Critical"
    assert data["source"] == "VirusTotal"
    assert data["description"] == "Updated IOC"

def test_delete_ioc(client):
    create = client.post(
        "/api/v1/iocs",
        json={
            "type": "ip",
            "value": "1.1.1.1",
            "severity": "Low",
            "source": "Manual",
            "description": "Delete Test",
        },
    )

    ioc_id = create.json()["id"]

    response = client.delete(f"/api/v1/iocs/{ioc_id}")

    assert response.status_code == 200
    assert response.json()["message"] == "IOC deleted successfully"

    response = client.get(f"/api/v1/iocs/{ioc_id}")

    assert response.status_code == 404
def test_invalid_ip(client):
    response = client.post(
        "/api/v1/iocs",
        json={
            "type": "ip",
            "value": "999.999.999.999",
            "severity": "Low",
            "source": "Unit Test",
            "description": "Invalid IP",
        },
    )

    assert response.status_code == 400

def test_duplicate_ioc(client):
    payload = {
        "type": "ip",
        "value": "8.8.8.8",
        "severity": "High",
        "source": "Manual",
        "description": "Duplicate Test",
    }

    response1 = client.post("/api/v1/iocs", json=payload)
    assert response1.status_code == 200

    response2 = client.post("/api/v1/iocs", json=payload)

    assert response2.status_code == 409

def test_search_ioc(client):
    client.post(
        "/api/v1/iocs",
        json={
            "type": "domain",
            "value": "example.com",
            "severity": "Low",
            "source": "Manual",
            "description": "Example",
        },
    )

    response = client.get("/api/v1/iocs?search=example")

    assert response.status_code == 200

    data = response.json()

    assert data["total"] == 1
    assert data["items"][0]["value"] == "example.com"

def test_pagination(client):
    for i in range(15):
        client.post(
            "/api/v1/iocs",
            json={
                "type": "domain",
                "value": f"test{i}.com",
                "severity": "Low",
                "source": "Unit Test",
                "description": "Pagination",
            },
        )

    response = client.get("/api/v1/iocs?page=2&limit=10")

    assert response.status_code == 200

    data = response.json()

    assert data["page"] == 2
    assert data["limit"] == 10
    assert len(data["items"]) == 5