import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddBookingComponent } from './addBooking.component'

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBookingComponent]
    })
    .compileComponents();
  });
  beforeEach(() =>{
    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
