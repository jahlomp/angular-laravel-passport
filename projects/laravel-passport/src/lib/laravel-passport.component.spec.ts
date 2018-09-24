import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaravelPassportComponent } from './laravel-passport.component';

describe('LaravelPassportComponent', () => {
  let component: LaravelPassportComponent;
  let fixture: ComponentFixture<LaravelPassportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaravelPassportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaravelPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
