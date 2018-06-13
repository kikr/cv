import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvOverviewComponent } from './cv-overview.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('CvOverviewComponent', () => {
  let component: CvOverviewComponent;
  let fixture: ComponentFixture<CvOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvOverviewComponent ],
      imports: [MaterialModule, ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
