import { Component, ViewChild, ElementRef } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { BackendService } from "../../../@core/data/backend.service";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
@Component({
  selector: "ngx-chartjs",
  styleUrls: ["./chartjs.component.scss"],
  templateUrl: "./chartjs.component.html"
})
export class ChartjsComponent {
  @ViewChild("printEl") printEl: ElementRef;
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
      riskNo: {
        title: "Risk No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      departmentKpi: {
        title: "Department KPI",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      lossEvent: {
        title: "Loss Event",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      caused: {
        title: "Caused",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      riskImpact: {
        title: "Risk Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      irImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      irLikelihood: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      irOverall: {
        title: "Overall",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      control: {
        title: "Caused",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      rdImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      rdLikelihood: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      rdOverall: {
        title: "Overall",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      treatmentPlan: {
        title: "Treatment Plan",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      exImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      exLikelihood: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      exOverall: {
        title: "Overall",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      },
      exSchedule: {
        title: "Schedule",
        type: "date",
        filter: false,
        editable: true,
        width: "5%"
      }
    }
  };

  tabledata: any[] = [];
  effectivedata: any[] = [];
  moderatedata: any[] = [];
  ineffectivedata: any[] = [];
  weakdata: any[] = [];

  subscription: any;
  activeModal: any;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.loadData();
  }

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

  loadData() {
    this.service.getreq("Riskreports").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].status = "0";
          this.tabledata = data;
          let arr1 = this.tabledata.filter(item => {
            return item.efOverall === "Effective";
          });
          this.effectivedata = arr1;
          let arr2 = this.tabledata.filter(item => {
            return item.efOverall === "Moderate";
          });
          this.moderatedata = arr2;
          let arr3 = this.tabledata.filter(item => {
            return item.efOverall === "Ineffective";
          });
          this.ineffectivedata = arr3;
          let arr4 = this.tabledata.filter(item => {
            return item.efOverall === "Weak";
          });
          this.weakdata = arr4;
        });
      }
      // error => {
      //   console.log(error);
      // };
    });
  }
  // print(): void {
  //   let printContents, popupWin;
  //   printContents = document.getElementById("print-section");
  //   popupWin = window.frames["print-section"];
  //   popupWin.document.write('<body onload="window.print()">dddd</body>');
  //   popupWin.document.close();
  // }
  // printbro(printEl: HTMLElement) {
  //   let printContainer: HTMLElement = document.querySelector('#print-container');

  //   if (!printContainer) {
  //     printContainer = document.createElement('div');
  //     printContainer.id = 'print-container';
  //   }

  //   printContainer.innerHTML = '';

  //   let elementCopy = printEl.cloneNode(true);
  //   printContainer.appendChild(elementCopy);
  //   document.body.appendChild(printContainer);

  //   (window as any).print();
  // }
  print() {
    let doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(12, 10, "Report");

    // Create your table here (The dynamic table needs to be converted to canvas).
    let element = <HTMLScriptElement>document.getElementsByClassName(
      "print_this"
    )[0];
    html2canvas(element).then((canvas: any) => {
      doc.addImage(
        canvas.toDataURL("image/jpeg"),
        "JPEG",
        0,
        50,
        doc.internal.pageSize.width,
        element.offsetHeight / 5
      );
      doc.save(`Report-${Date.now()}.pdf`);
    });
  }
}
