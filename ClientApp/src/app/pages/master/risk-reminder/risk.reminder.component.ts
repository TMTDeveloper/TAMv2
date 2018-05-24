import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskReminderModalComponent } from "./modal/risk.reminder.modal.component";
import { RiskReminderManualComponent } from "./modal/risk.reminder.manual.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-reminder",
  templateUrl: "./risk.reminder.component.html"
})
export class RiskReminderComponent {
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
      edit: true,
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
      counterNo: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      startDate: {
        title: "Start Date",
        type: "date",
        filter: false,
        editable: true,
        width: "40%"
      },
      endDate: {
        title: "End Date",
        type: "date",
        filter: false,
        editable: true,
          width: "40%"
      },
      period: {
        title: "Periode",
        type: "number",
        filter: false,
        editable: true,
        width: "10%"
      }
    }
  };
  source: LocalDataSource = new LocalDataSource();
  condition: any[] = [
    {
      data: "APR",
      desc: "Approval"
    },
    {
      data: "SUB",
      desc: "Submit"
    }
  ];
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
  tabledata: any[] = [];

  senddata: any[]= [];

  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
  }

  ngOnInit() {}

  loadData() {
    this.service.getreq("TbMRiskReminders").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.tabledata = data;
          this.source.load(this.tabledata);
        });
      }
      // error => {
      //   console.log(error);
      // };
    });
  }

  loadManual() {
    this.service.getreq("TbRSendmails").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.senddata = data;
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
          condition: "SUB",
          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
      });

    //console.log(this.myForm.value.condition);
  }

  showModal() {
    this.activeModal = this.modalService.open(RiskReminderModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.myForm.value.yearPeriode &&
        this.tabledata[data].typeReminder == this.myForm.value.condition
      ) {
        lastIndex < this.tabledata[data].counterNo
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    

    const indicator = this.indicatorGenerate(lastIndex+1);

    this.activeModal.componentInstance.formData = {
      counterNo: lastIndex + 1,
      yearActive: this.myForm.value.yearPeriode,
      typeReminder: this.myForm.value.condition,
      startDate: "",
      endDate: "",
      //indicatorId: indicator,
      period:"",
      UserCreated: "admin",
      DatetimeCreated: moment().format(),
      UserUpdate: "admin",
      DatetimeUpdate: moment().format(),
      status: "1"
    };

    this.activeModal.result.then(async response => {
      if (response != false) {
        this.tabledata.push(response);
        console.log(this.tabledata);
        this.submit();
        this.reload();
      }
    });
  }

  showManual() {
    this.activeModal = this.modalService.open(RiskReminderManualComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.senddata) {
      if (
        this.tabledata[data].yearActive == this.myForm.value.yearPeriode
      ) {
        lastIndex < this.tabledata[data].counterNo
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    

    const indicator = this.indicatorGenerate(lastIndex+1);

    this.activeModal.componentInstance.formData = {
      counter: lastIndex + 1,
      yearActive: this.myForm.value.yearPeriode,
      typeSend: "Manual",
      //indicatorId: indicator,
      body:"",
      usersend: "admin",
      dateSend: moment().format(),
      status: "1"
    };

    this.activeModal.result.then(async response => {
      if (response != false) {
        this.senddata.push(response);
        console.log(this.senddata);
        this.submit();
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
    this.yearPeriode = this.myForm.value.yearPeriode;
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
        counterNo: {
          title: "No",
          type: "number",
          filter: false,
          editable: false,
          width: "5%"
        },
        startDate: {
          title: "Start Date",
          type: "date",
          filter: false,
          editable: true,
          width: "40%"
        },
        endDate: {
          title: "End Date",
          type: "date",
          filter: false,
          editable: true,
            width: "40%"
        },
        period: {
          title: "Periode",
          type: "number",
          filter: false,
          editable: true,
          width: "10%"
        }
      }
    };
    this.source.setFilter(
      [
        { field: "typeReminder", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
    switch (this.myForm.value.yearPeriode) {
      case moment().format('YYYY'):
        this.buttonDisable =false;
        break;
      default:
      this.buttonDisable =true;
    }
  }
  submit(event?) {
    event
      ? this.service
          .putreq("TbMRiskReminders", JSON.stringify(event.newData))
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
          .postreq("TbMRiskReminders", this.tabledata[index])
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

  deleteControl(event) {
    this.tabledata.forEach((element, ind) => {
      element.draftKey == event.data.draftKey ? (element.type = "RISK") : null;
    });
    const savedData = {
      draftKey: event.data.draftKey,
      draftJson: event.data.draftJson,
      division: event.data.division,
      department: event.data.department,
      type: "RISK",
      year: moment().format("YYYY"),
      userUpdated: "Admin",
      dateUpdated: moment().format(),
      userCreated: event.data.userCreated,
      dateCreated: event.data.dateCreated
    };
    this.service.putreq("TbMRiskReminders", savedData).subscribe(
      response => {
        console.log(response);
        this.toastr.success("Draft Deleted!");
        event.confirm.resolve();
      },
      error => {
        console.log(error);
        //this.toastr.error("Draft Delete Failed! Reason: " + error.statusText);
        event.confirm.resolve();
      }
    );
  }
}
