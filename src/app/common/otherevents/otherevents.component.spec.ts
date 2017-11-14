import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthereventsComponent } from './otherevents.component';

describe('OthereventsComponent', () => {
  let component: OthereventsComponent;
  let fixture: ComponentFixture<OthereventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthereventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthereventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
