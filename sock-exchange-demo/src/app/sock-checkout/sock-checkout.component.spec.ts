import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SockCheckoutComponent } from './sock-checkout.component';

describe('SockCheckoutComponent', () => {
  let component: SockCheckoutComponent;
  let fixture: ComponentFixture<SockCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SockCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SockCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
