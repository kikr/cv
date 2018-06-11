import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProjectComponent } from './cv-project.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CvProjectComponent', () => {
  let component: CvProjectComponent;
  let fixture: ComponentFixture<CvProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvProjectComponent ],
      imports: [ MaterialModule, ReactiveFormsModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
