import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSettlementsAndRequestsComponent } from './show-settlements-and-requests.component';

describe('ShowSettlementsAndRequestsComponent', () => {
  let component: ShowSettlementsAndRequestsComponent;
  let fixture: ComponentFixture<ShowSettlementsAndRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSettlementsAndRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSettlementsAndRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
