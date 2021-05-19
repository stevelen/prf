import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../utils/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  email: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.username = "";
    this.password = "";
    this.email = "";
   }

  register(){
    if(this.username != '' && this.password != ''  && this.email != ''){
      this.loginService.register(this.username, this.password, this.email).subscribe(msg =>{
        console.log(msg);
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
        alert(error.error);
      })
    }
  }

  ngOnInit(): void {
  }

}
