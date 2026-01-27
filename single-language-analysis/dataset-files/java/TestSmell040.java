// Original URL: https://github.com/MaximeAttevall/AdventureGame/blob/dd9997a20b2270a6c5dd80e995b442250bd64088/funcTest.java#L15-L36

public class TestSmell040 {
    @Test
    public void testReadJsonFromFile() {
        // Anta att JSON-filen finns och innehåller en giltig sträng
        String fakeJsonData = "Deathcounter: 0";
        try {
            // Skapa en temporär fil med testdata
            Path tempFilePath = Files.createTempFile("tempTestFile", ".json");
            Files.write(tempFilePath, fakeJsonData.getBytes());

            // Testa att läsa från filen
            int result = func.readJsonFromFile();

            // Kontrollerar att resultatet är 0 baserat på det falska JSON-data som skapades
            assertEquals(0, result);

            // Radera den temporära filen efter testet
            Files.delete(tempFilePath);
        } catch (IOException e) {
            // Fångar IOException om det uppstår
            e.printStackTrace();
        }
    }
}
