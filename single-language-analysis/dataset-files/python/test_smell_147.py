# Original URL: https://github.com/Ranack/twit_sentiments/blob/e0aca8c7d97b34dbd268a5295598b29296546d4b/test_api.py#L32-L48

def test_smell_147(headers):
    """Test avec un texte négatif."""
    data = {"text": "I hate this product!"}

    # Envoi de la requête POST
    response = requests.post(BASE_URL, json=data, headers=headers)

    # Afficher la réponse brute pour le débogage
    print(f"Response: {response.text}")

    # Vérification du code de statut
    assert response.status_code == 200, f"Expected 200, got {response.status_code} - {response.text}"

    # Vérification de la réponse JSON
    response_json = response.json()
    assert "predicted_label" in response_json, "Response missing 'predicted_label'"
    assert "confidence" in response_json, "Response missing 'confidence'"