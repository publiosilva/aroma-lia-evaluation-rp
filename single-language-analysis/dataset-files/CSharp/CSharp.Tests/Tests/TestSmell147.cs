using Xunit;
using System.Net.Http;
using System.Text.Json;

public class TestSmell147
{
    [Fact]
    public void TestPredictNegativeText()
    {
        var data = new { text = "I hate this product!" };

        var client = new HttpClient();
        var response = client.PostAsync(BASE_URL, new StringContent(JsonSerializer.Serialize(data), System.Text.Encoding.UTF8, "application/json")).Result;

        System.Console.WriteLine($"Response: {response.Content.ReadAsStringAsync().Result}");

        Assert.Equal(200, (int)response.StatusCode);
        
        var responseJson = JsonSerializer.Deserialize<Dictionary<string, object>>(response.Content.ReadAsStringAsync().Result);
        Assert.True(responseJson.ContainsKey("predicted_label"), "Response missing 'predicted_label'");
        Assert.True(responseJson.ContainsKey("confidence"), "Response missing 'confidence'");
    }
}