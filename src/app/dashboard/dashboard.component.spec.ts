import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CvService } from '../cv/services/cv.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        DashboardComponent,
        { provide: CvService, useValue: jasmine.createSpyObj('CvService', ['getCvs', 'createCv'])}]
    })
    .compileComponents();

    component = TestBed.get(DashboardComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all CVs on onit', () => {
    const cvService = TestBed.get(CvService);
    // Just return an observable. Empty object is enough
    cvService.getCvs.and.returnValue(of([{}]));

    component.ngOnInit();

    expect(cvService.getCvs).toHaveBeenCalled();
  });
});
