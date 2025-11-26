import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentReport } from './incident-report';

describe('IncidentReport', () => {
  let component: IncidentReport;
  let fixture: ComponentFixture<IncidentReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
