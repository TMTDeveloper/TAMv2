import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'ngx-chartjs',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
})
export class ChartjsComponent {
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
      departmentKPI: {
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
      }
      ,
      riskImpact: {
        title: "Risk Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      irImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      irLkl: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      irOvr: {
        title: "Overall",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      control: {
        title: "Caused",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      rdImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      rdLkl: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      rdOvr: {
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
      }
      ,
      exImpact: {
        title: "Impact",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      exLkl: {
        title: "Likelihood",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      exOvr: {
        title: "Overall",
        type: "string",
        filter: false,
        editable: true,
        width: "5%"
      }
      ,
      exSchedule: {
        title: "Schedule",
        type: "date",
        filter: false,
        editable: true,
        width: "5%"
      }
    }
  };
  source: LocalDataSource = new LocalDataSource();
}
