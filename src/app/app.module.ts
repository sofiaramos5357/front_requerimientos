import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { HttpInterceptor } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Ya con esto al navegar vas a observar que a la url se va adicionar un (#) con esto puedes recargar la pagina 
//{ provide: LocationStrategy, useClass: HashLocationStrategy }