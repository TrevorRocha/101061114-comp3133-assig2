import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from "../services/auth.service";
import { GET_ALL_ADMIN_LISTINGS, GET_ALL_LISTINGS } from '../constants';

@Component({
  selector: 'app-addListing',
  templateUrl: './addListing.component.html',
  styleUrls: ['./addListing.component.css']
})

export class AddListingComponent implements OnInit{

  private ADD_LISTING = gql`
    mutation Mutation(
      $userId: String!,
      $listingId: String!,
      $listingTitle: String!,
      $description: String!,
      $street: String!,
      $city: String!,
      $postalCode: String!,
      $price: Float!) {
      createNewListing(
        userId: $userId,
        listing_id: $listingId,
        listing_title: $listingTitle,
        description: $description,
        street: $street,
        city: $city,
        postal_code: $postalCode,
        price: $price)
      {
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
    }
  `
  listForm =  new FormGroup({
    listingId: new FormControl(),
    listingTitle: new FormControl(),
    description: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
    price: new FormControl()
  });

  constructor(private router: Router, private apollo: Apollo, private authService: AuthService){

  }

  ngOnInit(): void {

  }

  addListing(){
    let UserId = this.authService.getUserId();
    let ListingId = this.listForm.get('listingId')?.value;
    let Title = this.listForm.get('title')?.value;
    let Description = this.listForm.get('description')?.value;
    let Street = this.listForm.get('street')?.value;
    let City = this.listForm.get('city')?.value;
    let PostalCode = this.listForm.get('postalCode')?.value;
    let Price = this.listForm.get('price')?.value;
    let formattedPrice;
    if (ListingId == null) {
      ListingId = ''
    }
    if (Title == null) {
      Title = ''
    }
    if (Description == null) {
      Description = ''
    }
    if (Street == null) {
      Street = ''
    }
    if (City == null) {
      City = ''
    }
    if (PostalCode == null) {
      PostalCode = ''
    }
    if(isNaN(Price)){
      alert("Price can only be a number")
    }else{
      formattedPrice = parseFloat(Price);

      this.apollo.mutate({
        mutation: this.ADD_LISTING,
        variables:{
          userId: UserId,
          listingId: ListingId,
          listingTitle: Title,
          description: Description,
          street: Street,
          city: City,
          PostalCode: PostalCode,
          price: formattedPrice
        },
        refetchQueries: [{
          query: GET_ALL_ADMIN_LISTINGS,
          variables: {UserId: this.authService.getUserId()}
        },{
          query: GET_ALL_LISTINGS
        }]
      }).subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['/admin'])
      }, (err) => {
        alert(err);
      })
    }
  }

}
