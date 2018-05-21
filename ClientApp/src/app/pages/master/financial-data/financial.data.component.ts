import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FinancialDataModalComponent } from "./modal/financial.data.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { isNullOrUndefined } from "util";
@Component({
  selector: "ngx-financial-data",
  templateUrl: "./financial.data.component.html"
})
export class FinancialDataComponent {
  @ViewChild("myForm") private myForm: NgForm;

  year: any[] = [
    {
      data: "2000"
    },
    {
      data: "2001"
    },
    {
      data: "2002"
    },
    {
      data: "2003"
    },
    {
      data: "2004"
    },
    {
      data: "2005"
    },
    {
      data: "2006"
    },
    {
      data: "2007"
    },
    {
      data: "2008"
    },
    {
      data: "2009"
    },
    {
      data: "2010"
    },
    {
      data: "2011"
    },
    {
      data: "2012"
    },
    {
      data: "2013"
    },
    {
      data: "2014"
    },
    {
      data: "2015"
    },
    {
      data: "2016"
    },
    {
      data: "2017"
    },
    {
      data: "2018"
    },
    {
      data: "2019"
    },
    {
      data: "2020"
    },
    {
      data: "2021"
    },
    {
      data: "2022"
    },
    {
      data: "2022"
    },
    {
      data: "2023"
    },
    {
      data: "2024"
    },
    {
      data: "2025"
    },
    {
      data: "2026"
    },
    {
      data: "2027"
    },
    {
      data: "2028"
    },
    {
      data: "2029"
    },
    {
      data: "2030"
    }
  ];
  condition: any[] = [
    {
      data: "OBJ",
      desc: "Company Objectives"
    },
    {
      data: "KPI",
      desc: "Company KPI"
    },
    {
      data: "BP",
      desc: "Company BP"
    }
  ];
  source: LocalDataSource = new LocalDataSource();
  data: any = {
    year: 0,
    cashCashEquivalent: 0,
    netWorkingCapital: 0,
    fixedAssets: 0,
    otherAssets: 0,
    otherLiabilities: 0,
    minorityInterest: 0,
    equity: 0,
    revenue: 0,
    costOfRevenue: 0,
    operatingExpenses: 0,
    nonOperatingIncome: 0,
    taxExpense: 0,
    dividend: 0,
    operatingProfit: 0,
    netIncomeProfit: 0,
    operatingCashFlow: 0,
    userCreated: "Admin",
    datetimeCreated: moment().format(),
    userUpdate: "Admin",
    datetimeUpdate: moment().format(),
    status: "1"
  };
  tabledata: any[] = [
    {
      year: 0,
      cashCashEquivalent: 0,
      netWorkingCapital: 0,
      fixedAssets: 0,
      otherAssets: 0,
      otherLiabilities: 0,
      minorityInterest: 0,
      equity: 0,
      revenue: 0,
      costOfRevenue: 0,
      operatingExpenses: 0,
      nonOperatingIncome: 0,
      taxExpense: 0,
      dividend: 0,
      operatingProfit: 0,
      netIncomeProfit: 0,
      operatingCashFlow: 0,
      userCreated: "Admin",
      datetimeCreated: moment().format(),
      userUpdate: "Admin",
      datetimeUpdate: moment().format(),
      status: "1"
    }
  ];
  yearPeriode: string = moment().format("YYYY");
  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
  }
  loadData() {
    this.service.getreq("TbMFinancialDatas").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].year = data[ind].year.toString();
          data[ind].status = "0";
          this.tabledata = data;
        });
        this.reload();
      }
    });
  }

  reload() {
    let year = this.yearPeriode;
    let arr = this.tabledata.filter(item => {
      return item.year === year;
    });
    console.log(arr[0] != null);
    if (arr[0] != null) {
      console.log("masuksini");
      this.data = arr[0];
      // this.data = {
      //   year: data.year,
      //   cashCashEquivalent: data.cashCashEquivalent,
      //   netWorkingCapital: data.netWorkingCapital,
      //   fixedAssets: data.fixedAssets,
      //   otherAssets: data.otherAssets,
      //   otherLiabilities: data.otherLiabilities,
      //   minorityInterest: data.minorityInterest,
      //   equity: data.equity,
      //   revenue: data.revenue,
      //   costOfRevenue: data.costOfRevenue,
      //   operatingExpenses: data.operatingExpenses,
      //   nonOperatingIncome: data.nonOperatingIncome,
      //   taxExpense: data.taxExpense,
      //   dividend: data.dividend,
      //   operatingProfit: data.operatingProfit,
      //   netIncomeProfit: data.netIncomeProfit,
      //   operatingCashFlow: data.operatingCashFlow,
      //   userCreated: "Admin",
      //   datetimeCreated: data.datetimeCreated,
      //   userUpdate: "Admin",
      //   datetimeUpdate: moment().format(),
      //   status: "0"
      // };
      console.log(this.data);
    } else {
      this.data = {
        year: this.yearPeriode,
        cashCashEquivalent: 0,
        netWorkingCapital: 0,
        fixedAssets: 0,
        otherAssets: 0,
        otherLiabilities: 0,
        minorityInterest: 0,
        equity: 0,
        revenue: 0,
        costOfRevenue: 0,
        operatingExpenses: 0,
        nonOperatingIncome: 0,
        taxExpense: 0,
        dividend: 0,
        operatingProfit: 0,
        netIncomeProfit: 0,
        operatingCashFlow: 0,
        userCreated: "Admin",
        datetimeCreated: moment().format(),
        userUpdate: "Admin",
        datetimeUpdate: moment().format(),
        status: "1"
      };
    }
  }

  submit() {
    console.log(JSON.stringify(this.tabledata));

    if (this.data.status == "1") {
      this.service
        .postreq("TbMFinancialDatas", this.data)
        .subscribe(response => {
          this.loadData();
          console.log(response);
          error => {
            console.log(error);
          };
        });
    } else {
      this.service
        .putreq("TbMFinancialDatas", this.data)
        .subscribe(response => {
          this.loadData();
          error => {
            console.log(error);
          };
        });
    }

    this.toastr.success("Data Saved!");
  }
}
