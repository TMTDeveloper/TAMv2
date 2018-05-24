import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OperationalIndicatorRiskModalComponent } from "./modal/operational.indicator.risk.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { isNullOrUndefined } from "util";
@Component({
  selector: "ngx-operational-indicator-risk",
  templateUrl: "./operational.indicator.risk.component.html"
})
export class OperationalIndicatorRiskComponent {
  percentageCheck: boolean;
  tabledata: any[] = [];
  yearPeriode: any = moment().format("YYYY");
  subscription: any;
  activeModal: any;
  riskIndicatorData: any = [];
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
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
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
      edit: this.yearPeriode == moment().format("YYYY"),
      delete: false,
      position: "right",
      columnTitle: "Edit",
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
      descriptionrisk: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: false,
        width: "40%"
      },
      numberValue: {
        title: "Number",
        type: "string",
        filter: false,
        editable: true,
        width: "45%",
        valuePrepareFunction: value => {
          if (isNaN(value)) {
            return 0;
          } else {
            return Number(value)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          }
        }
      },
      uom: {
        title: "UOM",
        type: "string",
        filter: false,
        editable: false,
        width: "25%",
        valuePrepareFunction: value => {
          switch (this.myForm.value.condition) {
            case "SAL":
              return "Unit";
            case "DOD":
              return "Days";
            default:
              return "Percent";
          }
        }
      }
    }
  };
  year: any[] = [
    {
      data: moment().subtract(9,'years').format("YYYY")
    },
    {
      data: moment().subtract(8,'years').format("YYYY")
    },
    {
      data: moment().subtract(7,'years').format("YYYY")
    },
    {
      data: moment().subtract(6,'years').format("YYYY")
    },
    {
      data: moment().subtract(5,'years').format("YYYY")
    },
    {
      data: moment().subtract(4,'years').format("YYYY")
    },
    {
      data: moment().subtract(3,'years').format("YYYY")
    },
    {
      data: moment().subtract(2,'years').format("YYYY")
    },
    {
      data: moment().subtract(1,'years').format("YYYY")
    },
    {
      data: moment().format("YYYY")
    }
  ];
  condition: any[] = [
    {
      data: "MAS",
      desc: "M/S"
    },
    {
      data: "SAL",
      desc: "Service Share"
    },
    {
      data: "CSA",
      desc: "CS Score"
    },
    {
      data: "CAS",
      desc: "Employee Satisfaction"
    },
    {
      data: "DOD",
      desc: "Days of operation disruption"
    }
  ];
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
    this.percentageCheck= false;
  }
  loadData() {
    this.service.getreq("TbMRiskIndicators").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].score == null
            ? (data[ind].score = 0)
            : data[ind].score.toString();
          data[ind].status = "0";
          this.riskIndicatorData = data;
        });
        this.service.getreq("TbMOperationalImpacts").subscribe(response => {
          if (response != null) {
            const data = response;
            console.log(JSON.stringify(response));
            data.forEach((element, ind) => {
              data[ind].yearActive = data[ind].yearActive.toString();
              data[ind].status = "0";
              let arr = this.riskIndicatorData.filter(function(item) {
                return item.indicatorId == data[ind].riskIndicatorId;
              });
              if (arr[0] != null) {
                data[ind].descriptionrisk = arr[0].description;
              }
              this.tabledata = data;
              this.source.load(this.tabledata);
            });
          }

          // error => {
          //   console.log(error);
          // };
        });
      }
    });
  }
  ngAfterViewInit() {
    this.source
      .load(this.tabledata)
      .then(resp => {
        this.myForm.setValue({
          condition: "MAS",
          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
      });

    console.log(this.myForm.value.condition);
  }

  reload() {
    this.yearPeriode = this.myForm.value.yearPeriode;
    switch (this.myForm.value.condition) {
      case "SAL":
       this.percentageCheck=false;
       break;
      case "DOD":
     this.percentageCheck=false;
     break;
      default:
      this.percentageCheck=true;
    };
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>'
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
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
        edit: this.yearPeriode == moment().format("YYYY"),
        delete: false,
        position: "right",
        columnTitle: "Edit",
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
        descriptionrisk: {
          title: "Impact",
          type: "string",
          filter: false,
          editable: false,
          width: "40%"
        },
        numberValue: {
          title: "Number",
          type: "string",
          filter: false,
          editable: true,
          width: "45%",
          valuePrepareFunction: value => {
            if (isNaN(value)) {
              return 0;
            } else {
              return Number(value)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }
          }
        },
        uom: {
          title: "UOM",
          type: "string",
          filter: false,
          editable: false,
          width: "25%",
          valuePrepareFunction: value => {
            switch (this.myForm.value.condition) {
              case "SAL":
                return "Unit";
              case "DOD":
                return "Days";
              default:
                return "Percent";
            }
          }
        }
      }
    };
    this.source.setFilter(
      [
        { field: "category", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
    
  }

  onSaveConfirm(event) {
    if (event.newData.numberValue>100&&this.percentageCheck) {
      event.confirm.reject();
    } else {
      event.confirm.resolve(event.newData);
      this.submit(event);
    }
  }

  submit(event?) {
    console.log(event);
    event
      ? this.service
          .putreq("TbMOperationalImpacts", JSON.stringify(event.newData))
          .subscribe(response => {
            console.log(JSON.stringify(event.newData));
            event.confirm.resolve(event.newData);
            error => {
              console.log(error);
            };
          })
      : null;
    console.log(JSON.stringify(this.tabledata));

    this.toastr.success("Data Saved!");
  }
}
