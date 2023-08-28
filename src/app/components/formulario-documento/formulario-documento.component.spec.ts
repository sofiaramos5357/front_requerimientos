import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDocumentoComponent } from './formulario-documento.component';

describe('FormularioDocumentoComponent', () => {
  let component: FormularioDocumentoComponent;
  let fixture: ComponentFixture<FormularioDocumentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioDocumentoComponent]
    });
    fixture = TestBed.createComponent(FormularioDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
