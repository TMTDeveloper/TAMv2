import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskMatriksIndicatorModalComponent } from "./modal/risk.matriks.indicator.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { isNullOrUndefined } from "util";
@Component({
  selector: "ngx-risk-matriks-indicator",
  templateUrl: "./risk.matriks.indicator.component.html"
})
export class RiskMatriksIndicatorComponent {
  source: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [];
  riskIndicatorData: any = [];
  subscription: any;
  activeModal: any;
  item: any;
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
  conditionA: any = {
    data: "EFF",
    desc: "Effectiveness"
  };
  conditionB: any = {
    data: "OPR",
    desc: "Operation"
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
      data: "APR",
      desc: "Appropriateness"
    },
    {
      data: "OVR",
      desc: "Overall"
    },
    {
      data: "EFF",
      desc: "Effectiveness"
    }
  ];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
  }

  loadData() {
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      console.log(response);
      if (response != null) {
        const data = response;
        console.log(response);
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.tabledata = data;
          console.log(this.tabledata);
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
            });
            let year = this.myForm.value.yearPeriode;
            let conditionA = this.conditionA.data;
            let conditionB = this.conditionB.data;
            console.log(this.myForm.value.condition);
            let conditionC = this.myForm.value.condition;
            console.log(this.myForm.value.condition);
            this.listData(
              this.riskIndicatorData.filter(function search(item) {
                return (
                  item.yearActive === year && item.condition === conditionA
                );
              }),
              this.riskIndicatorData.filter(function search(item) {
                return (
                  item.yearActive === year && item.condition === conditionB
                );
              }),
              this.riskIndicatorData.filter(function search(item) {
                return (
                  item.yearActive === year && item.condition === conditionC
                );
              })
            ).then(item => {
              this.item = item;
              console.log(item);
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
                  indicatorIdA: {
                    title: "Condition 1",
                    type: "text",
                    filter: false,
                    editable: true,
                    width: "30%",
                    valuePrepareFunction: value => {
                      return isNullOrUndefined(
                        this.riskIndicatorData.filter(function search(item) {
                          return item.indicatorId === value;
                        })[0]
                      )
                        ? value
                        : this.riskIndicatorData.filter(function search(item) {
                            return item.indicatorId === value;
                          })[0].description;
                    },
                    editor: {
                      type: "list",
                      config: {
                        list: this.item.data1
                      }
                    }
                  },
                  indicatorIdB: {
                    title: "Condition 2",
                    type: "text",
                    filter: false,
                    editable: true,
                    width: "30%",
                    valuePrepareFunction: value => {
                      return isNullOrUndefined(
                        this.riskIndicatorData.filter(function search(item) {
                          return item.indicatorId === value;
                        })[0]
                      )
                        ? value
                        : this.riskIndicatorData.filter(function search(item) {
                            return item.indicatorId === value;
                          })[0].description;
                    },
                    editor: {
                      type: "list",
                      config: {
                        list: this.item.data2
                      }
                    }
                  },
                  resultIdC: {
                    title: "Result",
                    type: "number",
                    filter: false,
                    editable: true,
                    width: "30%",
                    valuePrepareFunction: value => {
                      return isNullOrUndefined(
                        this.riskIndicatorData.filter(function search(item) {
                          return item.indicatorId === value;
                        })[0]
                      )
                        ? value
                        : this.riskIndicatorData.filter(function search(item) {
                            return item.indicatorId === value;
                          })[0].description;
                    },
                    editor: {
                      type: "list",
                      config: {
                        list: this.item.data3
                      }
                    }
                  }
                }
              };
            });
            {
            }
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
          condition: "APR",
          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
        console.log(this.myForm.value);
      });
  }

  showModal(no_iku) {
    this.activeModal = this.modalService.open(
      RiskMatriksIndicatorModalComponent,
      {
        windowClass: "xlModal",
        container: "nb-layout",
        backdrop: "static"
      }
    );
    let lastIndex = 1;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.myForm.value.yearPeriode &&
        this.tabledata[data].condition == this.myForm.value.condition
      ) {
        lastIndex < Number(this.tabledata[data].counterNo)
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    const mappingId = this.mappingGenerate(lastIndex + 1);
    this.activeModal.componentInstance.formData = {
      counterNo: lastIndex + 1,
      yearActive: this.myForm.value.yearPeriode,
      mappingId: mappingId,
      condition: this.myForm.value.condition,
      indicatorIdA: "",
      indicatorIdB: "",
      resultIdC: "",
      UserCreated: "admin",
      DatetimeCreated: moment().format(),
      UserUpdate: "admin",
      DatetimeUpdate: moment().format(),
      status: "1"
    };
    this.activeModal.componentInstance.conditionA = this.conditionA;
    this.activeModal.componentInstance.conditionB = this.conditionB;
    this.activeModal.componentInstance.conditionC = this.myForm.value.condition;
    this.activeModal.componentInstance.riskIndicatorData = this.riskIndicatorData;
    this.activeModal.componentInstance.yearActive = this.myForm.value.yearPeriode;
    this.activeModal.componentInstance.condition = this.condition;
    // this.activeModal.componentInstance.updateData();

    this.activeModal.result.then(
      async response => {
        console.log(response);
        if (response != false) {
          this.tabledata.push(response);
          console.log(this.tabledata);
          this.reload();
          this.submit();
        }
      },
      error => {}
    );
  }

  mappingGenerate(lastIndex) {
    switch (lastIndex.toString().length) {
      case 3:
        return "M" + this.myForm.value.condition + lastIndex.toString();

      case 2:
        return "M" + this.myForm.value.condition + "0" + lastIndex.toString();

      case 1:
        return "M" + this.myForm.value.condition + "00" + lastIndex.toString();
    }
  }

  reload() {
    console.log(this.myForm.value.condition);
    switch (this.myForm.value.condition) {
      case "OVR":
        this.conditionA = {
          data: "IMP",
          desc: "Impact"
        };
        this.conditionB = {
          data: "LKL",
          desc: "Likelihood"
        };
        break;
      case "EFF":
        this.conditionA = {
          data: "OVR",
          desc: "Inherent Risk"
        };
        this.conditionB = {
          data: "OVR",
          desc: "Residual Risk"
        };
        break;
      default:
        this.conditionA = {
          data: "EFF",
          desc: "Effectiveness"
        };
        this.conditionB = {
          data: "OPR",
          desc: "Operation"
        };
    }
    this.source = this.source.setFilter(
      [
        { field: "condition", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
    let year = this.myForm.value.yearPeriode;
    let conditionA = this.conditionA.data;
    let conditionB = this.conditionB.data;
    console.log(this.myForm.value.condition);
    let conditionC = this.myForm.value.condition;
    console.log(this.myForm.value.condition);
    this.listData(
      this.riskIndicatorData.filter(function search(item) {
        return item.yearActive === year && item.condition === conditionA;
      }),
      this.riskIndicatorData.filter(function search(item) {
        return item.yearActive === year && item.condition === conditionB;
      }),
      this.riskIndicatorData.filter(function search(item) {
        return item.yearActive === year && item.condition === conditionC;
      })
    ).then(item => {
      this.item = item;
      console.log(item);
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
          indicatorIdA: {
            title: "Condition 1",
            type: "text",
            filter: false,
            editable: true,
            width: "30%",
            valuePrepareFunction: value => {
              return isNullOrUndefined(
                this.riskIndicatorData.filter(function search(item) {
                  return item.indicatorId === value;
                })[0]
              )
                ? value
                : this.riskIndicatorData.filter(function search(item) {
                    return item.indicatorId === value;
                  })[0].description;
            },
            editor: {
              type: "list",
              config: {
                list: this.item.data1
              }
            }
          },
          indicatorIdB: {
            title: "Condition 2",
            type: "text",
            filter: false,
            editable: true,
            width: "30%",
            valuePrepareFunction: value => {
              return isNullOrUndefined(
                this.riskIndicatorData.filter(function search(item) {
                  return item.indicatorId === value;
                })[0]
              )
                ? value
                : this.riskIndicatorData.filter(function search(item) {
                    return item.indicatorId === value;
                  })[0].description;
            },
            editor: {
              type: "list",
              config: {
                list: this.item.data2
              }
            }
          },
          resultIdC: {
            title: "Result",
            type: "number",
            filter: false,
            editable: true,
            width: "30%",
            valuePrepareFunction: value => {
              return isNullOrUndefined(
                this.riskIndicatorData.filter(function search(item) {
                  return item.indicatorId === value;
                })[0]
              )
                ? value
                : this.riskIndicatorData.filter(function search(item) {
                    return item.indicatorId === value;
                  })[0].description;
            },
            editor: {
              type: "list",
              config: {
                list: this.item.data3
              }
            }
          }
        }
      };
    });
  }
  submit(event?) {
    console.log(event);
    event
      ? this.service
          .putreq("TbMRiskMappings", JSON.stringify(event.newData))
          .subscribe(response => {
            console.log(JSON.stringify(event.newData));
            event.confirm.resolve(event.newData);
            error => {
              console.log(error);
            };
          })
      : null;
    console.log(JSON.stringify(this.tabledata));
    this.tabledata.forEach((element, ind) => {
      let index = ind;
      if (this.tabledata[index].status == "1") {
        this.service
          .postreq("TbMRiskMappings", this.tabledata[index])
          .subscribe(response => {
            console.log(response);
            this.tabledata[index].status = "0";
            error => {
              console.log(error);
            };
          });
      }
    });

    this.toastr.success("Data Saved!");
  }

  async listData(item1, item2, item3) {
    let loop1 = await item1;
    let loop2 = await item2;
    let loop3 = await item3;
    let data1 = await [];
    let data2 = await [];
    let data3 = await [];
    for (let element in loop1) {
      let arr = await {
        value: loop1[element].indicatorId,
        title: loop1[element].description
      };
      await data1.push(arr);
    }
    for (let element in loop2) {
      let arr = await {
        value: loop2[element].indicatorId,
        title: loop2[element].description
      };
      await data2.push(arr);
    }
    for (let element in loop3) {
      let arr = await {
        value: loop3[element].indicatorId,
        title: loop3[element].description
      };
      await data3.push(arr);
    }
    return {
      data1,
      data2,
      data3
    };
  }
}
