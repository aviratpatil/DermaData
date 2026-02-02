from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import MagicMock, patch

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "Ingredient Safety API is running"}

@patch("app.main.analyze_ingredients_text")
def test_analyze_endpoint(mock_analyze):
    # Mock return value
    mock_analyze.return_value = {
        "overall_safety_score": 85,
        "risk_level": "Safe",
        "key_concerns": [],
        "ingredients_breakdown": [
            {"name": "Water", "hazard_score": 0, "description": "Solvent.", "is_restricted": False}
        ],
        "missing_ingredients": []
    }

    payload = {"text": "Water, SomethingElse"}
    response = client.post("/analyze", json=payload)
    
    assert response.status_code == 200
    data = response.json()
    assert data["overall_safety_score"] == 85
    assert data["risk_level"] == "Safe"
    assert len(data["ingredients_breakdown"]) == 1
    mock_analyze.assert_called_once()
