using System.Collections.Generic;

namespace Pmi.Certification.Functional.Tests
{
    public static class ExperienceType
    {
        public const string AgileExperience = "Agile Experience";
        public const string AgileCoachingExperience = "Agile Coaching Experience";
        public const string GeneralExperience = "General Experience";
        public const string BusinesAnalysisExperience = "Business Analysis Experience";
        public const string ProfessionalExperience = "Professional Experience";
        public const string ProgramExperience = "Program Experience";
        public const string ProjectExperience = "Project Experience";
        public const string PortfolioExperience = "Portfolio Experience";
        public const string Experience = "Experience";
        public const string BusinessExperience = "Business Experience";
        public const string ConstructionExperience = "Construction/Built Environment Experience";
    }
    public static class CertificationType
    {
        public const string PMP = "PMP";
        public const string PfMP = "PFMP";
        public const string PgMP = "PGMP";
        public const string CAPM = "CAPM";
        public const string ACP = "PMI_ACP";
        public const string PBA = "PMI_PBA";
        public const string SP = "PMI_SP";
        public const string RMP = "PMI_RMP";
        public const string DAVSC = "DAVSC";
        public const string DAC = "DAC";
        public const string DASSM = "DASSM";
        public const string CPBEP = "CPBEP";
    }

    public static class CertificationTypeWithRegistredTradeMark
    {
        public static readonly List<string> Certification = new List<string> { "PMP®", "PgMP®", "PMI-SP®", "CAPM®", "PMI-RMP®", "PMI-PBA®", "PMI-ACP®" };
    }
}
