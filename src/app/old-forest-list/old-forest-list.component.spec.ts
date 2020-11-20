import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldForestListComponent } from './old-forest-list.component';

describe('OldForestListComponent', () => {
  let component: OldForestListComponent;
  let fixture: ComponentFixture<OldForestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldForestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldForestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
