import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskRegisterModalComponent } from "./modal/risk.register.modal.component";
import { RiskRegisterDeptComponent } from "./modal/risk.register.dept.component";
import { RiskRegisterAcdComponent } from "./modal/risk.register.acd.component";
import { RiskRegisterCtrComponent } from "./modal/risk.register.ctr.component";
import { RiskRegisterQlComponent } from "./modal/risk.register.ql.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-register",
  templateUrl: "./risk.register.component.html"
})
export class RiskRegisterComponent {
  @ViewChild("myForm") private myForm: NgForm;
  accidentset: any = {
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
      edit: false,
      delete: true,
      position: "right",
      columnTitle: "Modify",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      number: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      accidentId: {
        title: "Accident Id",
        type: "string",
        filter: false,
        editable: true,
        width: "20%"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "80%"
      }
    }
  };

  accidentSrc: LocalDataSource = new LocalDataSource();
  controlSrc: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [];
  riskno: string;
  ctrType = [
    { value: "Preventive", title: "Preventive" },
    {
      value: "Detective",
      title: "Detective"
    },
    {
      value: "Corrective",
      title: "Corrective"
    }
  ];
  controlset: any = {
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
      delete: true,
      position: "right",
      columnTitle: "Modify",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      no: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      description: {
        title: "Description",
        type: "number",
        filter: false,
        editable: true,
        width: "60%"
      },
      type: {
        title: "Type",
        type: "string",
        filter: false,
        editable: true,
        width: "20%",
        editor: {
          type: "list",
          config: {
            list: this.ctrType
          }
        }
      }
    }
  };

  dataInput = {
    divisionDepartment: {
      division: {
        id: "ISTD",
        desc: "Information System and Technical Design"
      },
      department: {
        id: "IS",
        desc: "Information System"
      },
      companyKpi: {
        comInpId: "",
        description: ""
      },
      departmentKpi: {
        deptInpId: "",
        description: ""
      },
      businessProcess: ""
    },
    riskDescription: {
      lossEvent: "",
      caused: "",
      accidentObj: [],
      riskImpact: "",
      riskLevel: ""
    },
    inherentRisk: {
      overallRisk: {
        indicatorId: "",
        description: ""
      },
      likelihood: "",
      overallImpact: {
        indicatorId: "",
        description: ""
      },
      operationalImpact: {
        category: "MAS",
        loss: 0,
        operationalObj: {
          yearActive: "",
          category: "",
          riskIndicatorId: "",
          counterNo: 0,
          operationalId: "",
          numberValue: 0,
          userCreated: "",
          datetimeCreated: "",
          userUpdate: "",
          datetimeUpdate: ""
        },
        score: 0
      },
      financialImpact: {
        category: "NEP",
        amount: 0,
        financialObj: {
          yearActive: "",
          category: "",
          riskIndicatorId: "",
          counterNo: 0,
          financialId: "",
          percentageValue: 0,
          numberValue: 0,
          flagActive: null,
          userCreated: "",
          datetimeCreated: "",
          userUpdate: "",
          datetimeUpdate: ""
        },
        score: 0
      },
      notes: "",
      qualitativeIR: {
        id: "",
        desc: "",
        score: 0
      }
    },
    residualRisk: {
      notes: "",
      overallRisk: {
        indicatorId: "",
        description: ""
      },
      likelihood: "",
      overallImpact: {
        indicatorId: "",
        description: ""
      },
      operationalImpact: {
        category: "MAS",
        loss: 0,
        operationalObj: {
          yearActive: "",
          category: "",
          riskIndicatorId: "",
          counterNo: 0,
          operationalId: "",
          numberValue: 0,
          userCreated: "",
          datetimeCreated: "",
          userUpdate: "",
          datetimeUpdate: ""
        },
        score: 0
      },
      financialImpact: {
        category: "NEP",
        amount: 0,
        financialObj: {
          yearActive: "",
          category: "",
          riskIndicatorId: "",
          counterNo: 0,
          financialId: "",
          percentageValue: 0,
          numberValue: 0,
          flagActive: null,
          userCreated: "",
          datetimeCreated: "",
          userUpdate: "",
          datetimeUpdate: ""
        },
        score: 0
      },
      qualitativeRD: {
        id: "",
        desc: "",
        score: 0
      }
    },
    currentAction: {
      operation: "",
      controls: [],
      overallControl: {
        indicatorId: "",
        description: ""
      },
      appropriateness: {
        indicatorId: "",
        description: ""
      }
    },
    expectedRisk: {
      treatmentPlan: "",
      impact: "",
      likelihood: "",
      risk: {
        indicatorId: "",
        description: ""
      },
      PIC: "",
      schedule: ""
    }
  };

  financialImpact = [
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
      data: "OEX",
      desc: "Operating expenses"
    },
    {
      data: "CHG",
      desc: "Non operating income/charges"
    }
  ];

  operationalImpact = [
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
  subscription: any;
  activeModal: any;
  riskIndicatorData: any = [];
  riskAssessmentData: any = [];
  yearPeriode: any = moment().format("YYYY");
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
  }

  getListRiskIndicator(value) {
    let yearPeriode = this.yearPeriode;
    let arr = this.riskIndicatorData.filter(function(item) {
      return item.condition == value && item.yearActive == yearPeriode;
    });
    if (arr[0] != null) {
      return this.riskIndicatorData.filter(function(item) {
        return item.condition == value && item.yearActive == yearPeriode;
      });
    }
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
          this.riskIndicatorData = data;
        });
        this.service.getreq("TbRRiskAssessments").subscribe(response => {
          if (response != null) {
            this.riskAssessmentData = response;
          }
        });
      }
    });
  }

  ngAfterViewInit() {}

  showModal() {
    this.activeModal = this.modalService.open(RiskRegisterModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData.year = this.yearPeriode;
    this.activeModal.componentInstance.filterData.condition = "KPI";
    this.activeModal.result.then(
      async response => {
        console.log(response);
        if (response != null) {
          this.dataInput.divisionDepartment.companyKpi.comInpId =
            response.comInpId;
          this.dataInput.divisionDepartment.companyKpi.description =
            response.description;
        }
      },
      error => {}
    );
  }
  showDept() {
    this.activeModal = this.modalService.open(RiskRegisterDeptComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData.year = this.yearPeriode;
    this.activeModal.componentInstance.filterData.condition = "DEP";
    this.activeModal.result.then(
      async response => {
        console.log(response);
        if (response != null) {
          this.dataInput.divisionDepartment.departmentKpi.deptInpId =
            response.comInpId;
          this.dataInput.divisionDepartment.departmentKpi.description =
            response.description;
        }
      },
      error => {}
    );
  }

  deleteAccident(event) {
    event.confirm.resolve();
    this.dataInput.riskDescription.accidentObj = this.dataInput.riskDescription.accidentObj.filter(
      function(item) {
        return item.number != this.number;
      },
      event.data
    );
    this.dataInput.riskDescription.accidentObj.forEach((element, ind) => {
      element.number = ind + 1;
    });
    this.accidentSrc.load(this.dataInput.riskDescription.accidentObj);
  }

  showAccident() {
    this.activeModal = this.modalService.open(RiskRegisterAcdComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData.year = this.yearPeriode;
    this.activeModal.result.then(
      async response => {
        console.log(response);
        if (response != null) {
          // this.dataInput.divisionDepartment.companyKpi.comInpId =
          //   response.comInpId;
          // this.dataInput.divisionDepartment.companyKpi.description =
          //   response.description;
          let lastIndex = 0;
          for (let data in this.dataInput.riskDescription.accidentObj) {
            lastIndex <= this.dataInput.riskDescription.accidentObj[data].number
              ? (lastIndex = this.dataInput.riskDescription.accidentObj[data]
                  .number)
              : null;
          }
          let arr = this.dataInput.riskDescription.accidentObj.filter(function(
            item
          ) {
            return item.accidentId == this.accidentId;
          },
          response);
          if (arr[0] == null) {
            this.dataInput.riskDescription.accidentObj.push({
              yearActive: this.yearPeriode,
              riskNo: "",
              number: lastIndex + 1,
              accidentId: response.accidentId,
              description: response.description,
              userCreated: "Admin",
              datetimeCreated: moment(),
              userUpdate: "Admin",
              datetimeUpdate: moment()
            });
            this.accidentSrc.load(this.dataInput.riskDescription.accidentObj);
          }
        }
      },
      error => {}
    );
  }

  showQLIR() {
    this.activeModal = this.modalService.open(RiskRegisterQlComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData.year = this.yearPeriode;
    this.activeModal.result.then(
      async response => {
        console.log(response);
        if (response != null) {
          this.dataInput.inherentRisk.qualitativeIR.id =
            response.riskIndicatorId;
          this.dataInput.inherentRisk.qualitativeIR.desc =
            response.descriptionrisk;
          this.dataInput.inherentRisk.qualitativeIR.score = response.score;
          this.findOverallImp();
        }
      },
      error => {}
    );
  }

  showQLRD() {
    this.activeModal = this.modalService.open(RiskRegisterQlComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.filterData.year = this.yearPeriode;
    this.activeModal.result.then(
      async response => {
        console.log(response);
        if (response != null) {
          this.dataInput.residualRisk.qualitativeRD.id =
            response.riskIndicatorId;
          this.dataInput.residualRisk.qualitativeRD.desc =
            response.descriptionrisk;
          this.dataInput.residualRisk.qualitativeRD.score = response.score;
          this.findOverallImpRd();
        }
      },
      error => {}
    );
  }

  deleteControl(event) {
    event.confirm.resolve();
    this.dataInput.currentAction.controls = this.dataInput.currentAction.controls.filter(
      function(item) {
        return item.no != this.no;
      },
      event.data
    );
    this.dataInput.currentAction.controls.forEach((element, ind) => {
      element.no = ind + 1;
    });
    this.controlSrc.load(this.dataInput.currentAction.controls);
  }
  showCtr() {
    this.activeModal = this.modalService.open(RiskRegisterCtrComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    // let lastIndex = 1;
    // for (let data in this.tabledata) {
    //   if (this.tabledata[data].riskNo == this.myForm.value.riskno) {
    //     lastIndex < this.tabledata[data].no
    //       ? (lastIndex = this.tabledata[data].no)
    //       : null;
    //   }
    // }

    // this.activeModal.componentInstance.riskno = this.riskno;
    let lastIndex = 0;
    for (let data in this.dataInput.currentAction.controls) {
      lastIndex <= this.dataInput.currentAction.controls[data].no
        ? (lastIndex = this.dataInput.currentAction.controls[data].no)
        : null;
    }
    this.activeModal.componentInstance.formData = {
      yearActive: this.yearPeriode,
      riskNo: "",
      no: lastIndex + 1,
      description: "",
      type: "",
      UserCreated: "Admin",
      DatetimeCreated: moment(),
      UserUpdate: "Admin",
      DatetimeUpdate: moment()
    };

    this.activeModal.result.then(
      async response => {
        if (response != null) {
          // this.tabledata.push(response);
          // console.log(this.tabledata);
          // this.reload();

          this.dataInput.currentAction.controls.push(response);
          this.controlSrc.load(this.dataInput.currentAction.controls);
          console.log(this.dataInput.currentAction.controls);
        }
      },
      error => {}
    );
  }

  hasmin(arr, attrib) {
    return arr.reduce(function(prev, curr) {
      return prev[attrib] < curr[attrib] ? prev : curr;
    });
  }

  hasmax(arr, attrib) {
    return arr.reduce(function(prev, curr) {
      return prev[attrib] > curr[attrib] ? prev : curr;
    });
  }

  findOperationalImpactRisk() {
    let yearPeriode = this.yearPeriode;
    let operationalImpact;
    this.service.getreq("TbMOperationalImpacts").subscribe(response => {
      if (response != null) {
        console.log(response);
        operationalImpact = response;
        let arrImp = operationalImpact.filter(function(item) {
          return (
            item.yearActive == yearPeriode &&
            item.category == this.inherentRisk.operationalImpact.category &&
            item.numberValue >= this.inherentRisk.operationalImpact.loss
          );
        }, this.dataInput);
        console.log(arrImp);
        if (arrImp[0] != null) {
          this.dataInput.inherentRisk.operationalImpact.operationalObj = this.hasmin(
            arrImp,
            "numberValue"
          );
          let arrScore = this.riskIndicatorData.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.indicatorId ==
                this.inherentRisk.operationalImpact.operationalObj
                  .riskIndicatorId
            );
          }, this.dataInput);
          if (arrScore[0] != null) {
            this.dataInput.inherentRisk.operationalImpact.score = this.riskIndicatorData.filter(
              function(item) {
                return (
                  item.yearActive == yearPeriode &&
                  item.indicatorId ==
                    this.inherentRisk.operationalImpact.operationalObj
                      .riskIndicatorId
                );
              },
              this.dataInput
            )[0].score;
            this.findOverallImp();
            console.log(this.dataInput);
          }
        } else {
          console.log("masuksini");
          let arrImp = operationalImpact.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.category == this.inherentRisk.operationalImpact.category
            );
          }, this.dataInput);
          if (arrImp[0] != null) {
            this.dataInput.inherentRisk.operationalImpact.operationalObj = this.hasmax(
              arrImp,
              "numberValue"
            );
            let arrScore = this.riskIndicatorData.filter(function(item) {
              return (
                item.yearActive == yearPeriode &&
                item.indicatorId ==
                  this.inherentRisk.operationalImpact.operationalObj
                    .riskIndicatorId
              );
            }, this.dataInput);
            if (arrScore[0] != null) {
              this.dataInput.inherentRisk.operationalImpact.score = this.riskIndicatorData.filter(
                function(item) {
                  return (
                    item.yearActive == yearPeriode &&
                    item.indicatorId ==
                      this.inherentRisk.operationalImpact.operationalObj
                        .riskIndicatorId
                  );
                },
                this.dataInput
              )[0].score;
              this.findOverallImp();
              console.log(this.dataInput);
            }
          }
        }
      }
    });
  }

  findFinancialImpactRisk() {
    let yearPeriode = this.yearPeriode;
    let financialImpact;
    this.service.getreq("TbMFinancialImpacts").subscribe(response => {
      if (response != null) {
        console.log(response);
        financialImpact = response;
        let arrImp = financialImpact.filter(function(item) {
          return (
            item.yearActive == yearPeriode &&
            item.category == this.inherentRisk.financialImpact.category &&
            item.numberValue >= this.inherentRisk.financialImpact.amount
          );
        }, this.dataInput);
        if (arrImp[0] != null) {
          this.dataInput.inherentRisk.financialImpact.financialObj = this.hasmin(
            arrImp,
            "numberValue"
          );
          let arrScore = this.riskIndicatorData.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.indicatorId ==
                this.inherentRisk.financialImpact.financialObj.riskIndicatorId
            );
          }, this.dataInput);
          if (arrScore[0] != null) {
            this.dataInput.inherentRisk.financialImpact.score = this.riskIndicatorData.filter(
              function(item) {
                return (
                  item.yearActive == yearPeriode &&
                  item.indicatorId ==
                    this.inherentRisk.financialImpact.financialObj
                      .riskIndicatorId
                );
              },
              this.dataInput
            )[0].score;
            this.findOverallImp();
            console.log(this.dataInput);
          }
        } else {
          console.log("masuksini");
          let arrImp = financialImpact.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.category == this.inherentRisk.financialImpact.category
            );
          }, this.dataInput);
          if (arrImp[0] != null) {
            this.dataInput.inherentRisk.financialImpact.financialObj = this.hasmax(
              arrImp,
              "numberValue"
            );
            let arrScore = this.riskIndicatorData.filter(function(item) {
              return (
                item.yearActive == yearPeriode &&
                item.indicatorId ==
                  this.inherentRisk.financialImpact.financialObj.riskIndicatorId
              );
            }, this.dataInput);
            if (arrScore[0] != null) {
              this.dataInput.inherentRisk.financialImpact.score = this.riskIndicatorData.filter(
                function(item) {
                  return (
                    item.yearActive == yearPeriode &&
                    item.indicatorId ==
                      this.inherentRisk.financialImpact.financialObj
                        .riskIndicatorId
                  );
                },
                this.dataInput
              )[0].score;
              this.findOverallImp();
              console.log(this.dataInput);
            }
          }
        }
      }
    });
  }

  findOverallImp() {
    let arr = this.riskIndicatorData.filter(item => {
      return (
        item.yearActive == this.yearPeriode &&
        item.condition == "IMP" &&
        item.score ==
          this.hasmax(
            [
              { score: this.dataInput.inherentRisk.financialImpact.score },
              { score: this.dataInput.inherentRisk.operationalImpact.score },
              { score: this.dataInput.inherentRisk.qualitativeIR.score }
            ],
            "score"
          ).score
      );
    });

    if (arr[0] != null) {
      console.log(arr);
      this.dataInput.inherentRisk.overallImpact.description =
        arr[0].description;
      this.dataInput.inherentRisk.overallImpact.indicatorId =
        arr[0].indicatorId;
      this.findOverallRisk();
    }
  }

  findOverallRisk() {
    console.log("masuk");
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      console.log(response);
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.inherentRisk.overallImpact.indicatorId &&
            item.indicatorIdB == this.dataInput.inherentRisk.likelihood
          );
        });
        console.log(arr);
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.inherentRisk.overallRisk.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.inherentRisk.overallRisk.description =
              arrIndicator[0].description;
            this.findOverallControl();
          }
        }
      }
    });
  }

  // residualrisk -----------------------

  findOperationalImpactRiskRd() {
    let yearPeriode = this.yearPeriode;
    let operationalImpact;
    this.service.getreq("TbMOperationalImpacts").subscribe(response => {
      if (response != null) {
        console.log(response);
        operationalImpact = response;
        let arrImp = operationalImpact.filter(function(item) {
          return (
            item.yearActive == yearPeriode &&
            item.category == this.inherentRisk.operationalImpact.category &&
            item.numberValue >= this.residualRisk.operationalImpact.loss
          );
        }, this.dataInput);
        console.log(arrImp);
        if (arrImp[0] != null) {
          this.dataInput.residualRisk.operationalImpact.operationalObj = this.hasmin(
            arrImp,
            "numberValue"
          );
          let arrScore = this.riskIndicatorData.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.indicatorId ==
                this.residualRisk.operationalImpact.operationalObj
                  .riskIndicatorId
            );
          }, this.dataInput);
          if (arrScore[0] != null) {
            this.dataInput.residualRisk.operationalImpact.score = this.riskIndicatorData.filter(
              function(item) {
                return (
                  item.yearActive == yearPeriode &&
                  item.indicatorId ==
                    this.residualRisk.operationalImpact.operationalObj
                      .riskIndicatorId
                );
              },
              this.dataInput
            )[0].score;
            this.findOverallImpRd();
            console.log(this.dataInput);
          }
        } else {
          console.log("masuksini");
          let arrImp = operationalImpact.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.category == this.inherentRisk.operationalImpact.category
            );
          }, this.dataInput);
          if (arrImp[0] != null) {
            this.dataInput.residualRisk.operationalImpact.operationalObj = this.hasmax(
              arrImp,
              "numberValue"
            );
            let arrScore = this.riskIndicatorData.filter(function(item) {
              return (
                item.yearActive == yearPeriode &&
                item.indicatorId ==
                  this.residualRisk.operationalImpact.operationalObj
                    .riskIndicatorId
              );
            }, this.dataInput);
            if (arrScore[0] != null) {
              this.dataInput.residualRisk.operationalImpact.score = this.riskIndicatorData.filter(
                function(item) {
                  return (
                    item.yearActive == yearPeriode &&
                    item.indicatorId ==
                      this.residualRisk.operationalImpact.operationalObj
                        .riskIndicatorId
                  );
                },
                this.dataInput
              )[0].score;
              this.findOverallImpRd();
              console.log(this.dataInput);
            }
          }
        }
      }
    });
  }

  findFinancialImpactRiskRd() {
    let yearPeriode = this.yearPeriode;
    let financialImpact;
    this.service.getreq("TbMFinancialImpacts").subscribe(response => {
      if (response != null) {
        console.log(response);
        financialImpact = response;
        let arrImp = financialImpact.filter(function(item) {
          return (
            item.yearActive == yearPeriode &&
            item.category == this.inherentRisk.financialImpact.category &&
            item.numberValue >= this.residualRisk.financialImpact.amount
          );
        }, this.dataInput);
        if (arrImp[0] != null) {
          this.dataInput.residualRisk.financialImpact.financialObj = this.hasmin(
            arrImp,
            "numberValue"
          );
          let arrScore = this.riskIndicatorData.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.indicatorId ==
                this.residualRisk.financialImpact.financialObj.riskIndicatorId
            );
          }, this.dataInput);
          if (arrScore[0] != null) {
            this.dataInput.residualRisk.financialImpact.score = this.riskIndicatorData.filter(
              function(item) {
                return (
                  item.yearActive == yearPeriode &&
                  item.indicatorId ==
                    this.residualRisk.financialImpact.financialObj
                      .riskIndicatorId
                );
              },
              this.dataInput
            )[0].score;
            this.findOverallImpRd();
            console.log(this.dataInput);
          }
        } else {
          console.log("masuksini");
          let arrImp = financialImpact.filter(function(item) {
            return (
              item.yearActive == yearPeriode &&
              item.category == this.inherentRisk.financialImpact.category
            );
          }, this.dataInput);
          if (arrImp[0] != null) {
            this.dataInput.residualRisk.financialImpact.financialObj = this.hasmax(
              arrImp,
              "numberValue"
            );
            let arrScore = this.riskIndicatorData.filter(function(item) {
              return (
                item.yearActive == yearPeriode &&
                item.indicatorId ==
                  this.residualRisk.financialImpact.financialObj.riskIndicatorId
              );
            }, this.dataInput);
            if (arrScore[0] != null) {
              this.dataInput.residualRisk.financialImpact.score = this.riskIndicatorData.filter(
                function(item) {
                  return (
                    item.yearActive == yearPeriode &&
                    item.indicatorId ==
                      this.residualRisk.financialImpact.financialObj
                        .riskIndicatorId
                  );
                },
                this.dataInput
              )[0].score;
              this.findOverallImpRd();
              console.log(this.dataInput);
            }
          }
        }
      }
    });
  }

  findOverallImpRd() {
    let arr = this.riskIndicatorData.filter(item => {
      return (
        item.yearActive == this.yearPeriode &&
        item.condition == "IMP" &&
        item.score ==
          this.hasmax(
            [
              { score: this.dataInput.residualRisk.financialImpact.score },
              { score: this.dataInput.residualRisk.operationalImpact.score },
              { score: this.dataInput.residualRisk.qualitativeRD.score }
            ],
            "score"
          ).score
      );
    });

    if (arr[0] != null) {
      console.log(arr);
      this.dataInput.residualRisk.overallImpact.description =
        arr[0].description;
      this.dataInput.residualRisk.overallImpact.indicatorId =
        arr[0].indicatorId;
      this.findOverallRiskRd();
    }
  }

  findOverallRiskRd() {
    console.log("masuk");
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.residualRisk.overallImpact.indicatorId &&
            item.indicatorIdB == this.dataInput.residualRisk.likelihood
          );
        });
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.residualRisk.overallRisk.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.residualRisk.overallRisk.description =
              arrIndicator[0].description;
            this.findOverallControl();
          }
        }
      }
    });
  }

  // ----------------------
  findOverallControl() {
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.inherentRisk.overallRisk.indicatorId &&
            item.indicatorIdB ==
              this.dataInput.residualRisk.overallRisk.indicatorId
          );
        });
        console.log("ketemu");
        console.log(arr);
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.currentAction.overallControl.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.currentAction.overallControl.description =
              arrIndicator[0].description;
            this.findAppropriateness();
          }
        }
      }
    });
  }

  findAppropriateness() {
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA ==
              this.dataInput.currentAction.overallControl.indicatorId &&
            item.indicatorIdB == this.dataInput.currentAction.operation
          );
        });
        console.log("ketemu");
        console.log(arr);
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.currentAction.appropriateness.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.currentAction.appropriateness.description =
              arrIndicator[0].description;
          }
        }
      }
    });
  }

  findExpectedRisk() {
    this.service.getreq("TbMRiskMappings").subscribe(response => {
      if (response != null) {
        let arr = response.filter(item => {
          return (
            item.yearActive == this.yearPeriode &&
            item.indicatorIdA == this.dataInput.expectedRisk.impact &&
            item.indicatorIdB == this.dataInput.expectedRisk.likelihood
          );
        });
        console.log("ketemu");
        console.log(arr);
        if (arr[0] != null) {
          let arrIndicator = this.riskIndicatorData.filter(item => {
            return (
              item.yearActive == this.yearPeriode &&
              item.indicatorId == arr[0].resultIdC
            );
          });
          console.log(arrIndicator);
          if (arrIndicator[0] != null) {
            this.dataInput.expectedRisk.risk.indicatorId =
              arrIndicator[0].indicatorId;
            this.dataInput.expectedRisk.risk.description =
              arrIndicator[0].description;
          }
        }
      }
    });
  }

  reload() {
    this.riskno = this.myForm.value.riskno;
  }

  save() {
    const lastIndex = this.generateCounter();
    const savedData = {
      yearActive: this.yearPeriode,
      riskNo: this.riskNoGenerate(lastIndex + 1),
      division: this.dataInput.divisionDepartment.division.id,
      companyKpi: this.dataInput.divisionDepartment.companyKpi.comInpId,
      department: this.dataInput.divisionDepartment.department.id,
      counterNo: lastIndex + 1,
      departmentKpi: this.dataInput.divisionDepartment.departmentKpi.deptInpId,
      businessProcess: this.dataInput.divisionDepartment.businessProcess,
      lossEvent: this.dataInput.riskDescription.lossEvent,
      caused: this.dataInput.riskDescription.caused,
      riskImpact: this.dataInput.riskDescription.riskImpact,
      riskLevel: this.dataInput.riskDescription.riskLevel,
      accidentList: 0,
      notesIr: this.dataInput.inherentRisk.notes,
      finImpactIr: this.dataInput.inherentRisk.financialImpact.financialObj
        .financialId,
      finAmountIr: this.dataInput.inherentRisk.financialImpact.amount,
      opImpactIr: this.dataInput.inherentRisk.operationalImpact.operationalObj
        .operationalId,
      opAmountIr: this.dataInput.inherentRisk.operationalImpact.loss,
      qlImpactIr: this.dataInput.inherentRisk.qualitativeIR.id,
      irImpact: this.dataInput.inherentRisk.overallImpact.indicatorId,
      likelihoodIr: this.dataInput.inherentRisk.likelihood,
      overallRiskIr: this.dataInput.inherentRisk.overallRisk.indicatorId,
      controlList: 0,
      operationCt: this.dataInput.currentAction.operation,
      appropriatenessCt: this.dataInput.currentAction.appropriateness
        .indicatorId,
      notesRd: this.dataInput.residualRisk.notes,
      finAmountRd: this.dataInput.residualRisk.financialImpact.amount,
      opAmountRd: this.dataInput.residualRisk.operationalImpact.loss,
      qlImpactRd: this.dataInput.residualRisk.qualitativeRD.id,
      rdImpact: this.dataInput.residualRisk.overallImpact.indicatorId,
      likelihoodRd: this.dataInput.residualRisk.likelihood,
      overallRd: this.dataInput.residualRisk.overallRisk.indicatorId,
      overallEf: this.dataInput.currentAction.overallControl.indicatorId,
      treatmentPlan: false,
      treatmentDescription: this.dataInput.expectedRisk.treatmentPlan,
      impactEx: this.dataInput.expectedRisk.impact,
      likelihoodEx: this.dataInput.expectedRisk.likelihood,
      overallEx: this.dataInput.expectedRisk.risk.indicatorId,
      pic: this.dataInput.expectedRisk.PIC,
      schedule: this.dataInput.expectedRisk.schedule,
      userCreated: "Admin",
      datetimeCreated: moment(),
      userUpdate: "Admin",
      datetimeUpdate: moment()
    };
    console.log(savedData);
    this.service
      .postreq("TbRRiskAssessments", savedData)
      .subscribe(response => {
        console.log(response);
        error => {
          console.log(error);
        };
      });
  }

  generateCounter() {
    let lastIndex = 0;
    for (let data in this.riskAssessmentData) {
      if (
        this.riskAssessmentData[data].yearActive == this.yearPeriode &&
        this.riskAssessmentData[data].division ==
          this.dataInput.divisionDepartment.division.id &&
        this.riskAssessmentData[data].department ==
          this.dataInput.divisionDepartment.department.id
      ) {
        lastIndex <= this.riskAssessmentData[data].counterNo
          ? (lastIndex = this.riskAssessmentData[data].counterNo)
          : null;
      }
    }
    return lastIndex;
  }

  riskNoGenerate(lastIndex) {
    switch (lastIndex.toString().length) {
      case 2:
        return (
          this.dataInput.divisionDepartment.division.id +
          "/" +
          this.dataInput.divisionDepartment.department.id +
          "-" +
          lastIndex.toString()
        );

      case 1:
        return (
          this.dataInput.divisionDepartment.division.id +
          "/" +
          this.dataInput.divisionDepartment.department.id +
          "-" +
          "0" +
          lastIndex.toString()
        );
    }
  }

  submit() {
    this.toastr.success("Data Saved!");
  }
}
