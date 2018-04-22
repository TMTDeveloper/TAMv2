using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class Riskreport
    {

        /****** Script for SelectTopNRows command from SSMS  ******/


        public Int16 YearActive { get; set; }
        public Int64 No { get; set; }
        public string RiskNo { get; set; }
        public string DepartmentKpi { get; set; }
        public string LossEvent { get; set; }
        public string Caused { get; set; }
        public string RiskImpact { get; set; }
        public string FinImpactIr { get; set; }
        public string OpImpactIr { get; set; }
        public string FinImpactRd { get; set; }
        public string OpImpactRd { get; set; }
        public string QlImpactIr { get; set; }
        public string QlImpactRd { get; set; }
        public string IrImpact { get; set; }
        public string RdImpact { get; set; }
        public string ExImpact { get; set; }
        public string IrLikelihood { get; set; }
        public string RdLikelihood { get; set; }
        public string ExLikelihood { get; set; }
        public string IrOverall { get; set; }
        public string RdOverall { get; set; }
        public string ExOverall { get; set; }


    }
}

