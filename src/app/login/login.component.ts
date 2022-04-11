import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Apollo, gql} from 'apollo-angular';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { USER_ID } from "../constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  private LOGIN_POST = gql`
  mutation Mutation(
    $username: String!,
    $password: String!
    ) {
      login(
        username: $username,
        password: $password
      )
    }
  `

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private router: Router, private apollo: Apollo, private authService: AuthService){

  }

  ngOnInit(): void {

  }

  login(){
    let Username = this.loginForm.get('username')?.value;
    let Password = this.loginForm.get('password')?.value;

    console.log(Username, Password);

    this.apollo.mutate({
      mutation: this.LOGIN_POST,
      variables:{
        username: Username,
        password: Password
      }
    }).subscribe((res: any) =>{
      if (res.data.login === null || res.data.login === undefined){
        alert(new Error('The username and/or password you entered is invalid'))
      }else{
        this.authService.setUserData(res.data.login[0], res.data.login[5]);
        this.router.navigate(['']);
      }
    }, (err) =>{
      alert(err.message)
    })
  }
}
