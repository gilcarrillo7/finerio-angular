import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "../services/app.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
	submitted = false;

	constructor(private fb: FormBuilder, private appService: AppService) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			mail: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});
	}

	get loginFormControl() {
		return this.loginForm.controls;
	}

	get errorLogin() {
		return this.appService.error;
	}

	onSubmit() {
		this.submitted = true;
		if (this.loginForm.valid) {
			this.appService.login(
				this.loginForm.value.mail,
				this.loginForm.value.password
			);
		}
	}
}
