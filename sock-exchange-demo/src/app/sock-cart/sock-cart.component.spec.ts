import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SockCartComponent } from './sock-cart.component';

describe('SockCartComponent', () => {
  let component: SockCartComponent;
  let fixture: ComponentFixture<SockCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SockCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SockCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
