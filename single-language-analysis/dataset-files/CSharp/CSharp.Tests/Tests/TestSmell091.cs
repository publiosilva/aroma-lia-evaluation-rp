using Xunit;
using System.IO;

public class TestSmell091
{
    [Fact]
    public void TestMakedirs()
    {
        var d = new Path(tmpdir);

        var tempf = d / "temp.txt";
        tempf.Touch();
        try
        {
            var foo = d / "foo";
            var boz = foo / "bar" / "baz" / "boz";
            boz.MakeDirs();
            try
            {
                Assert.True(boz.IsDir());
            }
            finally
            {
                boz.RemoveDirs();
            }
            Assert.False(foo.Exists());
            Assert.True(d.Exists());

            foo.MakeDir(0o750);
            boz.MakeDirs(0o700);
            try
            {
                Assert.True(boz.IsDir());
            }
            finally
            {
                boz.RemoveDirs();
            }
            Assert.False(foo.Exists());
            Assert.True(d.Exists());
        }
        finally
        {
            File.Delete(tempf);
        }
    }
}