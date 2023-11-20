import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareHolderDetailsComponent } from './share-holder-details.component';

describe('ShareHolderDetailsComponent', () => {
  let component: ShareHolderDetailsComponent;
  let fixture: ComponentFixture<ShareHolderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareHolderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareHolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
