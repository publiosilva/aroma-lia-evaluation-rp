# Original URL: https://github.com/Ranack/twit_sentiments/blob/e0aca8c7d97b34dbd268a5295598b29296546d4b/test_api.py#L50-L66

def test_smell_145(headers):
    """Test avec un texte vide."""
    data = {"text": ""}

    # Envoi de la requête POST
    response = requests.post(BASE_URL, json=data, headers=headers)

    # Afficher la réponse brute pour le débogage
    print(f"Response: {response.text}")

    # Vérification du code de statut (on s'attend à une erreur 400 pour un texte vide)
    assert response.status_code == 400, f"Expected 400, got {response.status_code} - {response.text}"

    # Vérification du message d'erreur dans la réponse JSON
    response_json = response.json()
    assert "detail" in response_json, "Error response missing 'detail'"
    assert response_json["detail"] == "Le texte ne peut pas être vide.", f"Expected error message 'Le texte ne peut pas être vide.', got {response_json['detail']}"