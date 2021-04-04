import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthControlService } from 'src/app/services/auth-control.service';
import errorDecorator from '../../utils/error-decorator';
import { ERRORS } from '../../utils/error-decorator';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error: string = "";
  public highlight: string = "";
  public token: string = "";
  public email: string = "";
  public password: string = "";
  public loading: boolean = false;

  constructor(private http: HttpClient,
              private router: Router,
              private localStorage: AuthControlService,
              private authService: AuthControlService) {
  }

  ngOnInit(): void {
  }

  onEmailInput(event: any): void {
    this.error = "";
    this.highlight = ""
    this.email = event.target.value;
  }

  onPasswordInput(event: any): void {
    this.error = "";
    this.highlight = "";
    this.password = event.target.value;
  }

  resetInputFields(): void {
    this.email = "";
    this.password = "";
  }

  checkHighlight(error: string): string {
    this.highlight = '';
    switch(error) {
      case ERRORS.INVALID_EMAIL:
      case ERRORS.LONG_EMAIL:
      case ERRORS.SHORT_EMAIL:
      case ERRORS.EMPTY_EMAIL:
      case ERRORS.WRONG_EMAIL:
      case ERRORS.DUPLICATE_EMAIL:
      case ERRORS.WRONG_EMAIL_OR_PASSWORD:
        return this.highlight = "email";
      case ERRORS.LONG_PASSWORD:
      case ERRORS.EMPTY_PASSWORD:
      case ERRORS.SHORT_PASSWORD:
      case ERRORS.WRONG_PASSWORD:
      case ERRORS.INVALID_PASSWORD:
        return this.highlight = "password";
    }
    return this.highlight = ''
  }

  loginUser(): void {
    // create the user
    this.loading = true;
    let user: LoginInfo = new LoginInfo(this.email, this.password)
    this.authService.login(user)
             .subscribe((res: any) => {
              if (res.error.details) {
                this.error = errorDecorator(res.error.details[0].message);
                this.loading = false;
                this.checkHighlight(res.error.details[0].message);
              } else {
                this.error = errorDecorator(res.error);
                this.loading = false;
                this.checkHighlight(res.error);
              }
             },
             (err) => {
                if (err.status == 400) {
                  this.error = errorDecorator(err.error.details[0].message);
                  this.checkHighlight(err.error.details[0].message);
                  return this.loading = false;
                }

                // SET THE TOKEN
                this.token = err.error.text;
                console.log(this.token);

                // LOCALSTORAGE
                this.localStorage.setKey(this.token);

                return this.token ? ( this.router.navigateByUrl('/main'),
                                      this.loading = false) : null;
             });
  }

  // REDIRECT TO REGISTER ROUTE
  redirectToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}

export class LoginInfo {
  constructor(private email: string,
              private password: string) {}
}
