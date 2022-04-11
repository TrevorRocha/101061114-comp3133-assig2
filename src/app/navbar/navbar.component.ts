import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.isAdmin = localStorage.getItem('type') === 'admin'
    this.loggedIn = localStorage.getItem('token') ? true : false;
  }
  ngOnInit(): void {
    this.authService.getIsAuthenticated()
    .pipe(distinctUntilChanged())
    .subscribe(getIsAuthenticated => {
      this.loggedIn = getIsAuthenticated
    });

    this.authService.getIsAdmin()
    .pipe(distinctUntilChanged())
    .subscribe(data => {
      this.isAdmin = data
      console.log("isAdmin? : ", this.isAdmin)
    });
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}
