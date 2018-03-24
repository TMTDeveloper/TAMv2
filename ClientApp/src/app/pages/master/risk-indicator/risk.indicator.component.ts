import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskIndicatorModalComponent } from "./modal/risk.indicator.modal.component";
import * as moment from "moment"; 
@Component({
  selector: "ngx-risk-indicator",
  templateUrl: "./risk.indicator.component.html"
})
export class RiskIndicatorComponent {
  @ViewChild("myForm") private myForm: NgForm;
  settings: any = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
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
      COUNTER_NO: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      DESCRIPTION: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "80%"
      },
      SCORE: {
        title: "Score ",
        type: "number",
        filter: false,
        editable: true,
        width: "10%"
      }
    }
  };
  condition: any[] = [
    {
      data: "IMP",
      desc: "Impact"
    },
    {
      data: "LKL",
      desc: "Likelihood"
    },
    {
      data: "LVL",
      desc: "Risk Level"
    },
    {
      data: "APR",
      desc: "Appropriateness"
    },
    {
      data: "OPR",
      desc: "Operation"
    },
    {
      data: "RTP",
      desc: "Risk Type"
    },
    {
      data: "OVR",
      desc: "Overall"
    },
    {
      data: "EFF",
      desc: "Effectiveness"
    }
  ];
  source: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [
    {
      COUNTER_NO: 1,
      YEAR_ACTIVE: "2018",
      DESCRIPTION: "hehehe",
      CONDITION: "IMP",
      INDICATOR_ID: "IMP001",
      SCORE: 123
    },
    {
      COUNTER_NO: 1,
      YEAR_ACTIVE: "2018",
      DESCRIPTION: "hahehe",
      CONDITION: "LKL",
      INDICATOR_ID: "LKL001",
      SCORE: 123
    },
    {
      COUNTER_NO: 1,
      YEAR_ACTIVE: "2018",
      DESCRIPTION: "hihehe",
      CONDITION: "OPR",
      INDICATOR_ID: "OPR001",
      SCORE: 123
    }
  ];

  subscription: any;
  activeModal: any;
  constructor(private modalService: NgbModal) {}

  ngAfterViewInit() {
    this.source
      .load(this.tabledata)
      .then(resp => {
        this.myForm.setValue({
          condition: "IMP",
          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
      });

    console.log(this.myForm.value.condition);
  }

  showModal(no_iku) {
    this.activeModal = this.modalService.open(RiskIndicatorModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].YEAR_ACTIVE == this.myForm.value.yearPeriode &&
        this.tabledata[data].CONDITION == this.myForm.value.condition
      ) {
        lastIndex < this.tabledata[data].COUNTER_NO
          ? (lastIndex = this.tabledata[data].COUNTER_NO)
          : null;
      }
    }

    const indicator = this.indicatorGenerate(lastIndex);

    this.activeModal.componentInstance.formData = {
      COUNTER_NO: lastIndex + 1,
      YEAR_ACTIVE: this.myForm.value.yearPeriode,
      DESCRIPTION: "",
      CONDITION: this.myForm.value.condition,
      INDICATOR_ID: indicator,
      SCORE: ""
    };

    this.activeModal.result.then(async response => {
      if (response != false) {
        this.tabledata.push(response);
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
    this.source.setFilter(
      [
        { field: "CONDITION", search: this.myForm.value.condition },
        { field: "YEAR_ACTIVE", search: this.myForm.value.yearPeriode }
      ],
      true
    );
  }
  submit() {}
}
