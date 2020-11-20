import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldForestsComponent } from './old-forests.component';

describe('OldForestsComponent', () => {
  let component: OldForestsComponent;
  let fixture: ComponentFixture<OldForestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldForestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldForestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
