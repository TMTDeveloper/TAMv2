import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskRegisterModalComponent } from "./modal/risk.register.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-risk-register",
  templateUrl: "./risk.register.component.html"
})
export class RiskRegisterComponent {
  @ViewChild("myForm") private myForm: NgForm;

  subscription: any;
  activeModal: any;
  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  ngAfterViewInit() {}

  submit() {
    this.toastr.success("Data Saved!");
  }
}
