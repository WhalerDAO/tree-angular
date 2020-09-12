import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestListComponent } from './forest-list.component';

describe('ForestListComponent', () => {
  let component: ForestListComponent;
  let fixture: ComponentFixture<ForestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
