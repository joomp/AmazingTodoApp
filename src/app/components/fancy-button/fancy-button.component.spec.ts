import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyButtonComponent } from './fancy-button.component';
import { By } from '@angular/platform-browser';

describe('FancyButtonComponent', () => {
  let component: FancyButtonComponent;
  let fixture: ComponentFixture<FancyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FancyButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FancyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click on click', () => {
    const spy = spyOn(component.click, 'emit');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });
});
