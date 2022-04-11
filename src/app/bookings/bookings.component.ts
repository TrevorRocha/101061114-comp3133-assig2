import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from "../services/auth.service";
import { GET_ALL_BOOKINGS, GET_ALL_BOOKINGS2 } from '../constants';

@Component({
  selector: 'app-Bookings',
  templateUrl: './Bookings.component.html',
  styleUrls: ['./Bookings.component.scss']
})

export class BookingsComponent implements OnInit {

  allColumns: string[] = ['id', 'createDate', 'startDate', 'endDate', 'username']

  bookings: any[] = [];

  authenticated = false;
  constructor(private apollo: Apollo, private authService: AuthService, private router: Router){
    this.authService.getIsAuthenticated().subscribe((res) => {
      this.authenticated = res;
    })

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getBooking();
      }
    })
    this.getBooking();
   }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getBooking();
      }
    })
  }

  getBooking(){
    this.apollo.watchQuery({
      query: GET_ALL_BOOKINGS2
    }).valueChanges.subscribe((res: any) => {
      this.bookings = res.data.getAllbookings;
    })
  }

}
