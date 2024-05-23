namespace Pmi.Certification.Functional.Tests.Extensions
{
    using OpenQA.Selenium;

    internal static class Loader
    {
        internal static By PageLoader => By.XPath("//div[@class='PMIIcon animate']/parent::div[starts-with(@class, 'visible')]");
    }
}
