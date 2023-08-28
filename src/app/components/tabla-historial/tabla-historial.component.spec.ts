import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHistorialComponent } from './tabla-historial.component';

describe('TablaHistorialComponent', () => {
  let component: TablaHistorialComponent;
  let fixture: ComponentFixture<TablaHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaHistorialComponent]
    });
    fixture = TestBed.createComponent(TablaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
