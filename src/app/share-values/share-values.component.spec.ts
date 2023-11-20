import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareValuesComponent } from './share-values.component';

describe('ShareValuesComponent', () => {
  let component: ShareValuesComponent;
  let fixture: ComponentFixture<ShareValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
