import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliefDistribution } from './relief-distribution';

describe('ReliefDistribution', () => {
  let component: ReliefDistribution;
  let fixture: ComponentFixture<ReliefDistribution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReliefDistribution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReliefDistribution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
