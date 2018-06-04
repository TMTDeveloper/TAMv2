import { Component, HostListener, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventManager } from "@angular/platform-browser";
@Component({
  selector: "ngx-auth-comp",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements AfterViewInit {
  passportDomain = "https://passport.toyota.astra.co.id";
  appId = "AB0FD73B-1447-4893-88E2-D87567F66C43";
  constructor(public router: Router, public eventManager: EventManager) {}

  ngAfterViewInit() {
    this.eventManager.addGlobalEventListener("window", "message", function(
      event
    ) {
      console.log(event);
      if (event.origin === this.passportDomain) {
        var message = event.data;
        if (message.Type === "Success") {
          console.log("success");
        }
      }
    });

  }

  authSso() {
    // let ssoUrl = this.passportDomain + "/auth/external/" + this.appId;
    // let width = 640;
    // let height = 480;
    // let left = screen.width / 2 - width / 2;
    // let top = screen.height / 2 - height / 2;
    // let origin = "localhost:5000";
    // let params =
    //   "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;
    // let popup = window.open(ssoUrl, "tamsso", params);
    // popup.postMessage("hi", ssoUrl);
    this.router.navigate(["/pages/"], {
      queryParams: {}
    });
  }
}
