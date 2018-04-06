import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FinancialIndicatorRiskModalComponent } from "./modal/financial.indicator.risk.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-financial-indicator-risk",
  templateUrl: "./financial.indicator.risk.component.html"
})
export class FinancialIndicatorRiskComponent {
  @ViewChild("myForm") private myForm: NgForm;
  settings: any = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    mode: "inline",
    sort: true,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: "right",
      columnTitle: "Modify",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      counterNo: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      impact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "30%"
      },
      percentageValue: {
        title: "Percentage",
        type: "decimal(5,2)",
        filter: false,
        editable: true,
        width: "30%"
      },
      numberValue: {
        title: "Number",
        type: "numeric",
        filter: false,
        editable: true,
        width: "30%"
      }
    }
  };

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
      data: "NEP",
      desc: "Net Profit"
    },
    {
      data: "REV",
      desc: "Revenue"
    },
    {
      data: "COF",
      desc: "Cost of revenue"
    },
    {
      data: "OEF",
      desc: "Operating expenses"
    },
    {
      data: "CHG",
      desc: "Non operating income/charges"
    }
  ];

  source: LocalDataSource = new LocalDataSource();
  riskIndicatorData: any;
  tabledata: any[] = [];

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
    this.service.getreq("TbMRiskIndicators").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(response);
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();

          data[ind].score == null
            ? (data[ind].score = 0)
            : data[ind].score.toString();
          this.riskIndicatorData = data;
        });
        this.service.getreq("TbMFinancialImpacts").subscribe(response => {
          if (response != null) {
            const data = response;
            console.log(response);
            data.forEach((element, ind) => {
              let impact = this.riskIndicatorData.filter(function(item) {
                return (
                  item.yearActive == data[ind].yearActive.toString() &&
                  item.indicatorId == data[ind].riskIndicatorId
                );
              });
              data[ind].yearActive = data[ind].yearActive.toString();
              data[ind].status = "0";
              data[ind].impact = impact[0].description;
              this.tabledata = data;
              this.source.load(this.tabledata);
            });
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.source
      .load(this.tabledata)
      .then(resp => {
        this.myForm.setValue({
          condition: "NEP",
          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
      });

    console.log(this.myForm.value.condition);
  }

  showModal(no_iku) {
    this.activeModal = this.modalService.open(
      FinancialIndicatorRiskModalComponent,
      {
        windowClass: "xlModal",
        container: "nb-layout",
        backdrop: "static"
      }
    );
    let lastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].YEAR_ACTIVE == this.myForm.value.yearPeriode &&
        this.tabledata[data].CONDITION == this.myForm.value.condition
      ) {
        lastIndex < this.tabledata[data].COUNTER_NO
          ? (lastIndex = this.tabledata[data].COUNTER_NO)
          : null;
      }
    }

    const indicator = this.indicatorGenerate(lastIndex);

    this.activeModal.componentInstance.formData = {
      COUNTER_NO: lastIndex + 1,
      YEAR_ACTIVE: this.myForm.value.yearPeriode,
      DESCRIPTION: "",
      CONDITION: this.myForm.value.condition,
      INDICATOR_ID: indicator,
      SCORE: ""
    };

    this.activeModal.result.then(async response => {
      if (response != false) {
        this.tabledata.push(response);
        this.reload();
      }
    });
  }

  indicatorGenerate(lastIndex) {
    switch (lastIndex.toString().length) {
      case 3:
        return this.myForm.value.condition + lastIndex.toString();

      case 2:
        return this.myForm.value.condition + "0" + lastIndex.toString();

      case 1:
        return this.myForm.value.condition + "00" + lastIndex.toString();
    }
  }

  reload() {
    this.source.setFilter(
      [
        { field: "category", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
  }
  submit() {
    this.toastr.success("Data Saved!");
  }
}
