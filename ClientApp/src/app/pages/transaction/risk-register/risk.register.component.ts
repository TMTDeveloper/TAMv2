import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskRegisterModalComponent } from "./modal/risk.register.modal.component";
import { RiskRegisterDeptComponent } from "./modal/risk.register.dept.component";
import { RiskRegisterAcdComponent } from "./modal/risk.register.acd.component";
import { RiskRegisterCtrComponent } from "./modal/risk.register.ctr.component";
import { RiskRegisterQlComponent } from "./modal/risk.register.ql.component";
import { RiskRegisterTrtComponent } from "./modal/risk.register.trt.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IMultiSelectOption } from "angular-2-dropdown-multiselect";

@Component({
  selector: "ngx-risk-register",
  templateUrl: "./risk.register.component.html",
  styleUrls: ["./risk.register.component.scss"]
})
export class RiskRegisterComponent {
  @ViewChild("myForm") private myForm: NgForm;
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
  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  multiSelect: any[];
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
      perPage: 5
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

  treatmentset: any = {
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
      perPage: 5
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
        title: "Treatment Plan",
        type: "string",
        filter: false,
        editable: true,
        width: "20%"
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
      },
      pic: {
        title: "PIC",
        type: "string",
        filter: false,
        editable: true,
        width: "20%"
      },
      dueDate: {
        title: "Due Date",
        type: "string",
        filter: false,
        editable: true,
        width: "20%"
      }
    }
  };

  accidentSrc: LocalDataSource = new LocalDataSource();
  controlSrc: LocalDataSource = new LocalDataSource();
  treatmentSrc: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [];
  riskno: string;

  controlset: any = {
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
      delete: true,
      position: "right",
      columnTitle: "Modify",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 5
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
    counterNo: 0,
    edit: false,
    activateValidation: false,
    draftDisabled: false,
    riskNo: "",
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
        deptInpId: "IMP001",
        description: ""
      },
      businessProcess: ""
    },
    riskDescription: {
      lossEvent: "",
      caused: "",
      accidentObj: [],
      riskImpact: [],
      riskLevel: "",
      optionsModel: []
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
        category: "",
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
        category: "",
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
        category: "",
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
        category: "",
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
      Preventive: 0,
      Detective: 0,
      Corrective: 0,
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
      disabled: true,
      treatmentPlanSwitch: false,
      treatmentPlan: "",
      impact: "",
      likelihood: "",
      risk: {
        indicatorId: "",
        description: ""
      },
      PIC: "",
      schedule: "",
      treatmentPlanArr: []
    }
  };

  financialImpact = [
    {
      data: "",
      desc: ""
    },
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
      data: "",
      desc: ""
    },
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
  draftData: any;
  subscription: any;
  activeModal: any;
  riskIndicatorData: any = [];
  riskAssessmentData: any = [];
  yearPeriode: any = moment().format("YYYY");
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.route.url.subscribe(url => {
      console.log("activatedroute");
      console.log(url);
    });
    this.loadData();
    this.accidentSrc.load(this.dataInput.riskDescription.accidentObj);
    this.controlSrc.load(this.dataInput.currentAction.controls);
    this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
  }

  getListRiskIndicator(value) {
    let yearPeriode = this.yearPeriode;
    let arr = this.riskIndicatorData.filter(function(item) {
      return (
        item.condition == value &&
        item.yearActive == yearPeriode &&
        item.flagActive == "Y"
      );
    });
    if (arr[0] != null) {
      return this.riskIndicatorData.filter(function(item) {
        return (
          item.condition == value &&
          item.yearActive == yearPeriode &&
          item.flagActive == "Y"
        );
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
        let yearPeriode = this.yearPeriode;
        let arr = this.riskIndicatorData.filter(function(item) {
          return (
            item.condition == "RTP" &&
            item.yearActive == yearPeriode &&
            item.flagActive == "Y"
          );
        });
        if (arr[0] != null) {
          this.multiSelect = this.riskIndicatorData.filter(function(item) {
            return (
              item.condition == "RTP" &&
              item.yearActive == yearPeriode &&
              item.flagActive == "Y"
            );
          });
        }

        this.myOptions = [
          {
            id: this.multiSelect[0].description,
            name: this.multiSelect[0].description
          },
          {
            id: this.multiSelect[1].description,
            name: this.multiSelect[1].description
          },
          {
            id: this.multiSelect[2].description,
            name: this.multiSelect[2].description
          },
          {
            id: this.multiSelect[3].description,
            name: this.multiSelect[3].description
          }
        ];

        this.service.getreq("TbRRiskAssessments").subscribe(response => {
          if (response != null) {
            this.riskAssessmentData = response;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.draftJson != null) {
        this.dataInput = JSON.parse(params.draftJson);
        this.draftData = params;
        this.accidentSrc.load(this.dataInput.riskDescription.accidentObj);
        this.controlSrc.load(this.dataInput.currentAction.controls);
        this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
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
  clearIR() {
    this.dataInput.inherentRisk.qualitativeIR.desc = "";
    this.dataInput.inherentRisk.qualitativeIR.id = "";
    this.dataInput.inherentRisk.qualitativeIR.score = 0;
    this.dataInput.inherentRisk.financialImpact.amount = 0;
    this.dataInput.inherentRisk.financialImpact.score = 0;
    this.dataInput.inherentRisk.financialImpact.financialObj.financialId = "";
    this.dataInput.inherentRisk.operationalImpact.loss = 0;
    this.dataInput.inherentRisk.operationalImpact.score = 0;
    this.dataInput.inherentRisk.operationalImpact.operationalObj.operationalId =
      "";
    this.dataInput.inherentRisk.overallImpact.description = "";
    this.dataInput.inherentRisk.overallImpact.indicatorId = "";
  }

  clearRD() {
    this.dataInput.residualRisk.qualitativeRD.desc = "";
    this.dataInput.residualRisk.qualitativeRD.id = "";
    this.dataInput.residualRisk.qualitativeRD.score = 0;
    this.dataInput.residualRisk.financialImpact.amount = 0;
    this.dataInput.residualRisk.financialImpact.score = 0;
    this.dataInput.residualRisk.financialImpact.financialObj.financialId = "";
    this.dataInput.residualRisk.operationalImpact.loss = 0;
    this.dataInput.residualRisk.operationalImpact.score = 0;
    this.dataInput.residualRisk.operationalImpact.operationalObj.operationalId =
      "";
    this.dataInput.residualRisk.overallImpact.description = "";
    this.dataInput.residualRisk.overallImpact.indicatorId = "";
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
          this.dataInput.inherentRisk.qualitativeIR.id = response.indicatorId;
          this.dataInput.inherentRisk.qualitativeIR.desc = response.impact;
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
          this.dataInput.residualRisk.qualitativeRD.id = response.indicatorId;
          this.dataInput.residualRisk.qualitativeRD.desc = response.impact;
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
    this.countPDC();
  }
  saveControl(event) {
    event.confirm.resolve(event.newData);
    this.dataInput.currentAction.controls.forEach((element, ind) => {
      element.no == event.newData.no
        ? (element.type = event.newData.type)
        : null;
    });
    this.countPDC();
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
          this.countPDC();
          console.log(this.dataInput.currentAction.controls);
        }
      },
      error => {}
    );
  }

  countPDC() {
    this.dataInput.currentAction.Preventive = 0;
    this.dataInput.currentAction.Detective = 0;
    this.dataInput.currentAction.Corrective = 0;
    this.dataInput.currentAction.controls.forEach((element, index) => {
      element.type == "Preventive"
        ? this.dataInput.currentAction.Preventive++
        : null;
      element.type == "Detective"
        ? this.dataInput.currentAction.Detective++
        : null;
      element.type == "Corrective"
        ? this.dataInput.currentAction.Corrective++
        : null;
    });
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
              console.log(JSON.stringify(this.dataInput));
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
              {
                score:
                  this.dataInput.inherentRisk.financialImpact.amount == 0 ||
                  this.dataInput.inherentRisk.financialImpact.amount == null
                    ? 0
                    : this.dataInput.inherentRisk.financialImpact.score
              },
              {
                score:
                  this.dataInput.inherentRisk.operationalImpact.loss == 0 ||
                  this.dataInput.inherentRisk.operationalImpact.loss == null
                    ? 0
                    : this.dataInput.inherentRisk.operationalImpact.score
              },
              { score: this.dataInput.inherentRisk.qualitativeIR.score }
            ],
            "score"
          ).score
      );
    });
    if (arr[0] != null) {
      console.log("disinihehe");
      console.log(arr);
      this.dataInput.inherentRisk.overallImpact.description =
        arr[0].description;
      this.dataInput.inherentRisk.overallImpact.indicatorId =
        arr[0].indicatorId;
      this.findOverallRisk();
    } else {
      this.dataInput.inherentRisk.overallImpact.description = "";
      this.dataInput.inherentRisk.overallImpact.indicatorId = "";
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
              {
                score:
                  this.dataInput.residualRisk.financialImpact.amount == 0 ||
                  this.dataInput.residualRisk.financialImpact.amount == null
                    ? 0
                    : this.dataInput.residualRisk.financialImpact.score
              },
              {
                score:
                  this.dataInput.residualRisk.operationalImpact.loss == 0 ||
                  this.dataInput.residualRisk.operationalImpact.loss == null
                    ? 0
                    : this.dataInput.residualRisk.operationalImpact.score
              },
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
    } else {
      this.dataInput.residualRisk.overallImpact.description = "";
      this.dataInput.residualRisk.overallImpact.indicatorId = "";
      this.dataInput.residualRisk.overallImpact.indicatorId == "" &&
      this.dataInput.residualRisk.likelihood == ""
        ? (this.dataInput.expectedRisk.disabled = true)
        : (this.dataInput.expectedRisk.disabled = false);
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
            this.dataInput.residualRisk.overallImpact.indicatorId == "" &&
            this.dataInput.residualRisk.likelihood == ""
              ? (this.dataInput.expectedRisk.disabled = true)
              : (this.dataInput.expectedRisk.disabled = false);
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
        } else {
          this.dataInput.currentAction.appropriateness.indicatorId = "";
          this.dataInput.currentAction.appropriateness.description = "";
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

  reload() {}

  save() {
    if (!this.dataInput.edit) {
      if (this.dataInput.riskNo.substring(0, 3) == "DRF") {
        const savedData = {
          draftKey: this.dataInput.riskNo,
          draftJson: JSON.stringify(this.dataInput),
          division: this.dataInput.divisionDepartment.division.id,
          department: this.dataInput.divisionDepartment.department.id,
          type: "RISK",
          year: moment().format("YYYY"),
          userUpdated: "Admin",
          dateUpdated: moment().format(),
          userCreated: this.draftData.dateCreated,
          dateCreated: this.draftData.dateCreated
        };
        this.service.putreq("draftrisks", savedData).subscribe(
          response => {
            console.log(response);
            this.toastr.success("Draft Deleted!");
          },
          error => {
            console.log(error);
            this.toastr.error(
              "Draft Delete Failed! Reason: " + error.statusText
            );
          }
        );
      }
      console.log("masuksini");

      const lastIndex = this.generateCounter();
      let riskNo = this.riskNoGenerate(lastIndex + 1);
      this.dataInput.riskNo = riskNo;
      this.dataInput.draftDisabled = true;

      const savedData = {
        yearActive: this.yearPeriode,
        riskNo: this.dataInput.riskNo,
        division: this.dataInput.divisionDepartment.division.id,
        companyKpi: this.dataInput.divisionDepartment.companyKpi.comInpId,
        department: this.dataInput.divisionDepartment.department.id,
        counterNo: lastIndex + 1,
        departmentKpi: this.dataInput.divisionDepartment.departmentKpi
          .deptInpId,
        businessProcess: this.dataInput.divisionDepartment.businessProcess,
        lossEvent: this.dataInput.riskDescription.lossEvent,
        caused: this.dataInput.riskDescription.caused,
        riskImpact: this.loopRiskImpact(),
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
        datetimeCreated: moment().format(),
        userUpdate: "Admin",
        datetimeUpdate: moment().format()
      };
      console.log(JSON.stringify(savedData));
      console.log(savedData);
      this.service.postreq("TbRRiskAssessments", savedData).subscribe(
        response => {
          console.log(response);
          this.saveControlAccident(savedData.riskNo);
          this.saveTreatmentNo(savedData.riskNo);
          this.dataInput.edit = true;
          const savedDataRisk = {
            draftKey: this.dataInput.riskNo,
            draftJson: JSON.stringify(this.dataInput),
            division: this.dataInput.divisionDepartment.division.id,
            department: this.dataInput.divisionDepartment.department.id,
            type: "RISK",
            year: moment().format("YYYY"),
            userUpdated: "Admin",
            dateUpdated: moment().format(),
            userCreated: "Admin",
            dateCreated: moment().format()
          };
          this.service.postreq("draftrisks", savedDataRisk).subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
          this.toastr.success("Data Saved!");
        },
        error => {
          console.log(error);
          this.toastr.error("Data Save Failed! Reason: " + error.statusText);
        }
      );
    } else {
      const savedData = {
        yearActive: this.yearPeriode,
        riskNo: this.dataInput.riskNo,
        division: this.dataInput.divisionDepartment.division.id,
        companyKpi: this.dataInput.divisionDepartment.companyKpi.comInpId,
        department: this.dataInput.divisionDepartment.department.id,
        counterNo: this.dataInput.counterNo,
        departmentKpi: this.dataInput.divisionDepartment.departmentKpi
          .deptInpId,
        businessProcess: this.dataInput.divisionDepartment.businessProcess,
        lossEvent: this.dataInput.riskDescription.lossEvent,
        caused: this.dataInput.riskDescription.caused,
        riskImpact: this.loopRiskImpact(),
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
        datetimeCreated: moment().format(),
        userUpdate: "Admin",
        datetimeUpdate: moment().format()
      };
      console.log(JSON.stringify(savedData));
      console.log(savedData);
      this.service.putreq("TbRRiskAssessments", savedData).subscribe(
        response => {
          console.log(response);
          this.editTransaction(savedData.riskNo);

          this.dataInput.edit = true;
          const savedDataRisk = {
            draftKey: this.dataInput.riskNo,
            draftJson: JSON.stringify(this.dataInput),
            division: this.dataInput.divisionDepartment.division.id,
            department: this.dataInput.divisionDepartment.department.id,
            type: "RISK",
            year: moment().format("YYYY"),
            userUpdated: "Admin",
            dateUpdated: moment().format(),
            userCreated: "Admin",
            dateCreated: moment().format()
          };
          this.service.putreq("draftrisks", savedDataRisk).subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
          this.toastr.success("Data Saved!");
        },
        error => {
          console.log(error);
          this.toastr.error("Data Save Failed! Reason: " + error.statusText);
        }
      );
    }
  }

  public loopRiskImpact() {
    let data = "";

    for (let i = 0; i < this.dataInput.riskDescription.riskImpact.length; i++) {
      data == ""
        ? (data = this.dataInput.riskDescription.riskImpact[i])
        : (data = data + "," + this.dataInput.riskDescription.riskImpact[i]);
      if (this.dataInput.riskDescription.riskImpact.length - i == 1) {
        return data;
      }
    }
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

  saveControlAccident(riskNo) {
    this.dataInput.currentAction.controls.forEach((element, ind) => {
      this.dataInput.currentAction.controls[ind].riskNo = riskNo;
      this.service
        .postreq(
          "TbRControlDetails",
          this.dataInput.currentAction.controls[ind]
        )
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    });

    this.dataInput.riskDescription.accidentObj.forEach((element, ind) => {
      this.dataInput.riskDescription.accidentObj[ind].riskNo = riskNo;
      this.service
        .postreq(
          "TbRAccidentDetails",
          this.dataInput.riskDescription.accidentObj[ind]
        )
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  editTransaction(riskno) {
    this.service.getreq("TbRControlDetails").subscribe(
      response => {
        console.log(response);
        response.forEach(element => {
          element.yearActive == this.yearPeriode && element.riskNo == riskno
            ? this.service
                .postreq("TbRControlDetails/deletecontrol", element)
                .subscribe(
                  response => {
                    console.log(response);
                  },
                  error => {
                    console.log(error);
                  }
                )
            : null;
        });
        this.service.getreq("TbRTreatmentDetails").subscribe(
          response => {
            console.log(response);
            response.forEach(element => {
              element.yearActive == this.yearPeriode && element.riskNo == riskno
                ? this.service
                    .postreq("TbRTreatmentDetails/deletecontrol", element)
                    .subscribe(
                      response => {
                        console.log(response);
                      },
                      error => {
                        console.log(error);
                      }
                    )
                : null;
            });
            this.service.getreq("TbRAccidentDetails").subscribe(
              response => {
                console.log(response);
                response.forEach(element => {
                  element.yearActive == this.yearPeriode &&
                  element.riskNo == riskno
                    ? this.service
                        .postreq("TbRAccidentDetails/deletecontrol", element)
                        .subscribe(
                          response => {
                            console.log(response);
                          },
                          error => {
                            console.log(error);
                          }
                        )
                    : null;
                });
                this.saveControlAccident(riskno);
                this.saveTreatmentNo(riskno);
              },
              error => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  saveTreatmentNo(riskNo) {
    this.dataInput.expectedRisk.treatmentPlanArr.forEach((element, ind) => {
      this.dataInput.expectedRisk.treatmentPlanArr[ind].riskNo = riskNo;
      this.service
        .postreq(
          "TbRTreatmentDetails",
          this.dataInput.expectedRisk.treatmentPlanArr[ind]
        )
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    });
  }
  //   treatmentPlanSwitch: false,
  //   treatmentPlan: "",
  //   impact: "",
  //   likelihood: "",
  //   risk: {
  //     indicatorId: "",
  //     description: ""
  //   },
  //   PIC: "",
  //   schedule: ""
  // }
  treatmentPlanSwitch() {
    if (this.dataInput.expectedRisk.treatmentPlanSwitch == true) {
      this.dataInput.expectedRisk.impact = this.dataInput.residualRisk.overallImpact.indicatorId;
      this.dataInput.expectedRisk.likelihood = this.dataInput.residualRisk.likelihood;
      this.dataInput.expectedRisk.PIC = "";
      this.dataInput.expectedRisk.schedule = "";
      this.dataInput.expectedRisk.treatmentPlan = "Accept";
      this.dataInput.expectedRisk.treatmentPlanArr = [
        {
          yearActive: this.yearPeriode,
          riskNo: "",
          no: 1,
          description: "Accept",
          type: "",
          pic: "",
          dueDate: "",
          UserCreated: "Admin",
          DatetimeCreated: moment(),
          UserUpdate: "Admin",
          DatetimeUpdate: moment()
        }
      ];
      this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
    } else {
      this.dataInput.expectedRisk.impact = "";
      this.dataInput.expectedRisk.likelihood = "";
      this.dataInput.expectedRisk.PIC = "";
      this.dataInput.expectedRisk.schedule = "";
      this.dataInput.expectedRisk.treatmentPlan = "";
      this.dataInput.expectedRisk.risk.description = "";
      this.dataInput.expectedRisk.risk.indicatorId = "";
      this.dataInput.expectedRisk.treatmentPlanArr = [];
      this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
    }
    this.findExpectedRisk();
  }

  saveAsDraft() {
    if (this.dataInput.riskNo.substring(0, 3) == "DRF") {
      const savedData = {
        draftKey: this.dataInput.riskNo,
        draftJson: JSON.stringify(this.dataInput),
        division: this.dataInput.divisionDepartment.division.id,
        department: this.dataInput.divisionDepartment.department.id,
        type: "DRAFT",
        year: moment().format("YYYY"),
        userUpdated: "Admin",
        dateUpdated: moment().format(),
        userCreated: this.draftData.dateCreated,
        dateCreated: this.draftData.dateCreated
      };
      this.service.putreq("draftrisks", savedData).subscribe(
        response => {
          console.log(response);
          this.toastr.success("Draft Saved!");
        },
        error => {
          console.log(error);
          this.toastr.error("Draft Save Failed! Reason: " + error.statusText);
        }
      );
    } else {
      let draftKey = "DRF/" + moment().format("YYYYMMDDHHMMSS");
      this.dataInput.riskNo = draftKey;
      const savedData = {
        draftKey: draftKey,
        draftJson: JSON.stringify(this.dataInput),
        division: this.dataInput.divisionDepartment.division.id,
        department: this.dataInput.divisionDepartment.department.id,
        type: "DRAFT",
        year: moment().format("YYYY"),
        userUpdated: "Admin",
        dateUpdated: moment().format(),
        userCreated: "Admin",
        dateCreated: moment().format()
      };
      this.service.postreq("draftrisks", savedData).subscribe(
        response => {
          console.log(response);
          this.toastr.success("Draft Saved!");
        },
        error => {
          console.log(error);
          this.toastr.error("Draft Save Failed! Reason: " + error.statusText);
        }
      );
    }
  }

  submit() {
    this.toastr.success("Data Saved!");
  }

  saveValidation = () => {
    if (
      this.dataInput.divisionDepartment.companyKpi.description == "" ||
      this.dataInput.divisionDepartment.departmentKpi.description == "" ||
      this.dataInput.divisionDepartment.businessProcess == "" ||
      this.dataInput.riskDescription.lossEvent == "" ||
      this.dataInput.riskDescription.caused == "" ||
      this.dataInput.riskDescription.riskLevel == "" ||
      this.dataInput.inherentRisk.overallImpact.description == "" ||
      this.dataInput.inherentRisk.likelihood == "" ||
      this.dataInput.inherentRisk.overallRisk.description == "" ||
      this.dataInput.currentAction.operation == "" ||
      this.dataInput.currentAction.appropriateness.description == "" ||
      this.dataInput.currentAction.overallControl.description == "" ||
      this.dataInput.currentAction.Preventive +
        this.dataInput.currentAction.Detective +
        this.dataInput.currentAction.Corrective ==
        0 ||
      this.dataInput.residualRisk.financialImpact.amount >
        this.dataInput.inherentRisk.financialImpact.amount ||
      this.dataInput.residualRisk.operationalImpact.loss >
        this.dataInput.inherentRisk.operationalImpact.loss ||
      this.dataInput.residualRisk.overallImpact.description == "" ||
      this.dataInput.residualRisk.likelihood == "" ||
      this.dataInput.residualRisk.overallRisk.description == "" ||
      this.dataInput.expectedRisk.treatmentPlanArr.length == 0 ||
      this.dataInput.expectedRisk.impact == "" ||
      this.dataInput.expectedRisk.likelihood == ""
    ) {
      this.toastr.error("Please Complete The Form!");
      this.dataInput.activateValidation = true;
    } else {
      this.save();
    }
  };

  canDeactivate() {
    if (
      this.dataInput.divisionDepartment.companyKpi.description == "" ||
      this.dataInput.divisionDepartment.departmentKpi.description == "" ||
      this.dataInput.divisionDepartment.businessProcess == "" ||
      this.dataInput.riskDescription.lossEvent == "" ||
      this.dataInput.riskDescription.caused == "" ||
      this.dataInput.riskDescription.riskLevel == "" ||
      this.dataInput.inherentRisk.overallImpact.description == "" ||
      this.dataInput.inherentRisk.likelihood == "" ||
      this.dataInput.inherentRisk.overallRisk.description == "" ||
      this.dataInput.currentAction.operation == "" ||
      this.dataInput.currentAction.appropriateness.description == "" ||
      this.dataInput.currentAction.overallControl.description == "" ||
      this.dataInput.currentAction.Preventive +
        this.dataInput.currentAction.Detective +
        this.dataInput.currentAction.Corrective ==
        0 ||
      this.dataInput.residualRisk.financialImpact.amount >
        this.dataInput.inherentRisk.financialImpact.amount ||
      this.dataInput.residualRisk.operationalImpact.loss >
        this.dataInput.inherentRisk.operationalImpact.loss ||
      this.dataInput.residualRisk.overallImpact.description == "" ||
      this.dataInput.residualRisk.likelihood == "" ||
      this.dataInput.residualRisk.overallRisk.description == "" ||
      this.dataInput.expectedRisk.treatmentPlanArr.length == 0 ||
      this.dataInput.expectedRisk.impact == "" ||
      this.dataInput.expectedRisk.likelihood == ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  deleteTreatment(event) {
    event.confirm.resolve();
    this.dataInput.expectedRisk.treatmentPlanArr = this.dataInput.expectedRisk.treatmentPlanArr.filter(
      function(item) {
        return item.no != this.no;
      },
      event.data
    );
    this.dataInput.expectedRisk.treatmentPlanArr.forEach((element, ind) => {
      element.no = ind + 1;
    });
    this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
    console.log(this.dataInput.expectedRisk.treatmentPlanArr);
  }
  saveTreatment(event) {
    event.confirm.resolve(event.newData);
    this.dataInput.expectedRisk.treatmentPlanArr.forEach((element, ind) => {
      element.no == event.newData.no
        ? (element.type = event.newData.type)
        : null;
    });
  }

  showTrt() {
    this.activeModal = this.modalService.open(RiskRegisterTrtComponent, {
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
    for (let data in this.dataInput.expectedRisk.treatmentPlanArr) {
      lastIndex <= this.dataInput.expectedRisk.treatmentPlanArr[data].no
        ? (lastIndex = this.dataInput.expectedRisk.treatmentPlanArr[data].no)
        : null;
    }
    this.activeModal.componentInstance.formData = {
      yearActive: this.yearPeriode,
      riskNo: "",
      no: lastIndex + 1,
      description: "",
      type: "",
      pic: "",
      dueDate: "",
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

          this.dataInput.expectedRisk.treatmentPlanArr.push(response);
          this.treatmentSrc.load(this.dataInput.expectedRisk.treatmentPlanArr);
        }
      },
      error => {}
    );
  }

  onChange() {
    console.log(this.dataInput.riskDescription.riskImpact);
  }
}
