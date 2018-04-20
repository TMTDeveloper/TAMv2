import { LocalDataSource } from "ng2-smart-table";
import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BackendService } from "../../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-register-ql",
  templateUrl: "./risk.register.ql.component.html"
})
export class RiskRegisterQlComponent {
  riskIndicatorData: any = [];
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
        width: "5%"
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
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private activeModal: NgbActiveModal,
    public service: BackendService
  ) {
    this.loadData();
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
          data[ind].status = "0";

          this.riskIndicatorData = data;
        });
        this.service.getreq("TbMQualitativeImpacts").subscribe(response => {
          const data = response;
          console.log(JSON.stringify(response));
          data.forEach((element, ind) => {
            data[ind].yearActive = data[ind].yearActive.toString();
            data[ind].status = "0";
            let arr = this.riskIndicatorData.filter(function(item) {
              return item.indicatorId == data[ind].riskIndicatorId;
            });
            if (arr[0] != null) {
              data[ind].descriptionrisk = arr[0].description;
              data[ind].score = arr[0].score;
            }
          });

          if (response != null) {
            console.log(response);
            this.source.load(
              data.filter(function(item) {
                return item.yearActive == this.year && item.category == "EWD";
              }, this.filterData)
            );
          }

          // error => {
          //   console.log(error);
          // };
        });
      }
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
