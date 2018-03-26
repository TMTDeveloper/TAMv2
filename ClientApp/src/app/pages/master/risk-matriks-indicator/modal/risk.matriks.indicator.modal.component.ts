import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-risk-matriks-indicator-modal",
  templateUrl: "./risk.matriks.indicator.modal.component.html"
})
export class RiskMatriksIndicatorModalComponent {
  formData: {
    COUNTER_NO: string;
    YEAR_ACTIVE: string;
    DESCRIPTION: string;
    CONDITION: string;
    INDICATOR_ID: string;
    SCORE: string;
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
