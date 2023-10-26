import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareSingleViewComponent } from './square-single-view.component';

describe('SquareSingleViewComponent', () => {
  let component: SquareSingleViewComponent;
  let fixture: ComponentFixture<SquareSingleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareSingleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
