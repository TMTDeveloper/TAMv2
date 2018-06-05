import { LocalDataSource } from "ng2-smart-table";
import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackendService } from "../../../../@core/data/backend.service";
import { AccidentInputComponent } from "../../accident-input/accident.input.component";
@Component({
  selector: "ngx-risk-register-acd",
  templateUrl: "./risk.register.acd.component.html"
})
export class RiskRegisterAcdComponent {
  filterData: {
    year: string;
    division: string;
    department: string;
  };
  selectedData: any;
  settings: any = {
    mode: "inline",
    sort: true,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: "right",
      columnTitle: "Modify",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      vCounterNo: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "50px"
      },
      dateAccident: {
        title: "Date",
        type: "date",
        filter: false,
        editable: false,
        width: "100px"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "500px"
      },
      relatedParties: {
        title: "Related Parties",
        type: "string",
        filter: false,
        editable: true,
        width: "500px"
      },
      financialImpact: {
        title: "Financial Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "500px"
      },
      otherImpact: {
        title: "Other Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "500px"
      },
      currentAction: {
        title: "Current Action",
        type: "string",
        filter: false,
        editable: true,
        width: "500px"
      },
      nextAction: {
        title: "Next Action",
        type: "string",
        filter: false,
        editable: true,
        width: "500px"
      }
    }
  };

  childModal: any;
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    public service: BackendService
  ) {
    this.loadData();
  }
  loadData() {
    this.service.getreq("TbMAccidentDetails").subscribe(response => {
      if (response != null) {
        const data = response;

        let vCounter = 0;
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          vCounter = vCounter + 1;
          data[ind].vCounterNo = vCounter;
        });
        console.log(this.filterData);
        let arr = data.filter(item => {
          return (
            item.division == this.filterData.division &&
            item.department == this.filterData.department
          );
        });
        this.source.load(arr);
      }
      // error => {
      //   console.log(error);
      // };
    });
  }

  showModal() {
    this.childModal = this.modalService.open(AccidentInputComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    this.childModal.componentInstance.childModalMode = true;
    this.childModal.result.then(async response => {
      this.loadData();
    });
  }

  refreshSelected(event) {
    this.selectedData = event.data;
  }

  submit() {
    this.activeModal.close(this.selectedData);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
