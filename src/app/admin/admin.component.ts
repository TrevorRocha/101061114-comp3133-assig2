import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { GET_ALL_ADMIN_LISTINGS } from "../constants";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  private querySubscription: Subscription |undefined;
  loading: boolean | undefined;
  listings: any[] = [];
  authenticated: boolean = false;

  columns: string[] = ['price', 'email', 'title', 'address', 'descrition'];

  constructor(private apollo: Apollo, private authService: AuthService, private router: Router){
    this.authService.getIsAuthenticated().subscribe((res) => {
      this.authenticated = res;
    })
    this.getInfo();
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.apollo.watchQuery<any>({
      query: GET_ALL_ADMIN_LISTINGS,
      variables: {
        userId: this.authService.getUserId()
      }
    }).valueChanges.subscribe((res) => {
      this.listings = res.data.GET_ALL_ADMIN_LISTINGS
    })
  }
}
