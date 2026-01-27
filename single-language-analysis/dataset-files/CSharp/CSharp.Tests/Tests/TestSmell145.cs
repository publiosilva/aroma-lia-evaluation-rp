using Xunit;

public class TestSmell145
{
    [Fact]
    public void TestPredictEmptyText()
    {
        var data = new { text = "" };

        var response = Requests.Post(BASE_URL, data, headers);

        System.Console.WriteLine($"Response: {response.Text}");

        Assert.Equal(400, response.StatusCode);
        
        var responseJson = response.Json();
        Assert.True(responseJson.ContainsKey("detail"), "Error response missing 'detail'");
        Assert.Equal("Le texte ne peut pas être vide.", responseJson["detail"]);
    }
}