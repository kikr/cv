import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProjectOverviewComponent } from './cv-project-overview.component';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CvProjectOverviewComponent', () => {
  let component: CvProjectOverviewComponent;
  let fixture: ComponentFixture<CvProjectOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvProjectOverviewComponent ],
      imports: [MaterialModule, ReactiveFormsModule, RouterTestingModule]
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
