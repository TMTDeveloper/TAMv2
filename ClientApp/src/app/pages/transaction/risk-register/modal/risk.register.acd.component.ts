import { LocalDataSource } from "ng2-smart-table";
import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackendService } from "../../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-register-acd",
  templateUrl: "./risk.register.acd.component.html"
})
export class RiskRegisterAcdComponent {
  filterData = {
    year: ""
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
      perPage: 30
    },
    columns: {
      counterNo: {
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
      }
      ,
      nextAction: {
        title: "Next Action",
        type: "string",
        filter: false,
        editable: true,
        width: "500px"
      }
    }
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private activeModal: NgbActiveModal,
    public service: BackendService
  ) {
    this.loadData();
  }
  loadData() {
    this.service.getreq("TbMAccidentDetails").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(response);
        console.log(
          data.filter(function(item) {
            console.log(this);
            return (
              item.yearActive == this.year
            );
          }, this.filterData)
        );
        this.source.load(
          data.filter(function(item) {
            return (
              item.yearActive == this.year 
            );
          }, this.filterData)
        );
      }
      // error => {
      //   console.log(error);
      // };
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
