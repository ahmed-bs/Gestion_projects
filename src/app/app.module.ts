import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [					
    AppComponent,

    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SideBarComponent,
    TopBarComponent,
      ProjectComponent,
      TeamComponent,
      UserComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
