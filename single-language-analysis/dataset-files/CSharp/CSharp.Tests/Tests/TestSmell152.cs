using Xunit;
using System;

public class TestSmell152
{
    [Fact]
    public void TestPR655()
    {
        var pr655 = Hardware.FindPhotometer(device: "PR655");
        if (pr655 == null)
        {
            Console.WriteLine("no device found");
        }
        else
        {
            Console.WriteLine(("type:", pr655.Type));
            Console.WriteLine(("SN:", pr655.GetDeviceSN()));
            if (pr655.Type == "D")
            {
                // Skip test on Linux devices that return 'D'
                return;
            }
            pr655.Measure();
            Console.WriteLine(("lum", pr655.LastLum));
            Console.WriteLine(("uv", pr655.LastUV));
            Console.WriteLine(("xy", pr655.LastXY));
            Console.WriteLine(("tristim", pr655.LastTristim));
            var (nm, spec) = pr655.GetLastSpectrum();
            Console.WriteLine(("nm", nm));
            Console.WriteLine(("spec", spec));
            Console.WriteLine(("temperature", pr655.LastColorTemp));
        }

        Console.WriteLine("DONE");
    }
}