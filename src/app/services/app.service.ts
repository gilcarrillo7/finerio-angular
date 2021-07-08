import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class AppService {
	public name: string = "";
	public mail: string = "";
	public id: string = "";
	public movements: any = [];
	public categories: any = [];
	public error: string = "";

	constructor(private http: HttpClient, private router: Router) {}

	login(mail: string, password: string) {
		//Consulta al endpoint de login
		this.http
			.post("https://api.finerio.mx/api/login", { username: mail, password })
			.subscribe({
				next: (data: any) => {
					this.error = "";
					//Se almacena el Token en localStorage y se redirecciona a Dashboard
					localStorage.setItem("finerio-token", data.access_token);
					this.router.navigate(["/dashboard"]);
				},
				error: (error) => {
					console.log(error.status);
					this.error = error.status;
				},
			});
	}
	fetchUserData() {
		//Consulta endpoint para obtener info del usario
		const token = localStorage.getItem("finerio-token");
		const headers = { Authorization: `Bearer ${token}` };
		this.http.get("https://api.finerio.mx/api/me", { headers }).subscribe({
			next: (data: any) => {
				this.name = data.name;
				this.mail = data.email;
				this.id = data.id;
			},
			error: (error) => {
				this.router.navigate(["/"]);
			},
		});
	}
	fetchMovements() {
		const token = localStorage.getItem("finerio-token");
		const headers = { Authorization: `Bearer ${token}` };
		this.http
			.get(
				`https://api.finerio.mx/api/users/${this.id}/movements?offset=0&max=10&includeCharges=true&includeDeposits=true&includeDuplicates=true`,
				{ headers }
			)
			.subscribe((data: any) => {
				this.movements = data.data;
			});
	}
	fetchCategory$(categoryId: string) {
		const token = localStorage.getItem("finerio-token");
		const headers = { Authorization: `Bearer ${token}` };
		return this.http
			.get(`https://api.finerio.mx/api/categories/${categoryId}`, { headers })
			.subscribe((data: any) => {
				return {
					categoryId,
					name: data.name,
					color: data.color,
				};
			});
	}
}
