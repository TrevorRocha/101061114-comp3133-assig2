import { gql } from "apollo-angular";
export const USER_ID = '';
export const USER_TYPE = '';
export const AUTHENTICATED = 'false';

export const GET_ALL_BOOKINGS = gql`
    query Query($userId: String!) {
      getAllUserBookings(userId: $userId) {
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
      }
    }
  `
export const GET_ALL_ADMIN_LISTINGS = gql`
  query Query($userId: String!) {
    getAllAdminListings(userId: $userId) {
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
export const GET_ALL_LISTINGS = gql`{
  getAllListings {
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
}`

export const GET_ALL_BOOKINGS2 = gql`{
      getAllBookings {
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
      }
    }
  `
