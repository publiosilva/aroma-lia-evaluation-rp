import org.junit.Test;
import static org.junit.Assert.*;
import java.util.HashMap;
import java.util.Map;

public class TestSmell145 {

    @Test
    public void testPredictEmptyText() {
        Map<String, String> data = new HashMap<>();
        data.put("text", "");

        // Envoi de la requête POST
        Response response = requests.post(BASE_URL, data, headers);

        // Afficher la réponse brute pour le débogage
        System.out.println("Response: " + response.getText());

        // Vérification du code de statut (on s'attend à une erreur 400 pour un texte vide)
        assertEquals(400, response.getStatusCode());

        // Vérification du message d'erreur dans la réponse JSON
        Map<String, Object> responseJson = response.json();
        assertTrue(responseJson.containsKey("detail"));
        assertEquals("Le texte ne peut pas être vide.", responseJson.get("detail"));
    }
}