import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Apollo, gql} from 'apollo-angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  private SIGNUP_POST = gql`
    mutation Mutation(
      $username: String!,
      $firstname: String!,
      $lastname: String!,
      $password: String!,
      $email: String!,
      $type: String!
      ) {
        createNewUser(
          username: $username,
          firstname: $firstname,
          lastname: $lastname,
          password: $password,
          email: $email,
          type: $type
        ) {
          username
          firstname
          lastname
          password
          email
          type
        }
      }
  `

  signupForm = new FormGroup({
    username: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    type: new FormControl()
  })

  constructor(private router: Router, private apollo: Apollo){

  }

  ngOnInit(): void {

  }

  signUp(){
    let Username = this.signupForm.get('username')?.value;
    let Firstname = this.signupForm.get('firstname')?.value;
    let Lastname = this.signupForm.get('lastname')?.value;
    let Password = this.signupForm.get('password')?.value;
    let Email = this.signupForm.get('email')?.value;
    let Type = this.signupForm.get('type')?.value;

    if(Username === null){
      Username = '';
    }
    if(Firstname === null){
      Firstname = '';
    }
    if(Lastname === null){
      Lastname = '';
    }
    if(Password === null){
      Password = '';
    }
    if(Email === null){
      Email = '';
    }
    if(Type === null){
      Type = '';
    }

    this.apollo.mutate({
      mutation: this.SIGNUP_POST,
      variables:{
        username: Username,
        firstname: Firstname,
        lastname: Lastname,
        password: Password,
        email: Email,
        type: Type,
      }
    }).subscribe((res: any) => {
      console.log('signup', res.data)
      this.router.navigate(['/login'])
    }, (err) => {
      alert(err.message);
    })
  }
}
