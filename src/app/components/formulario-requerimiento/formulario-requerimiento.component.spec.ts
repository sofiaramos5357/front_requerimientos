import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRequerimientoComponent } from './formulario-requerimiento.component';

describe('FormularioRequerimientoComponent', () => {
  let component: FormularioRequerimientoComponent;
  let fixture: ComponentFixture<FormularioRequerimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioRequerimientoComponent]
    });
    fixture = TestBed.createComponent(FormularioRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
