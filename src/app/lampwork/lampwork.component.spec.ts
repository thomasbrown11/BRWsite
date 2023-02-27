import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LampworkComponent } from './lampwork.component';

describe('LampworkComponent', () => {
  let component: LampworkComponent;
  let fixture: ComponentFixture<LampworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LampworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LampworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
