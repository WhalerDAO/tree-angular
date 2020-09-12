import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebaseComponent } from './rebase.component';

describe('RebaseComponent', () => {
  let component: RebaseComponent;
  let fixture: ComponentFixture<RebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
