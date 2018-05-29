import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AccidentInputModalComponent } from "./modal/accident.input.modal.component"; // modal belum diedit
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-accident-input",
  templateUrl: "./accident.input.component.html"
})
export class AccidentInputComponent {
  @ViewChild("myForm") private myForm: NgForm;
  buttonDisable: boolean;
  yearPeriode: any = moment().format("YYYY");
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
      delete: true,
      position: "right",
      columnTitle: "Action",
      width: "5%"
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      vCounterNo: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      datemask: {
        title: "Date",
        type: "date",
        filter: false,
        editable: false,
        width: "5%"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "15%"
      },
      relatedParties: {
        title: "Related Parties",
        type: "string",
        filter: false,
        editable: true,
        width: "15%"
      },
      financialImpact: {
        title: "Financial Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "15%"
      },
      otherImpact: {
        title: "Other Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "15%"
      },
      currentAction: {
        title: "Current Action",
        type: "string",
        filter: false,
        editable: true,
        width: "15%"
      },
      nextAction: {
        title: "Next Action",
        type: "string",
        filter: false,
        editable: true,
        width: "15%"
      }
    }
  };
  year: any[] = [
    {
      data: moment()
        .subtract(9, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(8, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(7, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(6, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(5, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(4, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(3, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(2, "years")
        .format("YYYY")
    },
    {
      data: moment()
        .subtract(1, "years")
        .format("YYYY")
    },
    {
      data: moment().format("YYYY")
    }
  ];
  condition: any[] = [
    {
      data: "DEP",
      desc: "Department KPI"
    }
  ];

  division: any;
  department: any;

  source: LocalDataSource = new LocalDataSource();
  divisionData: any[] = [];
  departmentData: any[] = [];
  departmentFilter: any[] = [];
  tabledata: any[] = [];
  childModalMode: boolean = false;
  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService,
    public childModal: NgbActiveModal
  ) {
    this.buttonDisable = false;
    this.loadData();
  }
  loadData() {
    this.service.getreq("TbMAccidentDetails").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        let vCounter = 0;
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          vCounter = vCounter + 1;
          data[ind].vCounterNo = vCounter;
          data[ind].datemask = moment(data.dateAccident).format("DD/MM/YYYY");
        });

        this.tabledata = data;
        console.log(this.tabledata);
        this.source.load(this.tabledata);

        this.service.getreq("tbmlibraries").subscribe(response => {
          if (response != null) {
            let arr = response.filter(item => {
              return item.condition == "DIV";
            });
            console.log(arr);
            this.divisionData = arr;
            this.division = this.divisionData[0].charId;

            this.service.getreq("tbmdivdepts").subscribe(response => {
              if (response != null) {
                this.departmentData = response;
                this.departmentFilter = this.departmentData.filter(item => {
                  return item.kodeDivisi == this.division;
                });
                this.refreshReload();
              }
              // error => {
              //   console.log(error);
              // };
            });
          }
          // error => {
          //   console.log(error);
          // };
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
          condition: "DEP",
          yearPeriode: moment().format("YYYY"),
          division: "ISTD",
          departement: "IS"
        });
      })
      .then(resp => {
        this.reload();
      });

    console.log(this.myForm.value.condition);
  }

  showModal() {
    this.activeModal = this.modalService.open(AccidentInputModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.yearPeriode &&
        this.tabledata[data].division == this.division &&
        this.tabledata[data].department == this.department
      ) {
        lastIndex <= this.tabledata[data].counterNo
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    let vLastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.yearPeriode &&
        this.tabledata[data].division == this.division &&
        this.tabledata[data].department == this.department
      ) {
        vLastIndex <= this.tabledata[data].vCounterNo
          ? (vLastIndex = this.tabledata[data].vCounterNo)
          : null;
      }
    }

    const accidentId = this.comGenerate(lastIndex + 1);
    this.activeModal.componentInstance.condition = this.condition;
    this.activeModal.componentInstance.formData = {
      yearActive: this.yearPeriode,
      counterNo: lastIndex + 1,
      vCounterNo: vLastIndex + 1,
      division: this.division,
      department: this.department,
      accidentId: accidentId,
      dateAccident: "",
      description: "",
      relatedParties: "",
      financialImpact: "",
      otherImpact: "",
      currentAction: "",
      nextAction: "",
      flagActive: "Y",
      userCreated: "Admin",
      datetimeCreated: moment().format(),
      userUpdate: "Admin",
      datetimeUpdate: moment().format(),
      status: "1"
    };

    this.activeModal.result.then(
      async response => {
        if (response != false) {
          let data = response;
          data.datemask = moment(data.dateAccident).format("DD/MM/YYYY");
          this.tabledata.push(data);
          this.refreshReload();
          this.submit();
        }
      },
      error => {}
    );
  }

  comGenerate(lastIndex) {
    switch (lastIndex.toString().length) {
      case 3:
        return this.division + "-" + this.department + lastIndex.toString();

      case 2:
        return this.division + "-" + this.department + lastIndex.toString();

      case 1:
        return this.division + "-" + this.department + lastIndex.toString();
    }
  }

  reload() {
    this.filterDepartment();
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
        delete: true,
        position: "right",
        columnTitle: "Action",
        width: "5%"
      },
      pager: {
        display: true,
        perPage: 30
      },
      columns: {
        vCounterNo: {
          title: "No",
          type: "number",
          filter: false,
          editable: false,
          width: "5%"
        },
        datemask: {
          title: "Date",
          type: "date",
          filter: false,
          editable: false,
          width: "5%"
        },
        description: {
          title: "Description",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        relatedParties: {
          title: "Related Parties",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        financialImpact: {
          title: "Financial Impact",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        otherImpact: {
          title: "Other Impact",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        currentAction: {
          title: "Current Action",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        nextAction: {
          title: "Next Action",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        }
      }
    };
    this.source.setFilter(
      [
        { field: "yearActive", search: this.yearPeriode },
        { field: "division", search: this.division },
        { field: "department", search: this.department }
      ],
      true
    );
    switch (this.yearPeriode) {
      case moment().format("YYYY"):
        this.buttonDisable = false;
        break;
      default:
        this.buttonDisable = true;
    }
  }
  refreshReload() {
    switch (this.yearPeriode) {
      case moment().format("YYYY"):
        this.buttonDisable = false;
        break;
      default:
        this.buttonDisable = true;
    }
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
        delete: true,
        position: "right",
        columnTitle: "Action",
        width: "5%"
      },
      pager: {
        display: true,
        perPage: 30
      },
      columns: {
        vCounterNo: {
          title: "No",
          type: "number",
          filter: false,
          editable: false,
          width: "5%"
        },
        datemask: {
          title: "Date",
          type: "date",
          filter: false,
          editable: false,
          width: "5%"
        },
        description: {
          title: "Description",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        relatedParties: {
          title: "Related Parties",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        financialImpact: {
          title: "Financial Impact",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        otherImpact: {
          title: "Other Impact",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        currentAction: {
          title: "Current Action",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        },
        nextAction: {
          title: "Next Action",
          type: "string",
          filter: false,
          editable: true,
          width: "15%"
        }
      }
    };
    this.source.setFilter(
      [
        { field: "yearActive", search: this.yearPeriode },
        { field: "division", search: this.division },
        { field: "department", search: this.department }
      ],
      true
    );
  }
  filterDepartment() {
    console.log(JSON.stringify(this.division));
    let arr = this.departmentData.filter(item => {
      return item.kodeDivisi == this.division;
    });
    console.log(arr);
    if (arr[0] != null) {
      this.departmentFilter = arr;
      this.department = arr[0].kodeDepartment;
    } else {
      console.log(arr);
      this.departmentFilter = [];
    }
  }
  submit(event?) {
    event
      ? this.service
          .putreq("TbMAccidentDetails", JSON.stringify(event.newData))
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
          .postreq("TbMAccidentDetails", this.tabledata[index])
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

  onSaveConfirm(event) {
    if (
      event.newData.dateAccident != "" &&
      event.newData.description != "" &&
      event.newData.relatedParties != "" &&
      (event.newData.financialImpact != "" ||
        event.newData.otherImpact != "") &&
      event.newData.currentAction != "" &&
      event.newData.nextAction != ""
    ) {
      event.confirm.resolve(event.newData);
      this.submit(event);
    } else {
      event.confirm.reject();
    }
  }

  deleteControl(event) {
    const savedData = {
      yearActive: event.data.yearActive,

      accidentId: event.data.accidentId
    };
    this.service
      .postreq("TbMAccidentDetails/deletecontrol", savedData)
      .subscribe(
        response => {
          console.log(response);
          this.loadData();
          this.toastr.success("Data Deleted!");
          event.confirm.resolve();
        },
        error => {
          console.log(error);
          this.toastr.error("Data Delete Failed! Reason: " + error.statusText);
        }
      );
  }

  public closeModal() {
    this.childModal.close();
  }
}
