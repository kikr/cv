import { TestBed, inject } from '@angular/core/testing';

import { CvProjectDataService } from './cv-project.data.service';

describe('CvProject.DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CvProjectDataService]
    });
  });

  it('should be created', inject([CvProjectDataService], (service: CvProjectDataService) => {
    expect(service).toBeTruthy();
  }));
});
