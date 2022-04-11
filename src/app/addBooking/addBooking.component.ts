import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from "../services/auth.service";
import { GET_ALL_BOOKINGS } from "../constants";
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-addBooking',
  templateUrl: './addBooking.component.html',
  styleUrls: ['./addBooking.component.scss']
})

export class AddBookingComponent implements OnInit{


  private ADD_BOOKING = gql`
  mutation Mutation(
    $userId: String!,
    $listingId: String!,
    $bookingId: String!,
    $bookingStart: String!,
    $bookingEnd: String!,
    $bookingDate: String!) {
  addBooking(
      userId: $userId,
      listing_id: $listingId,
      booking_id: $bookingId,
      booking_start: $bookingStart,
      booking_end: $bookingEnd,
      booking_date: $bookingDate)
    {
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
    }
}
`

  list: any;

  bookingForm = new FormGroup({
    bookingId: new FormControl(),
    bookingStart: new FormControl(),
    bookingEnd: new FormControl(),
  })

  constructor(private router: Router, private apollo: Apollo, private authService: AuthService){
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.list = this.router.getCurrentNavigation()?.extras.state?.['list'];
    }
  }

  ngOnInit(): void {
  }

  addBooking() {
    let UserId = this.authService.getUserId();
    let tempListId = this.list.listing_id;
    let CurrentDate = Date.now()
    let BookingId = this.bookingForm.get('bookingId')?.value;
    let StartDate = this.bookingForm.get('bookingStart')?.value;
    let EndDate = this.bookingForm.get('bookingEnd')?.value;

    console.log(UserId, tempListId, CurrentDate, BookingId, StartDate, EndDate);

    if (BookingId == null ||  StartDate == null || EndDate == null || BookingId == '' ){
      alert("Error Please Fill in all Feilds!");
    } else{
       if(StartDate > EndDate){
        alert("ERROR End Date Cannont Be Earlier Than Start Date.")
       } else{
          let formattedDate = moment(CurrentDate).format('MM-DD-YYYY')
          let formattedStartDate = moment(StartDate).format('MM-DD-YYYY')
          let formattedEndDate = moment(EndDate).format('MM-DD-YYYY')
          this.apollo.mutate({
            mutation: this.ADD_BOOKING,
            variables: {
              userId: UserId,
              listingId: tempListId,
              bookingId: BookingId,
              bookingDate: formattedDate.toString(),
              bookingStart: formattedStartDate.toString(),
              bookingEnd: formattedEndDate.toString()
            },
            refetchQueries: [{
              query: GET_ALL_BOOKINGS,
              variables: {userId: this.authService.getUserId()}
            }]
          }).subscribe((res: any) => {
            this.router.navigate(['/bookings'])
          }, err => {
            alert(err);
          })
        }
      }
  }

}
