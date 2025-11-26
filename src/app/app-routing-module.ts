import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { LoginComponent } from './auth/login/login';
import { AdminComponent } from './admin/admin/admin';
import { UserComponent } from './user/user/user';

const routes: Routes = [
  { path: '', component: LoginComponent  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
