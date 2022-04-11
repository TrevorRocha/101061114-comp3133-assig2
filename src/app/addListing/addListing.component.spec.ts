import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddListingComponent } from './addListing.component'

describe('AddListingComponent', () => {
  let component: AddListingComponent;
  let fixture: ComponentFixture<AddListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddListingComponent]
    }).compileComponents();
  });
  beforeEach(() =>{
    fixture = TestBed.createComponent(AddListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
