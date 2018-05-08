import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { BackendService } from "../../@core/data/backend.service";
import { DashboardModalComponent } from "./modal/dashboard.modal.component";
import { Router } from "@angular/router";
@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
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
      edit: false,
      delete: false
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
        width: "10%"
      },
      riskNo: {
        title: "Risk No",
        type: "string",
        filter: false,
        editable: true,
        width: "30%",
        editor: {
          type: "textarea"
        }
      },
      lossEvent: {
        title: "Loss Event",
        type: "string",
        filter: false,
        editable: true,
        width: "40%",
        editor: {
          type: "textarea"
        }
      }
    }
  };

  division: any[] = [
    {
      data: "ISTD",
      desc: "Information system and technical division"
    }
  ];
  department: any[] = [
    {
      data: "IS",
      desc: "Information system"
    }
  ];

  source: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [];
  tableapprove: any[] = [];
  dataapprove: any;

  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    public service: BackendService,
    public router: Router
  ) {
    this.buttonDisable = false;
    this.loadData();
    this.loadApprove();
  }
  loadData() {
    this.service.getreq("Riskreports").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        this.tabledata = data;
        this.source.load(this.tabledata);
      }
      // error => {
      //   console.log(error);
      // };
    });
  }

  loadApprove() {
    this.service.getreq("TbRApproves").subscribe(response => {
      if (response != null) {
        const data = response;
        let find = 0;
        console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.tableapprove = data;
          find = find + 1;
          console.log(this.tableapprove);
          console.log("liatapprove");
        });
        //this.reloadApprove();

        this.dataapprove = this.tableapprove[find - 1];
        console.log("dataapprove");
        console.log(this.dataapprove);
      }
    });
  }

  ngAfterViewInit() {
    this.source.load(this.tabledata);
    document.getElementsByClassName("column_name")["0"].style.width = "100px";
  }

  comGenerate(lastIndex) {
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
        description: {
          title: "Description",
          type: "string",
          filter: false,
          editable: true,
          width: "80%",
          editor: {
            type: "textarea"
          }
        }
      }
    };
    this.source.setFilter(
      [
        { field: "condition", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
    switch (this.myForm.value.yearPeriode) {
      case moment().format("YYYY"):
        this.buttonDisable = false;
        break;
      default:
        this.buttonDisable = true;
    }
  }
  submit(event?) {
    event
      ? this.service
          .putreq("TbMComInputs", JSON.stringify(event.newData))
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
          .postreq("TbMComInputs", this.tabledata[index])
          .subscribe(response => {
            console.log(response);
            this.tabledata[index].status = "0";
            error => {
              console.log(error);
            };
          });
      }
    });
  }
  showModal(data) {
    this.activeModal = this.modalService.open(DashboardModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.activeModal.componentInstance.formData = {
      finImpactCategory: data.finImpactCategory,
      finAmountIr: data.finAmountIr,
      opAmountIr: data.opAmountIr,
      opImpactCategory: data.opImpactCategory,
      finImpactRd: data.finImpactRd,
      finAmountRd: data.finAmountRd,
      opImpactRd: data.opImpactRd,
      opAmountRd: data.opAmountRd,
      qlImpactIr: data.qlImpactIr,
      qlImpactRd: data.qlImpactRd,
      irLikelihood: data.irLikelihood,
      rdLikelihood: data.rdLikelihood
    };
    console.log({
      finImpactCategory: data.finImpactCategory,
      finAmountIr: data.finAmountIr,
      opAmountIr: data.opAmountIr,
      opImpactCategory: data.opImpactCategory,
      finImpactRd: data.finImpactRd,
      finAmountRd: data.finAmountRd,
      opImpactRd: data.opImpactRd,
      opAmountRd: data.opAmountRd,
      qlImpactIr: data.qlImpactIr,
      qlImpactRd: data.qlImpactRd,
      irLikelihood: data.irLikelihood,
      rdLikelihood: data.rdLikelihood
    });
  }

  goToPage(riskno) {
    this.service.getreq("Draftrisks").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(data);
        response.forEach(element => {
          element.draftKey == riskno
            ? this.router.navigate(["/pages/transaction/risk-register"], {
                queryParams: {
                  draftKey: element.draftKey,
                  draftJson: element.draftJson
                }
              })
            : null;
        });
      }
      // error => {
      //   console.log(error);
      // };
    });
  }
}
