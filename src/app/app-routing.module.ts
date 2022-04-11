import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddBookingComponent } from './addBooking/addBooking.component';
import { AddListingComponent } from './addListing/addListing.component';
import { AdminComponent } from './admin/admin.component';
import { BookingsComponent } from './bookings/bookings.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'bookings',
    component: BookingsComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'addbooking',
    component: AddBookingComponent,

  },
  {
    path: 'addListing',
    component: AddListingComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
