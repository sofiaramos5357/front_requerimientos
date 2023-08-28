import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearSolicitudComponent } from './formulario-crear-solicitud.component';

describe('FormularioCrearSolicitudComponent', () => {
  let component: FormularioCrearSolicitudComponent;
  let fixture: ComponentFixture<FormularioCrearSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCrearSolicitudComponent]
    });
    fixture = TestBed.createComponent(FormularioCrearSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
