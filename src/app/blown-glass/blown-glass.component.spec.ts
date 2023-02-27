import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlownGlassComponent } from './blown-glass.component';

describe('BlownGlassComponent', () => {
  let component: BlownGlassComponent;
  let fixture: ComponentFixture<BlownGlassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlownGlassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlownGlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
