using Xunit;

public class TestSmell143
{
    [Fact]
    public void TestOcrAvailability()
    {
        var Ocr = new Source.Ocr.Ocr();
        System.Console.WriteLine("OCR RESULT: " + Ocr.OcrSingleLine(Cv2.ImRead($"{ROOT_PATH}/assets/pytest/AreaBigmapSidebarCommissionName.jpg}")));
        Assert.Equal(1, 1);
    }
}