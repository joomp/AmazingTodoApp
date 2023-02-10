import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneIndicatorComponent } from './done-indicator.component';

import { MaterialModule } from '../../shared/modules/material/material.module';

describe('DoneIndicatorComponent', () => {
  let component: DoneIndicatorComponent;
  let fixture: ComponentFixture<DoneIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoneIndicatorComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DoneIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
