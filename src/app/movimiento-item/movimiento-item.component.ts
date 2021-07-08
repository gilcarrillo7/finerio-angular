import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-movimiento-item",
	templateUrl: "./movimiento-item.component.html",
	styleUrls: ["./movimiento-item.component.scss"],
})
export class MovimientoItemComponent implements OnInit {
	@Input() mov: any;
	catName?: string;
	catColor?: string;
	error = "";

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		const token = localStorage.getItem("finerio-token");
		const headers = { Authorization: `Bearer ${token}` };
		//Se consulta endpoint de categorias para obtener color y nombre de la categoria
		this.http
			.get(`https://api.finerio.mx/api/categories/${this.mov.catid}`, {
				headers,
			})
			.subscribe({
				next: (data: any) => {
					this.catName = data.name;
					this.catColor = data.color;
				},
				error: (error) => {
					this.error = error.message;
				},
			});
	}

	formatDate(fecha: string) {
		let d = new Date(fecha);
		const months = [
			"Ene",
			"Feb",
			"Mar",
			"Abr",
			"May",
			"Jun",
			"Jul",
			"Ago",
			"Sep",
			"Oct",
			"Nov",
			"Dic",
		];
		return `${d.getDate()} ${months[d.getMonth()]}`;
	}
}
