import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
// private loginInfo: LoginInfo = new LoginInfo('test3@abv.bg','12345678910');
  public error: string = '';
  public token: string = '';
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public highlight: string = "";
  public loading: boolean = false;
  private port: number = 4000;

  constructor(private http: HttpClient,
              private router: Router) { }

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

  registerUser(): void {
    // check if the two passwords match
    console.log('regisering user');
    let invalidUser: RegisterInfo = new RegisterInfo('empty','empty','pass');
    let user: RegisterInfo = invalidUser;
    if (this.password === this.confirmPassword) {
      // create the user
      user = new RegisterInfo(this.username, this.email, this.password)
    }
    if (user != invalidUser) {
      this.http.post("http://localhost:3000/api/user/register",user).subscribe((res: any) => {
        if (res._id){
          // NAVIGATE TO LOGIN AFTER SUCCESSFULL REGISTRATION
          this.router.navigateByUrl('/login');
        } else {
          this.error = res.details[0].message;
        }
      },(err: any) => {
        if (err.status == 400) {
          return this.error = err.error.details[0].message;
        }

        // CHECK IF THE EMAIL EXISTS
        if (err.error) {
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

class RegisterInfo {
  constructor(private name: string,
              private email: string,
              private password: string) {}
}
