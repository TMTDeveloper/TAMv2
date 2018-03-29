import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyInputModalComponent } from "./modal/company.input.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-company-input",
  templateUrl: "./company.input.component.html"
})
export class CompanyInputComponent {
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
    }
  };
  year: any[] = [
    {
      data: "2000"
    },
    {
      data: "2001"
    },
    {
      data: "2002"
    },
    {
      data: "2003"
    },
    {
      data: "2004"
    },
    {
      data: "2005"
    },
    {
      data: "2006"
    },
    {
      data: "2007"
    },
    {
      data: "2008"
    },
    {
      data: "2009"
    },
    {
      data: "2010"
    },
    {
      data: "2011"
    },
    {
      data: "2012"
    },
    {
      data: "2013"
    },
    {
      data: "2014"
    },
    {
      data: "2015"
    },
    {
      data: "2016"
    },
    {
      data: "2017"
    },
    {
      data: "2018"
    },
    {
      data: "2019"
    },
    {
      data: "2020"
    },
    {
      data: "2021"
    },
    {
      data: "2022"
    },
    {
      data: "2022"
    },
    {
      data: "2023"
    },
    {
      data: "2024"
    },
    {
      data: "2025"
    },
    {
      data: "2026"
    },
    {
      data: "2027"
    },
    {
      data: "2028"
    },
    {
      data: "2029"
    },
    {
      data: "2030"
    }
  ];
  condition: any[] = [
    {
      data: "OBJ",
      desc: "Company Objectives"
    },
    {
      data: "KPI",
      desc: "Company KPI"
    },
    {
      data: "BP",
      desc: "Company BP"
    }
  ];
  source: LocalDataSource = new LocalDataSource();

  tabledata: any[] = [
    {
      COUNTER_NO: 1,
      YEAR_ACTIVE: "2018",
      DESCRIPTION: "No. 1 with market share =35%",
      CONDITION: "OBJ",
      INDICATOR_ID: ""
    },
  ];

  subscription: any;
  activeModal: any;
  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  ngAfterViewInit() {
    this.source
      .load(this.tabledata)
      .then(resp => {
        this.myForm.setValue({
          condition: "OBJ",
          year: "2018",
          yearPeriode: moment().format("YYYY")
        });
      })
      .then(resp => {
        this.reload();
      });

    console.log(this.myForm.value.condition);
  }

  showModal(no_iku) {
    this.activeModal = this.modalService.open(CompanyInputModalComponent, {
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
  submit() {
    this.toastr.success("Data Saved!");
  }
}
