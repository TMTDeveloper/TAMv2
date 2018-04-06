import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-risk-indicator-modal",
  templateUrl: "./risk.indicator.modal.component.html"
})
export class RiskIndicatorModalComponent {
  formData: {
    counterNo: string;
    yearActive: string;
    description: string;
    condition: string;
    indictatorId: string;
    score: string;
    UserCreated: string;
    DatetimeCreated: string;
    UserUpdate: string;
    DatetimeUpdate: string;
    status: string;
  };

  constructor(private activeModal: NgbActiveModal) {
    console.log(this.formData);
  }

  submit() {
    this.activeModal.close(this.formData);
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
