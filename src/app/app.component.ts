import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '101061114-comp3133-assig2';

  authenticated  = false;
  admin = false;

  constructor(private router: Router, private authService: AuthService){
    this.authService.getIsAuthenticated().subscribe(res => {
      this.authenticated = res;
    })
    this.authService.getIsAdmin().subscribe(res => {
      this.admin = res;
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
