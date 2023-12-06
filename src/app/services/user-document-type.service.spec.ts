import { TestBed } from '@angular/core/testing';

import { UserDocumentTypeService } from './user-document-type.service';

describe('UserDniTypeServiceService', () => {
  let service: UserDocumentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDocumentTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
