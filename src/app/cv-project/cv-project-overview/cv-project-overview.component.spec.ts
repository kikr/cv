import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProjectOverviewComponent } from './cv-project-overview.component';

describe('CvProjectOverviewComponent', () => {
  let component: CvProjectOverviewComponent;
  let fixture: ComponentFixture<CvProjectOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvProjectOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvProjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
