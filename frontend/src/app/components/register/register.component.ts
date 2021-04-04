import { HttpClient } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthControlService } from 'src/app/services/auth-control.service';
import errorDecorator, { ERRORS } from 'src/app/utils/error-decorator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public error: string = '';
  public token: string = '';
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public highlight: string = "";
  public loading: boolean = false;
  public highlightSecondary: boolean = false;

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthControlService) { }

  ngOnInit(): void {
  }

  onEmailInput(event: any): void {
    this.error = "";
    this.highlight = ""
    this.email = event.target.value;
  }

  onUsernameInput(event: any): void {
    this.error = "";
    this.highlight = ""
    this.username = event.target.value;
  }

  onPasswordInput(event: any): void {
    this.error = "";
    this.highlight = ""
    this.password = event.target.value;
  }

  onConfirmPasswordInput(event: any): void {
    this.error = "";
    this.highlight = ""
    this.confirmPassword = event.target.value;
  }

  checkHighlight(error: string): string {
    this.highlight = '';
    switch(error) {
      case ERRORS.NAME_EMPTY:
      case ERRORS.LONG_NAME:
      case ERRORS.SHORT_NAME:
        return this.highlight = "name";
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
      case ERRORS.PASSWORDS_DONT_MATCH:
        this.highlightSecondary = true;
        return this.highlight = "password"
    }
    return this.highlight = ''
  }

  registerUser(): void {
    // check if the two passwords match
    let invalidUser: RegisterInfo = new RegisterInfo('empty','empty','pass');
    let user: RegisterInfo = invalidUser;
    if (this.password === this.confirmPassword) {
      // create the user
      user = new RegisterInfo(this.username, this.email, this.password)
    } else {
      this.error = errorDecorator("passwords do not match");
      this.highlight = this.checkHighlight("passwords do not match");
    }

    if (user != invalidUser) {
      this.authService.register(user)
          .subscribe((res: any) => {
            if (res._id) {
              // NAVIGATE TO LOGIN AFTER SUCCESSFULL REGISTRATION
              this.router.navigateByUrl('/login');
            } else {
              this.error = errorDecorator(res.details[0].message);
              this.highlight = this.checkHighlight(res.details[0].message);
            }
            }, (err: any) => {
              if (err.status == 400) {
                this.highlight = this.checkHighlight(err.error.details[0].message);
                return this.error = errorDecorator(err.error.details[0].message);
              }

              // CHECK IF THE EMAIL EXISTS
              if (err.error) {
                this.highlight = this.checkHighlight(err.error.text);
                return this.error = err.error.text;
              }
          });
    }
  }

  // REDIRECT TO LOGIN ROUTE
  redirectToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}

export class RegisterInfo {
  constructor(private name: string,
              private email: string,
              private password: string) {}
}
