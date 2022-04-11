import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NavigationEnd, Router, Event, NavigationExtras } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import { GET_ALL_LISTINGS } from "../constants";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl(),
    condition: new FormControl()
  });

  anyColumns: string[] = ['price', 'email', 'title', 'address', 'descrition'];
  userColumns: string[] = ['price', 'email', 'title', 'address', 'descrition', 'book'];

  authenticated = false;
  listings: any[] = []

  constructor(private apollo: Apollo, private authService: AuthService, private router: Router){
    this.authService.getIsAuthenticated().subscribe((res) => {
      this.authenticated = res;
    })

    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.getListings();
      }
    })
    this.getListings();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.getListings();
      }
    })
  }

  getListings(){
    this.apollo.watchQuery({
      query: GET_ALL_LISTINGS
    }).valueChanges.subscribe((res: any) => {
      this.listings = res.data.getAllListings;
    })
  }

  search(){
    let Search = this.searchForm.get('search')?.value;
    let Condition = this.searchForm.get('condition')?.value;
    console.log(Search, Condition);
    if(Search == null || Condition == null){
      alert('Please Enter a Listing Name, City or Postal Code')
    } else{
      if(Condition == 'name'){
        this.searchName(Search);
      }
      if(Condition == 'city'){
        this.searchCity(Search);
      }
      if(Condition == 'postalCode'){
        this.searchPostalCode(Search);
      }
    }
  }

  searchName(search: any){
    this.apollo.watchQuery({
      query: gql`
      query Query($name: String!){
        getListingsByName(name: $name){
          listing_id
          listing_title
          description
          street
          city
          postal_code
          price
          email
          username
        }
      }`, variables:{
        name: search
      }
    }).valueChanges.subscribe((result: any) => {
      this.listings = result?.data?.getListingsByName;
    })
  }

  searchCity(search: any){
    this.apollo.watchQuery({
      query: gql`
      query Query($city: String!){
        getListingsByCity(city: $city){
          listing_id
          listing_title
          description
          street
          city
          postal_code
          price
          email
          username
        }
      }`, variables:{
        city: search
      }
    }).valueChanges.subscribe((result: any) => {
      this.listings = result?.data?.getListingsByCity;
    })
  }

  searchPostalCode(search: any){
    this.apollo.watchQuery({
      query: gql`
      query Query($postalCode: String!){
        getListingsByPostalCode(postalCode: $postalCode){
          listing_id
          listing_title
          description
          street
          city
          postal_code
          price
          email
          username
        }
      }`, variables:{
        postalCode: search
      }
    }).valueChanges.subscribe((result: any) => {
      this.listings = result?.data?.getListingsByPostalCode;
    })
  }

  addBooking(index: any){
    let navExtras: NavigationExtras = {
      state: {
        list: this.listings[index]
      }
    };
    this.router.navigate(['/addbooking'], navExtras);
  }
}
