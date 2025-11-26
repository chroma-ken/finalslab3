import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvacuationCenter } from './evacuation-center';

describe('EvacuationCenter', () => {
  let component: EvacuationCenter;
  let fixture: ComponentFixture<EvacuationCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvacuationCenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvacuationCenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
