import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-risk-matriks-indicator-modal",
  templateUrl: "./risk.matriks.indicator.modal.component.html"
})
export class RiskMatriksIndicatorModalComponent {
  conditionA: any;
  conditionB: any;
  riskIndicatorData: any;
  data: any = {
    A: [],
    B: [],
    C: []
  };
  formData: {
    counterNo: string;
    yearActive: string;
    mappingId: string;
    condition: string;
    indictatorIdA: string;
    indictatorIdB: string;
    resultIdC: string;
    userCreated: string;
    datetimeCreated: string;
    userUpdate: string;
    datetimeUpdate: string;
    status: string;
  };

  constructor(private activeModal: NgbActiveModal) {}

  ngAfterViewInit() {
    console.log(this.formData);
    console.log(this.riskIndicatorData);
    this.updateData();
  }
  updateData() {
    this.data.A = this.riskIndicatorData.filter(this.filterData("a"));
    this.data.B = this.riskIndicatorData.filter(this.filterData("b"));
    this.data.C = this.riskIndicatorData.filter(this.filterData("b"));
  }

  filterData(item) {
    switch (item) {
      case "a":
        return (
          item.yearActive === this.formData.yearActive &&
          item.condition === this.conditionA.data
        );
      case "b":
        return (
          item.yearActive === this.formData.yearActive &&
          item.condition === this.conditionB.data
        );

      case "c":
        return (
          item.yearActive === this.formData.yearActive &&
          item.condition === this.formData.condition
        );
    }
  }

  submit() {
    this.activeModal.close(this.formData);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
