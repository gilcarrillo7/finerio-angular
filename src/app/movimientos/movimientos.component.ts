import { Component, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
	selector: "app-movimientos",
	templateUrl: "./movimientos.component.html",
	styleUrls: ["./movimientos.component.scss"],
})
export class MovimientosComponent implements OnInit {
	movements: {
		dateCreated: string;
		customDescription: string;
		amount: string;
		catid: string;
	}[] = [];
	max = 10;
	offset = 10;
	throttle = 500;
	scrollDistance = 1;
	direction = "";
	loaded = false;
	error = "";

	constructor(private appService: AppService, private http: HttpClient, private router: Router) {}

	ngOnInit(): void {
		this.fetchMovements(0);
	}

	onScrollDown() {
		this.fetchMovements(this.offset);
		this.offset = this.offset + this.max;
		this.direction = "down";
	}

	//Se actualizan los movimientos con un offset y un maximo
	fetchMovements(offset: number) {
		const token = localStorage.getItem("finerio-token");
		const headers = { Authorization: `Bearer ${token}` };
		this.http
			.get(
				`https://api.finerio.mx/api/users/${this.appService.id}/movements?offset=${offset}&max=${this.max}&includeCharges=true&includeDeposits=true&includeDuplicates=true`,
				{ headers }
			)
			.subscribe({
				next: (data: any) => {
					data.data.forEach((el: any) => {
						this.movements.push({
							dateCreated: el.dateCreated,
							customDescription: el.customDescription,
							amount: el.amount,
							catid: el.category.id,
						});
					});
					this.loaded = true;
				},
				error: (error) => {
					this.loaded = true;
					this.error = error.message;
					setTimeout(() => {
						this.router.navigate(["/"]);
					}, 1000);
				},
			});
	}
}
