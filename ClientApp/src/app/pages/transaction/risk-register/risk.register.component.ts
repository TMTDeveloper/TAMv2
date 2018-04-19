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
      division: "",
      department: "",
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
      accidentObj: []
    },
    inherentRisk: {
      qualitativeIR: ""
    },
    residualRisk: {
      qualitativeRD: ""
    },
    currentAction: {
      controls: []
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
          this.dataInput.inherentRisk.qualitativeIR = response.riskIndicatorId;
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
          this.dataInput.residualRisk.qualitativeRD = response.riskIndicatorId;
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

  reload() {
    this.riskno = this.myForm.value.riskno;
  }

  indicatorCtrGenerate(lastIndex) {
    switch (lastIndex.toString().length) {
      case 3:
        return this.myForm.value.condition + lastIndex.toString();

      case 2:
        return this.myForm.value.condition + "0" + lastIndex.toString();

      case 1:
        return this.myForm.value.condition + "00" + lastIndex.toString();
    }
  }

  submit() {
    this.toastr.success("Data Saved!");
  }
}
