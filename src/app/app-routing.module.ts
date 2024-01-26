import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './auth-guard.service';
import { ProjectComponent } from './project/project.component';
import { TeamComponent } from './team/team.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'project'
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate : [AuthGuardService] 
  },
  {
    path: 'teams',
    component: TeamComponent,
    canActivate : [AuthGuardService] 
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate : [AuthGuardService] 
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },  
  {
    path: 'register',
    component: RegisterComponent 
  },

  {
    path: '404',
    component: NotFoundComponent,
    canActivate : [AuthGuardService] 
  },  
  {
    path: '**',
    redirectTo: '/404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
