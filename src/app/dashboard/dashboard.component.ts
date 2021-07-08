import { Component, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	constructor(private appService: AppService) {}

	showMovements: boolean = false;

	ngOnInit(): void {
		this.appService.fetchUserData();
	}

	get getName() {
		return this.appService.name;
	}
	get getMail() {
		return this.appService.mail;
	}

	clickShowMovements() {
		this.showMovements = true;
	}
}
