import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInicialComponent } from './tabla-inicial.component';

describe('TablaInicialComponent', () => {
  let component: TablaInicialComponent;
  let fixture: ComponentFixture<TablaInicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaInicialComponent]
    });
    fixture = TestBed.createComponent(TablaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
