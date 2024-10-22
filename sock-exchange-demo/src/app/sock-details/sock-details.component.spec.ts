import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SockDetailsComponent } from './sock-details.component';

describe('SockDetailsComponent', () => {
  let component: SockDetailsComponent;
  let fixture: ComponentFixture<SockDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SockDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
