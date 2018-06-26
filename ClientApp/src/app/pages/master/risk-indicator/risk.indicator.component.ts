import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RiskIndicatorModalComponent } from "./modal/risk.indicator.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: "ngx-risk-indicator",
  templateUrl: "./risk.indicator.component.html"
})
export class RiskIndicatorComponent {
  @ViewChild("myForm") private myForm: NgForm;
  buttonDisable:boolean;
  scoreDisable:boolean;
  addDisable:boolean;
  yearPeriode: any = moment().format("YYYY");
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
      edit: this.yearPeriode == moment().format("YYYY"),
      delete: false,
      position: "right",
      columnTitle: "Edit",
      width: "5%"
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "70%"
      },
      score: {
        title: "Score ",
        type: "number",
        filter: false,
        editable: this.scoreDisable==false,
        width: "10%"
      },
      flagActive: { title: 'Status', 
      type: 'html', width: "15%",
      editable: this.scoreDisable==true, 
      editor:
       { type: 'list', config: 
       { list: [{ value: 'Active', title: 'Active' }, 
       { value: 'Inactive', title: 'Inactive' }] } } }
    }
  };
  source: LocalDataSource = new LocalDataSource();
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
      desc: "Risk Impact"
    },
    {
      data: "OVR",
      desc: "Overall Risk"
    },
    {
      data: "EFF",
      desc: "Overall Control"
    }
  ];
  year: any[] = [
    {
      data: moment().subtract(9,'years').format("YYYY")
    },
    {
      data: moment().subtract(8,'years').format("YYYY")
    },
    {
      data: moment().subtract(7,'years').format("YYYY")
    },
    {
      data: moment().subtract(6,'years').format("YYYY")
    },
    {
      data: moment().subtract(5,'years').format("YYYY")
    },
    {
      data: moment().subtract(4,'years').format("YYYY")
    },
    {
      data: moment().subtract(3,'years').format("YYYY")
    },
    {
      data: moment().subtract(2,'years').format("YYYY")
    },
    {
      data: moment().subtract(1,'years').format("YYYY")
    },
    {
      data: moment().format("YYYY")
    }
  ];
  tabledata: any[] = [];

  subscription: any;
  activeModal: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public service: BackendService
  ) {
    this.buttonDisable=false;
    this.scoreDisable=false;
    this.addDisable=false;
    this.loadData();
  }

  ngOnInit() {}

  loadData() {
    this.service.getreq("TbMRiskIndicators").subscribe(response => {
      if (response != null) {
        const data = response;
        console.log(response);
        data.forEach((element, ind) => {
          data[ind].yearActive = data[ind].yearActive.toString();
          data[ind].score == null
            ? (data[ind].score = 0)
            : data[ind].score.toString();
          data[ind].status = "0";
          this.tabledata = data;
          this.source.load(this.tabledata);
        });
      }
      // error => {
      //   console.log(error);
      // };
    });
  }

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

  showModal() {
    this.activeModal = this.modalService.open(RiskIndicatorModalComponent, {
      windowClass: "xlModal",
      container: "nb-layout",
      backdrop: "static"
    });
    let lastIndex = 0;
    for (let data in this.tabledata) {
      if (
        this.tabledata[data].yearActive == this.myForm.value.yearPeriode &&
        this.tabledata[data].condition == this.myForm.value.condition
      ) {
        lastIndex < this.tabledata[data].counterNo
          ? (lastIndex = this.tabledata[data].counterNo)
          : null;
      }
    }

    const indicator = this.indicatorGenerate(lastIndex + 1);
    this.activeModal.componentInstance.condition = this.condition;
    this.activeModal.componentInstance.formData = {
      counterNo: lastIndex + 1,
      yearActive: this.myForm.value.yearPeriode,
      description: "",
      condition: this.myForm.value.condition,
      indicatorId: indicator,
      score: "",
      flagActive: "Active",
      UserCreated: "admin",
      DatetimeCreated: moment().format(),
      UserUpdate: "admin",
      DatetimeUpdate: moment().format(),
      scoreDisable:this.scoreDisable,
      status: "1"
    };

    this.activeModal.result.then(
      async response => {
        console.log(response);
        if (response != null) {
          this.tabledata.push(response);
          console.log(this.tabledata);
          this.submit();
          this.reload();
        }
      },
      error => {}
    );
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
    this.yearPeriode = this.myForm.value.yearPeriode;
    switch (this.myForm.value.condition) {
      case 'IMP':
        this.scoreDisable =false;
        break;
        case 'LKL':
        this.scoreDisable =false;
        break;
        case 'OVR':
        this.scoreDisable =false;
        break;
      default:
      this.scoreDisable =true;
    }
    switch (this.myForm.value.condition) {
      case 'IMP':
        this.addDisable =false;
        break;
        case 'LKL':
        this.addDisable =false;
        break;
        case 'OVR':
        this.addDisable =false;
        break;
        case 'EFF':
        this.addDisable =false;
        break;
      default:
      this.addDisable =true;
    }

    this.settings = {
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
        edit: this.yearPeriode == moment().format("YYYY"),
        delete: false,
        position: "right",
        columnTitle: "Edit",
        width: "5%"
      },
      pager: {
        display: true,
        perPage: 5
      },
      columns: {
        description: {
          title: "Description",
          type: "string",
          filter: false,
          editable: true,
          width: "70%"
        },
        score: {
          title: "Score ",
          type: "number",
          filter: false,
          editable: this.scoreDisable==false,
          width: "10%"
        },
        flagActive: { title: 'Status', 
        type: 'html', width: "15%", 
        editable: this.addDisable==true,
        editor:
         { type: 'list', config: 
         { list: [{ value: 'Active', title: 'Active' }, 
         { value: 'Inactive', title: 'Inactive' }] } } }
      }
    };
    this.source.setFilter(
      [
        { field: "condition", search: this.myForm.value.condition },
        { field: "yearActive", search: this.myForm.value.yearPeriode }
      ],
      true
    );
    switch (this.myForm.value.yearPeriode) {
      case moment().format('YYYY'):
        this.buttonDisable =false;
        break;
      default:
      this.buttonDisable =true;
    }
    
  }

  onSaveConfirm(event) {
    if (event.newData.description!='') {
      event.confirm.resolve(event.newData);
      this.submit(event);
    } else {
      event.confirm.reject();
    }
  }

  submit(event?) {
    event
      ? this.service
          .putreq("TbMRiskIndicators", JSON.stringify(event.newData))
          .subscribe(response => {
            console.log(JSON.stringify(event.newData));
            event.confirm.resolve(event.newData);
            error => {
              console.log(error);
            };
          })
      : null;
    console.log(JSON.stringify(this.tabledata));
    this.tabledata.forEach((element, ind) => {
      let index = ind;
      if (this.tabledata[index].status == "1") {
        this.service
          .postreq("TbMRiskIndicators", this.tabledata[index])
          .subscribe(response => {
            console.log(response);
            this.tabledata[index].status = "0";
            error => {
              console.log(error);
            };
          });
      }
    });

    this.toastr.success("Data Saved!");
  }
}
