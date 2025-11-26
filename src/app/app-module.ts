import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { LoginComponent } from './auth/login/login';
import { UserComponent } from './user/user/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth-service';
import { AdminComponent } from './admin/admin/admin';
import { App } from './app';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),   // ✅ FIX
    AuthGuard   
  ],
  bootstrap: [App]
})
export class AppModule { }
