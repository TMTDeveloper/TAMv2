using System;
using System.Collections.Generic;

namespace tam_risk_project.Models
{
    public partial class TbMRiskReminder
    {

        public short YearActive { get; set; }
        public string TypeReminder { get; set; }
        public short? CounterNo { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public short? Period { get; set; }
        public string UserCreated { get; set; }
        public DateTime? DatetimeCreated { get; set; }
        public string UserUpdate { get; set; }
        public DateTime? DatetimeUpdate { get; set; }

    }
}
