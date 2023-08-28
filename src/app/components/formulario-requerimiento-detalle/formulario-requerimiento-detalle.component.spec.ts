import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRequerimientoDetalleComponent } from './formulario-requerimiento-detalle.component';

describe('FormularioRequerimientoDetalleComponent', () => {
  let component: FormularioRequerimientoDetalleComponent;
  let fixture: ComponentFixture<FormularioRequerimientoDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioRequerimientoDetalleComponent]
    });
    fixture = TestBed.createComponent(FormularioRequerimientoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
