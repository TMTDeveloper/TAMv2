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
  tabledata: any[] = [];

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
  }
  loadData() {
    this.service.getreq("TbMOperationalImpacts").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.tabledata = data;
          this.source.load(this.tabledata);
        });
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
                  riskIndicatorId: {
                    title: "Impact",
                    type: "string",
                    filter: false,
                    editable: false,
                    width: "10%",
                    valuePrepareFunction: value => {
                      console.log(
                        this.riskIndicatorData.filter(function search(item) {
                          return item.indicatorId === value;
                        })[0].description
                      );
                      return isNullOrUndefined(
                        this.riskIndicatorData.filter(function search(item) {
                          return item.indicatorId === value;
                        })[0].description
                      )
                        ? value
                        : this.riskIndicatorData.filter(function search(item) {
                            return item.indicatorId === value;
                          })[0].description;
                    }
                  },
                  numberValue: {
                    title: "Number",
                    type: "string",
                    filter: false,
                    editable: true,
                    width: "80%",
                    valuePrepareFunction: value => {
                      if (isNaN(value)) {
                        return 0;
                      } else {
                        return Number(value)
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                      }
                    }
                  }
                }
              };
            });
          }
        });
      }
      // error => {
      //   console.log(error);
      // };
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
    this.source.setFilter(
      [
        { field: "category", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
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
