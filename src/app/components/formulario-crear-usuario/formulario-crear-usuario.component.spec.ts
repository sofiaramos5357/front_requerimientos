import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearUsuarioComponent } from './formulario-crear-usuario.component';

describe('FormularioCrearUsuarioComponent', () => {
  let component: FormularioCrearUsuarioComponent;
  let fixture: ComponentFixture<FormularioCrearUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCrearUsuarioComponent]
    });
    fixture = TestBed.createComponent(FormularioCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
