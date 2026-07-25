
def test_login(client):
    payload = {
        "email": "alice@example.com",
        "full_name": "Alice Johnson",
        "password": "StrongPassword123!"
    }

    client.post("/api/v1/auth/register", json=payload)

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": payload["email"],
            "password": payload["password"]
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"