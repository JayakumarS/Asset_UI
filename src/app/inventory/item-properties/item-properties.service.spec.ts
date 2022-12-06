import { TestBed } from '@angular/core/testing';

import { ItemPropertiesService } from './item-properties.service';

describe('ItemPropertiesService', () => {
  let service: ItemPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
